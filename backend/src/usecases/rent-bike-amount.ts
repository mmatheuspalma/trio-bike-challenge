import { isAfter, isEqual, isValid } from 'date-fns';

import { BikeRent, BikeRentAmount } from '@/usecases/datatypes/bikeRent';

import { UseCase } from '@/usecases/ports/use-case';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import { BikeRentRepository } from '@/usecases/ports/bike-rent-repository';
import { UserRepository } from '@/usecases/ports/user-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

import { NotExistingUserError } from '@/usecases/errors/not-existing-user-error';
import { NotExistingBikeError } from '@/usecases/errors/not-existing-bike-error';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';
import { NotAvailableBikeRentError } from '@/usecases/errors/not-available-bike-rent-error';
import { WrongGivenDatesError } from '@/usecases/errors/wrong-given-dates-error';

export class RentBikeAmount implements UseCase {
  constructor(
    private bikeRepository: BikeRepository,
    private bikeRentRepository: BikeRentRepository,
    private candidateRepository: CandidateRepository,
    private userRepository: UserRepository,
  ) {}
  async perform(bikeRent: BikeRent, candidateToken: string): Promise<BikeRentAmount> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    const bikeExists = await this.bikeRepository.findById(bikeRent.bikeId, candidate.id);
    if (!bikeExists) throw new NotExistingBikeError();

    const userExists = await this.userRepository.findById(bikeRent.userId, candidate.id);
    if (!userExists) throw new NotExistingUserError();

    if (
      isEqual(bikeRent.dateFrom, bikeRent.dateTo) ||
      isAfter(bikeRent.dateFrom, bikeRent.dateTo) ||
      !isValid(new Date(bikeRent.dateFrom)) || !isValid(new Date(bikeRent.dateTo))
    ) throw new WrongGivenDatesError();

    const rentAvailable = await this.bikeRentRepository.checkAvailability(
      bikeRent.bikeId,
      bikeRent.dateFrom,
      bikeRent.dateTo,
      candidate.id
    );
    if (!rentAvailable) throw new NotAvailableBikeRentError();

    return await this.bikeRentRepository.amount(
      bikeRent.bikeId,
      bikeRent.dateFrom,
      bikeRent.dateTo,
      candidate.id
    );
  }
}

import { BikeRent } from '@/usecases/datatypes/bikeRent';

import { UseCase } from '@/usecases/ports/use-case';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import { BikeRentRepository } from '@/usecases/ports/bike-rent-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

import { NotExistingBikeError } from '@/usecases/errors/not-existing-bike-error';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';

export class ListRentByBike implements UseCase {
  constructor(
    private bikeRepository: BikeRepository,
    private bikeRentRepository: BikeRentRepository,
    private candidateRepository: CandidateRepository,
  ) {}
  async perform(bikeId: number, candidateToken: string): Promise<Partial<BikeRent[]>> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    const bikeExists = await this.bikeRepository.findById(bikeId, candidate.id);
    if (!bikeExists) throw new NotExistingBikeError();

    return await this.bikeRentRepository.rentsByBike(
      bikeId,
      candidate.id
    );
  }
}

import { BikeRentAmountController } from '@/presentation/controllers/bike-rent-amount';
import { Controller } from '@/presentation/controllers/ports/controller';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { makeCandidateRepository } from './make-candidate-repository';
import { RentBikeAmount } from '@/usecases/rent-bike-amount';
import { makeBikeRentRepository } from './make-bike-rent-repository';
import { makeUserRepository } from './make-user-repository';

export const makeBikeRentAmountController = (): Controller => {
  const bikeRepository = makeBikeRepository();
  const bikeRentRepository = makeBikeRentRepository();
  const userRepository = makeUserRepository();
  const candidateRepository = makeCandidateRepository();

  const useCase = new RentBikeAmount(bikeRepository, bikeRentRepository, candidateRepository, userRepository);

  return new BikeRentAmountController(useCase);
};

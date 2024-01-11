import { BikeRentController } from '@/presentation/controllers/bike-rent-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { makeCandidateRepository } from './make-candidate-repository';
import { RentBike } from '@/usecases/rent-bike';
import { makeBikeRentRepository } from './make-bike-rent-repository';
import { makeUserRepository } from './make-user-repository';

export const makeBikeRentController = (): Controller => {
  const bikeRepository = makeBikeRepository();
  const bikeRentRepository = makeBikeRentRepository();
  const userRepository = makeUserRepository();
  const candidateRepository = makeCandidateRepository();

  const useCase = new RentBike(bikeRepository, bikeRentRepository, candidateRepository, userRepository);

  return new BikeRentController(useCase);
};

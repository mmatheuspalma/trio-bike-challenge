import { ListRentByBikeController } from '@/presentation/controllers/list-rent-by-bike';
import { Controller } from '@/presentation/controllers/ports/controller';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { ListRentByBike } from '@/usecases/list-rent-by-bike';
import { makeCandidateRepository } from './make-candidate-repository';
import { makeBikeRentRepository } from './make-bike-rent-repository';

export const makeListRentByBikeController = (): Controller => {
  const bikeRepository = makeBikeRepository();
  const bikeRentRepository = makeBikeRentRepository();
  const candidateRepository = makeCandidateRepository();

  const useCase = new ListRentByBike(bikeRepository, bikeRentRepository, candidateRepository);

  return new ListRentByBikeController(useCase);
};

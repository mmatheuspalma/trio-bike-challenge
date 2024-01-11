import { PrismaBikeRentRepository } from '@/external/repository/prisma/prisma-bike-rent-repository';
import { BikeRentRepository } from '@/usecases/ports/bike-rent-repository';

export const makeBikeRentRepository = (): BikeRentRepository => {
  return new PrismaBikeRentRepository();
};

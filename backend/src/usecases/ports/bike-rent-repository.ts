import { BikeRent, BikeRentAmount } from '@/usecases/datatypes/bikeRent';

export interface BikeRentRepository {
  list(candidateId: number): Promise<BikeRent[]>;
  rentsByBike(bikeId: number, candidateId: number): Promise<Partial<BikeRent[]>>;
  rent(bikeId: number, userId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<BikeRent>;
  amount(bikeId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<BikeRentAmount>;
  checkAvailability(bikeId: number, dateFrom: string, dateTo: string, candidateId: number): Promise<boolean>;
}

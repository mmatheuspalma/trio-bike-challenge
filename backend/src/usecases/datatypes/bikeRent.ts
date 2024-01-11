export interface BikeRentAmount {
  dateFrom: string;
  dateTo: string;
  rentAmount: number;
  fee: number;
  totalAmount: number;
  rentDays: number;
};

export interface BikeRent extends BikeRentAmount {
  id?: number;
  userId: number;
  bikeId: number;
  candidateId: number;
};

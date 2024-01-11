export interface BikeRent {
  rentAmount: number
  fee: number
  totalAmount: number
  rentDays?: number
}

export interface BikeRentDetails {
  bikeId: number
  userId: number
  dateFrom: string | Date
  dateTo: string | Date
  rentDays?: number
}

export interface BikeReturnDetails {
  bikeId: number
  userId: number
}

import type { BikeRentDetails, BikeReturnDetails } from '@/core/api/modules/bike'

const [mockDate] = new Date().toISOString().split('T')

const mockedImageUrls = [
  'https://cremecycles.com/images/glowne/15.jpg',
  'https://cremecycles.com/images/glowne/13.jpg',
  'https://cremecycles.com/images/glowne/14.jpg'
]

const mockedBike: Bike = {
  id: 1,
  candidateId: 5,
  name: 'Murazik, Thiel and Robel',
  type: 'Cyclocross Bicycle',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySize: 24,
  city: 'Manhattan',
  cardImage: 'https://cremecycles.com/images/glowne/15.jpg',
  imageUrls: mockedImageUrls,
  maxLoad: 110,
  rate: 135,
  ratings: 4.8
}

const mockBikeRentDetails: BikeRentDetails = {
  userId: 1,
  bikeId: mockedBike.id,
  dateFrom: mockDate,
  dateTo: mockDate
}

const mockedBikeReturnDetails: BikeReturnDetails = {
  userId: 1,
  bikeId: mockedBike.id
}

const mockedBikeList = [mockedBike, mockedBike, mockedBike, mockedBike]

export { mockedBike, mockedBikeList, mockedImageUrls, mockBikeRentDetails, mockedBikeReturnDetails }

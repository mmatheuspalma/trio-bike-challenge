import type { BikeRent, BikeRentDetails, BikeReturnDetails } from './typings/bike'

// import { ApiResponseError, client } from '@/core/api'
import { client } from '@/core/api'

export type { BikeRent, BikeRentDetails, BikeReturnDetails }

/**
 * List Bikes
 *
 * @param {boolean} [available=false] List only available bikes for renting
 *
 * @returns {Promise<Bike[]>}
 */
export async function list(available = false): Promise<Bike[]> {
  return available ? await listAvailable() : await listAll()
}

/**
 * Lists all bikes.
 *
 * @returns {Promise<Bike[]>}
 */
export async function listAll(): Promise<Bike[]> {
  const { data } = await client.get<Bike[]>('bikes')

  return data
}

/**
 * Lists only available bikes, bikes that are not rented.
 *
 * @returns {Promise<Bike[]>}
 */
export async function listAvailable(): Promise<Bike[]> {
  const { data } = await client.get<Bike[]>('bikes/available')

  return data
}

/**
 * List all future rents for a given bike
 *
 *
 * @param details
 * @returns
 */
export async function rents(bikeId: number): Promise<BikeRentDetails[]> {
  const { data } = await client.get<BikeRentDetails[]>(`rents/bike/${bikeId}`)

  return data
}

/**
 * Get the calculated amount for a given bike and dates
 *
 *
 * @param details
 * @returns
 */
export async function rentAmount(bikeRent: BikeRentDetails): Promise<BikeRent> {
  const { data } = await client.post<BikeRent>(`bikes/rent/amount`, bikeRent)

  return data
}

/**
 * Rents a bike; you can also book future rents.
 *
 *
 * @param details
 * @returns
 */
export async function rent(details: BikeRentDetails): Promise<BikeRent> {
  const { data } = await client.post<BikeRent>('bikes/rent', details)

  return data
}

/**
 * Returns a bike
 * @param {BikeReturnDetails} details
 */
export async function returns(details: BikeReturnDetails): Promise<void> {
  await client.post('bikes/return', details)
}

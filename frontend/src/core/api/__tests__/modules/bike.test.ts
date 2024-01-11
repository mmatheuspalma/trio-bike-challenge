import { describe, expect, it } from 'vitest'
import { mockBikeRentDetails, mockedBikeReturnDetails } from '@/mocks'

import { bike } from '@/core/api'

describe('API module: bike', () => {
  it('lists all bikes', async () => {
    const result = await bike.list()

    expect(result).toBeInstanceOf(Array)
    expect(result.length).gt(0)
    expect(bike.listAll()).resolves.toBeInstanceOf(Array)
  })

  it('lists available bikes', async () => {
    const result = await bike.list(true)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).gt(0)
    expect(bike.listAvailable()).resolves.toBeInstanceOf(Array)
  })

  it('get the bike rent amount pricing before rent', async () => {
    const result = await bike.rentAmount(mockBikeRentDetails)
    expect(result).toBeInstanceOf(Object)
  })

  it('rents a bikes', async () => {
    try {
      await bike.returns(mockedBikeReturnDetails)
      // eslint-disable-next-line no-empty
    } catch {}

    const result = await bike.rent(mockBikeRentDetails)
    expect(result).toBeInstanceOf(Object)
  })

  it('returns a bikes', async () => {
    expect(bike.returns(mockedBikeReturnDetails)).resolves.not.toThrowError()
  })
})

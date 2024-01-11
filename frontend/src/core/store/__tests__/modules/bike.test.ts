import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import { useBikeStore } from '@/core/store'

describe('Bike Store', () => {
  setActivePinia(createPinia())
  const store = useBikeStore()

  it('fetches a list of available bikes', async () => {
    expect(Object.values(store.items).length).equal(0)

    await store.fetchList()

    expect(Object.values(store.items).length).greaterThan(0)
  })

  it('has a valid list', () => {
    expect(store.list.length).greaterThan(0)
  })

  it('gets a bike by id ', () => {
    expect(Object.values(store.items).length).greaterThan(0)

    const [id] = Object.keys(store.items)
    const parsedId = Number(id) || 0

    expect(parsedId).greaterThan(0)
    expect(store.getBikeById).toBeInstanceOf(Function)

    const bike = store.getBikeById(parsedId)

    expect(bike).toBeInstanceOf(Object)
    expect(bike.id).not.toBeUndefined()
  })
})

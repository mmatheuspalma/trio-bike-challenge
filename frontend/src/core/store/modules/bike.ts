import { bike } from '@/core/api'
import type { BikeRentDetails } from '@/core/api/modules/bike'
import { defineStore } from 'pinia'

export interface BikeStore {
  items: BikeStoreItems
}

export interface BikeStoreItems {
  [key: string]: Bike
}

export default defineStore({
  id: 'bike',
  state: (): BikeStore => ({
    items: {}
  }),
  getters: {
    list(state) {
      return Object.values<Bike>(state.items)
    },
    getBikeById(state) {
      return (id: number) => state.items[id] || null
    }
  },
  actions: {
    /**
     * fetchs list of bikes available
     */
    async fetchList() {
      const result = await bike.list(true)

      result.forEach((i) => {
        this.items = {
          ...this.items,
          [i.id]: i
        }
      })
    },
    async fetchRents(bikeId: number) {
      const result = await bike.rents(bikeId)

      return result
    },
    async fetchRent(bikeRent: BikeRentDetails) {
      const result = await bike.rent(bikeRent)

      return result
    },
    async fetchRentAmount(bikeRent: BikeRentDetails) {
      const result = await bike.rentAmount(bikeRent)

      return result
    }
  }
})

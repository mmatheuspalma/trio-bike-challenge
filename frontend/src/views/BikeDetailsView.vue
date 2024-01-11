<script lang="ts">
import { useBikeStore, mapActions, mapState } from '@/core/store'
import { defineComponent } from 'vue'

import { LoadingSpinner } from '@/components/loading'
import { BikeImageSelector, BikeSpecs, type BikeSpecsProps, BikePrice, BikeBookmark } from '@/components/bike'
import { Chip } from '@/components/chip'
import { BookingAddressMap, BookingPricing, BookingCalendar } from '@/components/booking'
import { CurrencyCode } from '@/core/config'

import { BreadcrumbsLayout } from '@/components/layout'
import { NotFound } from '@/components/error'

import type { BikeRent } from '@/core/api/modules/typings/bike'

import { addDays } from 'date-fns'
import type { BikeRentDetails } from '@/core/api/modules/bike'

interface BikeDetailsViewData {
  rents: BikeRentDetails[]
  rentAmount: BikeRent | null
  selectedDateFrom: Date
  selectedDateTo: Date
  isLoading: boolean
  currency: CurrencyCode
  mockAddress: String
  isBookmarked: boolean
  bookErrorMessage: string
}

export default defineComponent({
  name: 'BikeDetailsView',
  components: {
    BreadcrumbsLayout,
    LoadingSpinner,
    BikeImageSelector,
    BikeSpecs,
    BikePrice,
    Chip,
    BookingAddressMap,
    BookingPricing,
    BookingCalendar,
    BikeBookmark,
    NotFound
  },
  metaInfo() {
    const { name } = this.data || {}

    return {
      title: name ? `${name} - BikeRent Vue` : 'Details - BikeRent Vue'
    }
  },
  data: (): BikeDetailsViewData => ({
    rents: [] as BikeRentDetails[],
    rentAmount: null,
    selectedDateFrom: new Date(),
    selectedDateTo: new Date(),
    isLoading: false,
    currency: CurrencyCode.EUR,
    mockAddress: '745 Atlantic Ave, Boston, MA 02111, United States',
    isBookmarked: false,
    bookErrorMessage: ''
  }),
  computed: {
    ...mapState(useBikeStore, ['getBikeById']),
    hasData() {
      return !!this.data
    },
    id() {
      const { id } = this.$route.params || {}

      return Number(id) || null
    },
    data() {
      return (this.id && this.getBikeById(this.id)) || null
    },
    images() {
      return this.data?.imageUrls || []
    },
    specs(): BikeSpecsProps {
      const { bodySize, maxLoad, ratings } = this.data || {}

      return {
        bodySize,
        maxLoad,
        ratings
      }
    },
    disabledDates() {
      const dates = this.rents?.flatMap((rent) => ({
        dateFrom: rent.dateFrom,
        dateTo: rent.dateTo,
        rentDays: rent.rentDays
      }))

      let disabledDates: Date[] = []
      dates.forEach((rent) => {
        if (!rent.rentDays) {
          return
        }

        for (let i = 1; i <= rent.rentDays + 1; i++) {
          disabledDates.push(addDays(new Date(rent.dateFrom), i))
        }
      })

      return disabledDates
    },
    rentPricing() {
      return this.rentAmount || this.data?.baseRentAmount
    }
  },
  watch: {},
  async beforeMount() {
    if (!this.data) {
      this.isLoading = true
      await this.fetchBikeList()
      this.isLoading = false
    }
  },
  async mounted() {
    this.rents = await this.fetchBikeRents(this.id as number)
  },
  methods: {
    ...mapActions(useBikeStore, {
      fetchBikeList: 'fetchList',
      fetchBikeRents: 'fetchRents',
      fetchBikeRent: 'fetchRent',
      fetchBikeRentAmount: 'fetchRentAmount'
    }),
    async onDateChange(date: Date[]) {
      const [dateFrom, dateTo] = date

      this.selectedDateFrom = dateFrom
      this.selectedDateTo = dateTo

      this.rentAmount = await this.fetchBikeRentAmount({
        userId: 1,
        bikeId: this.id as number,
        dateFrom,
        dateTo
      })
    },
    async handleAddBooking() {
      try {
        this.rentAmount = await this.fetchBikeRent({
          userId: 1,
          bikeId: this.id as number,
          dateFrom: this.selectedDateFrom,
          dateTo: this.selectedDateTo
        })

        this.isBookmarked = true
      } catch (error) {
        this.bookErrorMessage = error?.response?.data?.message
      }
    }
  }
})
</script>

<template>
  <div v-if="hasData" class="absolute top-0 left-0 pl-2">
    <breadcrumbs-layout theme="primary" :breadcrumbs="[{ name: data!.name }]" />
  </div>

  <div class="page page--details">
    <template v-if="isLoading">
      <div class="text-center my-32">
        <loading-spinner />
      </div>
    </template>
    <template v-else-if="!hasData">
      <not-found />
    </template>
    <template v-else>
      <div class="grid gap-x-6 grid-cols-1">
        <div>
          <div class="card p-8">
            <bike-image-selector :images="images" class="mb-8" />

            <bike-specs :specs="specs" />

            <div class="divider" />

            <article>
              <div class="flex">
                <div>
                  <h2 class="font-extrabold text-4xl">{{ data!.name }}</h2>
                  <chip color="secondary" size="sm">{{ data!.type }}</chip>
                </div>

                <div class="ml-auto">
                  <bike-bookmark v-model:active="isBookmarked" :width="60" size="2xl" outlined />
                </div>
              </div>

              <p>{{ data!.description }}</p>
            </article>

            <section class="pricing">
              <div class="divider" />
              <div class="flex">
                <div class="font-semibold">Day</div>
                <bike-price :price="data!.rate" :currency="currency" rate="daily" class="ml-auto" />
              </div>
              <div class="flex">
                <div class="font-semibold">Week</div>
                <bike-price :price="data!.rate * 7" :currency="currency" rate="weekly" class="ml-auto" />
              </div>
              <div class="divider" />
            </section>

            <div class="w-full">
              <h4 class="text-2xl font-extrabold mb-4">Full adress after booking</h4>
              <booking-address-map :address="mockAddress" />
            </div>
          </div>
        </div>

        <div>
          <div v-if="!isBookmarked" class="card p-8">
            <div class="mb-5">
              <h3 class="text-2xl mb-4">Select date</h3>
              <booking-calendar :disabled-dates="disabledDates" @changed="onDateChange" />
            </div>

            <h3 class="text-base mb-4">Booking Overview</h3>

            <div class="divider" />

            <booking-pricing :rent="rentPricing" :currency="currency" class="mb-8" />

            <button class="button button--primary w-full py-5" @click="handleAddBooking">Add to booking</button>

            <div v-if="bookErrorMessage" class="alert alert--warning mt-4" role="alert">
              <strong class="alert__title">Oopss!</strong>
              <p class="alert__message">{{ bookErrorMessage }}</p>
            </div>
          </div>

          <div v-else class="card py-20 flex justify-center items-center flex-col">
            <h3 class="text-2xl mb-3">Thank you!</h3>
            <p class="text-base mb-5">Your bike is booked.</p>
            <div class="flex justify-center items-center flex-col">
              <img :src="images[0]" width="170" />
              <h2 class="font-bold text-base mt-5 mb-2">{{ data!.name }}</h2>
              <chip color="secondary" size="sm">{{ data!.type }}</chip>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page--details {
  position: relative;

  .grid {
    @include breakpoint('lg') {
      grid-template-columns: minmax(400px, 67%) 1fr;
    }
  }
}
</style>

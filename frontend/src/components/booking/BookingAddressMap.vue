<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BookingAddressMap',
  props: {
    address: {
      type: String,
      required: true
    }
  },
  computed: {
    hasAddress() {
      return !!this.address
    }
  },
  methods: {
    getMapUrl(address: string) {
      return `https://maps.google.com/maps?width=750&height=400&hl=en&q=${decodeURIComponent(
        address
      )}&ie=UTF8&iwloc=B&output=embed&t=&z=15`
    }
  }
})
</script>

<template>
  <section class="booking-address-map">
    <template v-if="hasAddress">
      <iframe
        :src="getMapUrl(address)"
        height="400"
        width="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        seamless
      />
    </template>
    <template v-else>
      <p>No data available</p>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.booking-address-map {
  position: relative;

  border-radius: $border-radius-lg;
  overflow: hidden;
}
</style>

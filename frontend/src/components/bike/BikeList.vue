<script lang="ts">
/* global Bike */

import BikeCard from './BikeCard.vue'

import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BikeList',
  components: {
    BikeCard
  },
  props: {
    items: {
      type: Array as PropType<Bike[]>,
      default: () => []
    }
  }
})
</script>

<template>
  <div class="bike-list grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-6">
    <template v-for="(item, i) in items" :key="`bike-${i}`">
      <bike-card :data="item" fluid />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.bike-list {
  position: relative;
}
</style>

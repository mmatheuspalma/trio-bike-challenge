<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export interface BikeSpecsProps {
  bodySize?: number
  maxLoad?: number
  ratings?: number
}

export default defineComponent({
  name: 'BikeSpecs',
  props: {
    specs: {
      type: Object as PropType<BikeSpecsProps>,
      required: true
    }
  }
})
</script>

<template>
  <section class="bike-specs">
    <div class="grid grid-cols-3 p-4">
      <div class="bike-specs__spec text-center">
        <h5 class="bike-specs__spec__title">Body Size</h5>
        <strong>{{ specs.bodySize }} cm</strong>
      </div>
      <div class="bike-specs__spec text-center">
        <h5 class="bike-specs__spec__title">Body Size</h5>
        <strong>{{ specs.maxLoad }} kg</strong>
      </div>
      <div class="bike-specs__spec text-center">
        <h5 class="bike-specs__spec__title">Ratings</h5>
        <strong>{{ specs.ratings }}</strong>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bike-specs {
  position: relative;
  border: 1px solid get-theme-color('gray');
  border-radius: $border-radius-lg;

  @include element('spec') {
    @apply .h-full, .text-base;

    &:not(:last-child) {
      border-right: 1px solid get-theme-color('gray');
    }

    @include element('title') {
      @apply .font-normal, .text-sm, .mb-1;
    }
  }
}
</style>

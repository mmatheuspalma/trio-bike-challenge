<script lang="ts">
/* global Bike */
import { defineComponent, type PropType } from 'vue'

import Card from '@/components/card/Card.vue'
import { Chip } from '@/components/chip'
import BikePrice from './BikePrice.vue'
import BikeBookmark from './BikeBookmark.vue'
import { ImageLazy } from '@/components/image'
import { CurrencyCode } from '@/core/config'

export default defineComponent({
  name: 'BikeCard',
  components: {
    BikePrice,
    BikeBookmark,
    Card,
    Chip,
    ImageLazy
  },
  props: {
    data: {
      type: Object as PropType<Bike>,
      required: true
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isBookmarked: false
  }),
  computed: {
    id() {
      return this.data.id
    },
    componentClasses() {
      const classes = ['bike-card']

      if (this.fluid) {
        classes.push('bike-card--fluid')
      }

      return classes
    },
    currency() {
      return CurrencyCode.EUR
    },
    image() {
      const { cardImage } = this.data

      if (cardImage) {
        return cardImage
      }

      const [image] = this.data.imageUrls

      return image
    }
  }
})
</script>

<template>
  <div :class="componentClasses">
    <card>
      <template #title>
        <div class="bike-card__title">
          <h3>
            <router-link :to="{ name: 'details', params: { id } }">{{ data.name }}</router-link>
          </h3>
        </div>
      </template>

      <template #image>
        <div class="bike-card__image">
          <router-link :to="{ name: 'details', params: { id } }">
            <image-lazy :src="image" />
          </router-link>
        </div>

        <div class="bike-card__bookmark">
          <bike-bookmark v-model:active="isBookmarked" />
        </div>
      </template>

      <template #content>
        <div class="flex items-center">
          <chip color="secondary" size="xs">{{ data.type }}</chip>

          <div class="ml-auto">
            <bike-price :price="data.rate" :currency="currency" rate="daily" />
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<style lang="scss" scoped>
.bike-card {
  position: relative;
  max-width: 400px;

  @include modifier('fluid') {
    max-width: 100%;
  }

  @include element('title') {
    @apply .pb-2, .mb-2;

    border-bottom: 1px solid get-theme-color('gray');
  }

  @include element('bookmark') {
    @apply .absolute;

    right: 15px;
    top: 15px;
  }

  @include element('image') {
    @apply .mb-4, .px-6, py-4;

    height: 145px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>

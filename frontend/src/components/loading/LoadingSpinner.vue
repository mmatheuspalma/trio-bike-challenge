<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export default defineComponent({
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String as PropType<LoadingSpinnerSize>,
      default: 'sm'
    }
  },
  computed: {
    computedClasses() {
      return [`fa-${this.size}`]
    }
  }
})
</script>

<template>
  <div class="loading">
    <i class="fa-solid fa-circle-notch fa-spin" :class="computedClasses" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  @apply .inline-block;

  position: relative;
}
</style>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export type PropSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type PropColor = 'gray' | 'primary' | 'secondary'

export default defineComponent({
  name: 'Chip',
  props: {
    // TODO: use props
    size: {
      type: String as PropType<PropSize>,
      default: 'sm'
    },
    color: {
      type: String as PropType<PropColor>,
      default: 'gray'
    }
  },
  computed: {
    computedClasses() {
      const classes = ['chip', `chip--${this.size}`, `chip--${this.color}`]

      return classes
    }
  }
})
</script>

<template>
  <div :class="computedClasses">
    <div class="chip__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chip {
  @apply .relative, .items-center, .inline-flex, .max-w-full,
    .overflow-hidden, .py-2, .px-3, .text-base, .text-black;

  outline: none;
  text-decoration: none;
  vertical-align: middle;
  border-radius: $border-radius-md;
  line-height: 20px;

  @include modifier('gray') {
    @apply .bg-gray, .text-black;
  }
  @include modifier('primary') {
    @apply .bg-primary, .text-on-primary;
  }
  @include modifier('secondary') {
    @apply .bg-secondary, .text-on-secondary;
  }

  @include modifier('xs') {
    @apply .text-xs, .py-1;
    line-height: 12px;
  }
  @include modifier('sm') {
    @apply .text-sm;
    line-height: 16px;
  }
  @include modifier('lg') {
    @apply .text-lg, .py-3, .px-4;
    line-height: 24px;
  }
  @include modifier('xl') {
    @apply .text-xl, .py-4, .px-5;
    line-height: 28px;
  }

  @include element('content') {
    @apply .inline-flex, .h-ful, .items-center, .max-w-full;
  }
}
</style>

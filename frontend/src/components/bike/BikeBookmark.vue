<script lang="ts">
import { Icon, IconType } from '@/components/icon'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BikeBookmark',
  components: {
    Icon
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<UISizing | UISizingType>,
      default: 'base'
    },
    width: {
      type: Number,
      default: 0
    }
  },
  emits: {
    'update:active': (_state: boolean) => true
  },
  computed: {
    iconType() {
      return this.active ? IconType.SOLID : IconType.REGULAR
    },
    componentClasses() {
      const classes: UICSSClass = ['bike-bookmark']

      classes.push({ 'bike-bookmark--outlined': this.outlined, 'bike-bookmark--active': this.active })

      return classes
    },
    componentStyle() {
      const style: UICSSProperties = {}

      if (this.width) {
        style.width = `${this.width}px`
      }

      return style
    }
  },
  methods: {
    handleToggleActive() {
      this.$emit('update:active', !this.active)
    }
  }
})
</script>

<template>
  <div :class="componentClasses" :style="componentStyle" @click.prevent="handleToggleActive">
    <icon :type="iconType" :size="size">heart</icon>
  </div>
</template>

<style lang="scss" scoped>
.bike-bookmark {
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;

  @include modifier('outlined') {
    @apply .p-3, .inline-flex, .items-center, .justify-center;

    border: 1px solid get-theme-color('gray');
    border-radius: $border-radius-md;
  }
}
</style>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export enum IconType {
  REGULAR = 'regular',
  SOLID = 'solid'
}

export type PropIconType = `${IconType}`

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String as PropType<PropIconType>,
      default: IconType.REGULAR
    },
    size: {
      type: String as PropType<UISizing | UISizingType>,
      default: 'base'
    }
  },
  computed: {
    icon() {
      const [icon] = (this.$slots.default && this.$slots.default()) || []

      if (!icon) {
        return ''
      }

      return (icon.children as String).trim()
    },
    componentClass() {
      return ['icon', `text-${this.size}`]
    },
    computedClass() {
      const classes = [`fa-${this.type}`]

      if (this.icon) {
        classes.push(`fa-${this.icon}`)
      }

      return classes
    }
  }
})
</script>

<template>
  <div :class="componentClass">
    <em :class="computedClass" />
  </div>
</template>

<style lang="scss" scoped>
.icon {
  @apply .inline-block;
  position: relative;
}
</style>

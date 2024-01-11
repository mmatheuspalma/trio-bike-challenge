<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Icon } from '@/components/icon'
import type { RouteLocationRaw } from 'vue-router'

interface Breadcrumb {
  name: string
  route?: RouteLocationRaw
}

export type PropTheme = 'primary'
export type PropBreadcrumb = Breadcrumb[]

export default defineComponent({
  name: 'BreadcrumbsLayout',
  components: { Icon },
  props: {
    theme: {
      type: String as PropType<PropTheme>,
      default: ''
    },
    breadcrumbs: {
      type: Array as PropType<PropBreadcrumb>,
      default: () => []
    }
  },
  computed: {
    componentClasses() {
      const classes: UICSSClass = []

      if (this.theme) {
        classes.push(`breadcrumbs--${this.theme}`)
      }

      return classes
    },
    isHome() {
      return this.$route.name === 'home'
    },
    canSHow() {
      return !this.isHome
    }
  }
})
</script>

<template>
  <div v-if="canSHow" :class="componentClasses" class="breadcrumbs">
    <nav class="breadcrumbs__nav">
      <ul>
        <li>
          <router-link :to="{ name: 'home' }"><icon type="solid" size="xl">house</icon></router-link>
        </li>
        <template v-for="(item, i) in breadcrumbs" :key="`breadcrumb-${i}`">
          <li class="inline-flex items-center">
            <icon type="solid" class="mx-3">chevron-right</icon>
            <template v-if="item.route">
              <router-link :to="item.route">{{ item.name }}</router-link>
            </template>
            <template v-else>
              {{ item.name }}
            </template>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  position: relative;

  @include modifier('primary') {
    background: get-theme-color('primary');
    color: get-theme-color('on-primary');
  }

  @include element('nav') {
    ul {
      @apply .m-0, .p-0, .flex, .items-center;

      list-style: none;
    }
  }
}
</style>

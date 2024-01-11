<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components/icon'

export default defineComponent({
  name: 'NotFound',
  components: {
    Icon
  }
})
</script>

<template>
  <div class="not-found">
    <div class="card p-20">
      <div class="flex items-center">
        <icon type="solid" size="8xl" class="mr-6">circle-exclamation</icon>
        <h2 class="text-3xl">Page not found</h2>
      </div>

      <article>
        <p>The page you are looking for was not found.</p>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  position: relative;
}
</style>

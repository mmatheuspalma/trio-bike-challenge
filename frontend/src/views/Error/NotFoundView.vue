<script lang="ts">
import { NotFound } from '@/components/error'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView',
  components: { NotFound }
})
</script>

<template>
  <div class="page page-error page--error-not-found">
    <not-found />
  </div>
</template>

<style lang="scss" scoped>
.not-found-view {
  position: relative;
}
</style>

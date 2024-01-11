<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card'
})
</script>

<template>
  <div class="card">
    <div class="card__image">
      <slot name="image" />
    </div>
    <div class="card__title">
      <slot name="title" />
    </div>
    <div class="card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
}
</style>

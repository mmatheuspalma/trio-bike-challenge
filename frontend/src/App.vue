<script lang="ts">
import { defineComponent } from 'vue'

import { HeaderLayout } from '@/components/layout'

export default defineComponent({
  name: 'App',
  components: {
    HeaderLayout
  },
  metaInfo() {
    return {
      title: 'BikeRent Vue'
    }
  }
})
</script>

<template>
  <metainfo>
    <template #title="{ content }">{{ content }}</template>
  </metainfo>

  <header-layout />

  <main class="main container">
    <div class="main__content pt-12">
      <router-view />
    </div>
  </main>
</template>

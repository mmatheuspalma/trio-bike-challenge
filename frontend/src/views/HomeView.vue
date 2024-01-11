<script lang="ts">
import { defineComponent, nextTick } from 'vue'

import { BikeList } from '@/components/bike'
import { LoadingSpinner } from '@/components/loading'

import { useBikeStore, mapState, mapActions } from '@/core/store'

export default defineComponent({
  name: 'HomeView',
  components: {
    BikeList,
    LoadingSpinner
  },
  metaInfo() {
    return {
      title: 'Home - BikeRent Vue'
    }
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapState(useBikeStore, ['list'])
  },
  async mounted() {
    if (!this.list.length) {
      this.isLoading = true
    }

    this.fetchBikes()
  },
  methods: {
    ...mapActions(useBikeStore, { fetchBikeList: 'fetchList' }),
    async fetchBikes() {
      await this.fetchBikeList()
      await nextTick()

      this.isLoading = false
    }
  }
})
</script>

<template>
  <div class="page page--home">
    <template v-if="isLoading">
      <div class="text-center my-32">
        <loading-spinner size="2xl" class="text-black" />
      </div>
    </template>
    <template v-else>
      <bike-list :items="list" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page--home {
  position: relative;
}
</style>

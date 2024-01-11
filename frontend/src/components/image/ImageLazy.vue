<script lang="ts">
/* global Maybe */
import { defineComponent, nextTick } from 'vue'
import { debounce } from 'lodash-es'

interface ImageLazyData {
  observer: Maybe<IntersectionObserver>
}

export default defineComponent({
  name: 'ImageLazy',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: (): ImageLazyData => ({
    observer: null
  }),
  computed: {
    image(): Maybe<HTMLImageElement> {
      return this.$refs.image as HTMLImageElement
    }
  },
  watch: {
    async src() {
      this.clearImage()
      if (!this.src) {
        return
      }

      await nextTick()

      this.initObserver()
    }
  },
  beforeMount() {
    this.observer = new IntersectionObserver(
      debounce(async ([entry]) => {
        const { isIntersecting } = entry

        if (isIntersecting && !this.image?.src) {
          this.setImage()

          await nextTick()
          this.observer!.disconnect()
        }
      }, 100),
      {
        threshold: 0
      }
    )
  },
  async mounted() {
    this.clearImage()
    await nextTick()

    this.initObserver()
  },
  beforeUnmount() {
    this.observer?.disconnect()
  },
  methods: {
    initObserver() {
      this.observer?.disconnect()
      this.image && this.observer?.observe(this.image)
    },
    setImage() {
      if (!this.image) {
        return
      }

      this.image.src = this.src
    },
    clearImage() {
      if (!this.image) {
        return
      }

      this.image.removeAttribute('src')
    }
  }
})
</script>

<template>
  <img ref="image" class="image image--lazy" />
</template>

<style lang="scss" scoped>
.image-lazy {
  position: relative;
}
</style>

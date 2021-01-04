<template>
  <div>
    <div :style="'height:' + height + 'px'">
      <img
        v-if="images.length == 1"
        :src="require('@/assets/' + images[0].src)"
        class="object-cover w-full cursor-pointer"
        :style="'height:' + height + 'px'"
        @click="showFullscreen(0)"
      />
      <div
        v-else
        ref="carousel"
        class="glide"
        :style="'height:' + height + 'px'"
      >
        <div
          class="glide__track"
          data-glide-el="track"
          :style="'height:' + height + 'px'"
        >
          <ul class="glide__slides" :style="'height:' + height + 'px'">
            <li
              v-for="(image, index) in images"
              :key="index"
              class="glide__slide"
            >
              <img
                :src="require('@/assets/' + images[index].src)"
                class="object-cover w-full cursor-pointer"
                :style="'height:' + height + 'px'"
                @click="showFullscreen($event, index)"
              />
            </li>
          </ul>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button
            v-for="(image, index) in images"
            :key="index"
            class="glide__bullet"
            :data-glide-dir="'=' + index"
          ></button>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <div
            class="absolute z-10 inline-flex w-8 h-8 -mt-4 bg-black rounded-full left-5 opacity-20 focus:outline-none top-1/2"
          />
          <button
            class="absolute z-10 inline-flex -mt-4 text-white rounded-full left-5 hover:text-gray-300 focus:outline-none top-1/2"
            data-glide-dir="<"
          >
            <svg
              class="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            class="absolute z-10 inline-flex w-8 h-8 -mt-4 bg-black rounded-full right-5 opacity-20 focus:outline-none top-1/2"
          />
          <button
            class="absolute z-10 inline-flex -mt-4 text-white rounded-full right-5 hover:text-gray-300 focus:outline-none top-1/2"
            data-glide-dir=">"
          >
            <svg
              class="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <fullscreen-image-viewer
      v-model="fullscreen"
      :images="images"
      :start-index="fullscreenIndex"
    ></fullscreen-image-viewer>
  </div>
</template>

<script>
import Glide, {
  Controls,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm'
import FullscreenImageViewer from './FullscreenImageViewer'

export default {
  components: { FullscreenImageViewer },
  props: {
    height: {
      type: String,
      default: '400',
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fullscreen: false,
      fullscreenIndex: 0,
      swipe: false,
      glide: undefined,
    }
  },
  mounted() {
    if (this.images.length > 1) {
      this.glide = new Glide(this.$refs.carousel, {
        type: 'carousel',
        gap: 0,
        autoplay: 3000,
      })

      this.glide.mount({
        Controls,
        Autoplay,
      })
    }
  },
  unmounted() {
    if (this.glide) {
      this.glide.destroy()
      this.glide = undefined
    }
  },
  methods: {
    showFullscreen(e, index) {
      this.fullscreenIndex = index
      this.fullscreen = true
    },
  },
}
</script>

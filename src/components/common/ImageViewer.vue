<template>
  <div>
    <div :style="'height:' + height + 'px'">
      <img
        v-if="images.length == 1"
        :src="require('@/assets/' + images[0].src)"
        class="tw-object-cover tw-w-full tw-cursor-pointer"
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
          <ul class="tw-pl-0 glide__slides" :style="'height:' + height + 'px'">
            <li
              v-for="(image, index) in images"
              :key="index"
              class="glide__slide"
            >
              <img
                :src="require('@/assets/' + images[index].src)"
                class="tw-object-cover tw-w-full tw-cursor-pointer"
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
            class="tw-absolute tw-z-10 tw-inline-flex tw-w-8 tw-h-8 tw--mt-4 tw-bg-black tw-rounded-full tw-left-5 tw-opacity-20 focus:tw-outline-none tw-top-1/2"
          />
          <button
            class="tw-absolute tw-z-10 tw-inline-flex tw--mt-4 tw-text-white tw-rounded-full tw-left-5 hover:tw-text-gray-300 focus:tw-outline-none tw-top-1/2"
            data-glide-dir="<"
          >
            <svg
              class="tw-w-8 tw-h-8"
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
            class="tw-absolute tw-z-10 tw-inline-flex tw-w-8 tw-h-8 tw--mt-4 tw-bg-black tw-rounded-full tw-right-5 tw-opacity-20 focus:tw-outline-none tw-top-1/2"
          />
          <button
            class="tw-absolute tw-z-10 tw-inline-flex tw--mt-4 tw-text-white tw-rounded-full tw-right-5 hover:tw-text-gray-300 focus:tw-outline-none tw-top-1/2"
            data-glide-dir=">"
          >
            <svg
              class="tw-w-8 tw-h-8"
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
    }
  },
  mounted() {
    if (this.images.length > 1) {
      const glide = new Glide(this.$refs.carousel, {
        type: 'carousel',
        gap: 0,
        autoplay: 3000,
      })
      glide.mount({
        Controls,
        Autoplay,
      })
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

<template>
  <div
    v-if="visible"
    class="tw-fixed tw-inset-0 tw-z-40 tw-w-full tw-h-full tw-overflow-hidden tw-bg-black"
  >
    <img
      v-if="images.length == 1"
      :src="require('@/assets/' + images[0].src)"
      class="tw-object-contain tw-w-screen tw-h-screen"
    />
    <div v-else ref="carousel" class="tw-h-full glide">
      <div class="tw-h-full glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li
            v-for="(image, index) in images"
            :key="index"
            class="glide__slide"
          >
            <img
              :src="require('@/assets/' + images[index].src)"
              class="tw-object-contain tw-w-screen tw-h-screen"
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
          class="tw-absolute tw-left-0 tw-z-10 tw-inline-flex tw-w-8 tw-h-8 tw-ml-5 tw--mt-4 tw-bg-black tw-rounded-full tw-opacity-20 focus:tw-outline-none tw-top-1/2"
        />
        <button
          class="tw-absolute tw-left-0 tw-z-10 tw-inline-flex tw-ml-5 tw--mt-4 tw-text-white tw-rounded-full hover:tw-text-gray-300 focus:tw-outline-none tw-top-1/2"
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
          class="tw-absolute tw-right-0 tw-z-10 tw-inline-flex tw-w-8 tw-h-8 tw-mr-5 tw--mt-4 tw-bg-black tw-rounded-full tw-opacity-20 focus:tw-outline-none tw-top-1/2"
        />
        <button
          class="tw-absolute tw-right-0 tw-z-10 tw-inline-flex tw-mr-5 tw--mt-4 tw-text-white tw-rounded-full hover:tw-text-gray-300 focus:tw-outline-none tw-top-1/2"
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
    <div class="tw-absolute tw-z-50 tw-top-5 tw-right-5">
      <button
        class="tw-text-white tw-rounded hover:tw-text-gray-300 focus:tw-outline-none"
        @click="visible = false"
      >
        <svg
          class="tw-w-6 tw-h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Glide, {
  Controls,
  Autoplay,
  Swipe,
  Images,
} from '@glidejs/glide/dist/glide.modular.esm'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    images: {
      type: Array,
      default: () => [],
      required: true,
    },
    startIndex: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      glide: undefined,
    }
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.images.length > 1) {
          this.$nextTick(() => {
            this.glide = new Glide(this.$refs.carousel, {
              type: 'carousel',
              gap: 0,
              autoplay: 3000,
              startAt: this.startIndex,
            })

            this.glide.mount({
              Controls,
              Autoplay,
              Swipe,
              Images,
            })
          })
        }
      } else {
        if (this.glide) {
          this.glide.destroy()
          this.glide = undefined
        }
      }
    },
  },
  mounted() {},
}
</script>

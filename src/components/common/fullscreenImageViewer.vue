<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-40 w-full h-full overflow-hidden bg-black"
  >
    <g-image
      v-if="images.length == 1"
      :src="images[0]"
      class="object-contain w-screen h-screen"
    />
    <div v-else ref="carousel" class="h-full glide">
      <div class="h-full glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li
            v-for="(image, index) in images"
            :key="index"
            class="glide__slide"
          >
            <g-image
              :src="images[index]"
              class="object-contain w-screen h-screen"
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
          class="absolute left-0 z-10 inline-flex w-8 h-8 ml-5 -mt-4 bg-black rounded-full opacity-20 focus:outline-none top-1/2"
        />
        <button
          class="absolute left-0 z-10 inline-flex ml-5 -mt-4 text-white rounded-full hover:text-gray-300 focus:outline-none top-1/2"
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
          class="absolute right-0 z-10 inline-flex w-8 h-8 mr-5 -mt-4 bg-black rounded-full opacity-20 focus:outline-none top-1/2"
        />
        <button
          class="absolute right-0 z-10 inline-flex mr-5 -mt-4 text-white rounded-full hover:text-gray-300 focus:outline-none top-1/2"
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
    <div class="absolute z-50 top-5 right-5">
      <button
        class="text-white rounded hover:text-gray-300 focus:outline-none"
        @click="visible = false"
      >
        <svg
          class="w-6 h-6"
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
import { computed, ref, watch } from '@vue/composition-api'
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
  setup(props, { root, emit }) {
    const glide = ref()

    const carousel = ref()

    const visible = computed({
      get: () => props.value,
      set: (val) => emit('input', val),
    })

    watch(visible, (val) => {
      if (val) {
        if (props.images.length > 1) {
          root.$nextTick(() => {
            glide.value = new Glide(carousel.value, {
              type: 'carousel',
              gap: 0,
              autoplay: 3000,
              startAt: props.startIndex,
            })

            glide.value.mount({
              Controls,
              Autoplay,
              Swipe,
              Images,
            })
          })
        }
      } else {
        if (glide.value) {
          glide.value.destroy()
          glide.value = undefined
        }
      }
    })

    return { visible, carousel }
  },
}
</script>

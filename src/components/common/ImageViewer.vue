<template>
  <div>
    <div :style="'height:' + height + 'px'">
      <DynamicPictureCard
        v-if="images.length == 1"
        alt="image"
        :name="images[0]"
        class="w-full cursor-pointer object-cover"
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
              <DynamicPictureCard
                :alt="'image' + (index + 1)"
                :name="images[index]"
                class="w-full cursor-pointer object-cover"
                :style="'height:' + height + 'px'"
                @click="showFullscreen(index)"
              />
            </li>
          </ul>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button
            v-for="(image, index) in images"
            :key="index"
            :aria-label="'bullet' + (index + 1)"
            class="glide__bullet"
            :data-glide-dir="'=' + index"
          ></button>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <div
            class="absolute left-5 top-1/2 z-10 -mt-4 inline-flex h-8 w-8 rounded-full bg-black opacity-20 focus:outline-none"
          />
          <button
            aria-label="previous"
            class="absolute left-5 top-1/2 z-10 -mt-4 inline-flex rounded-full text-white hover:text-stone-300 focus:outline-none"
            data-glide-dir="<"
          >
            <svg
              class="h-8 w-8"
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
            class="absolute right-5 top-1/2 z-10 -mt-4 inline-flex h-8 w-8 rounded-full bg-black opacity-20 focus:outline-none"
          />
          <button
            aria-label="next"
            class="absolute right-5 top-1/2 z-10 -mt-4 inline-flex rounded-full text-white hover:text-stone-300 focus:outline-none"
            data-glide-dir=">"
          >
            <svg
              class="h-8 w-8"
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
    <FullscreenImageViewer
      v-model="fullscreen"
      :images="images"
      :start-index="fullscreenIndex"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, PropType, ref } from 'vue'
import Glide, {
  Controls,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm'

const props = defineProps({
  height: {
    type: String,
    default: '400',
  },
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const fullscreen = ref(false)
const fullscreenIndex = ref(0)
const carousel = ref()
const glide = ref()

function showFullscreen(index: number) {
  fullscreenIndex.value = index
  fullscreen.value = true
}

onMounted(() => {
  if (props.images.length > 1) {
    glide.value = new Glide(carousel.value, {
      type: 'carousel',
      gap: 0,
      // autoplay: 3000,
    })

    glide.value.mount({
      Controls,
      Autoplay,
    })
  }
})

onUnmounted(() => {
  if (glide.value) {
    glide.value.destroy()
    glide.value = undefined
  }
})
</script>

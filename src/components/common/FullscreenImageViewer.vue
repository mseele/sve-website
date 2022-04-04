<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-40 h-full w-full overflow-hidden bg-black"
  >
    <DynamicPictureFull
      v-if="images.length == 1"
      :name="images[0]"
      class="h-screen w-screen object-contain"
    />
    <div v-else ref="carousel" class="glide h-full">
      <div class="glide__track h-full" data-glide-el="track">
        <ul class="glide__slides">
          <li
            v-for="(image, index) in images"
            :key="index"
            class="glide__slide"
          >
            <DynamicPictureFull
              :name="images[index]"
              class="h-screen w-screen object-contain"
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
          class="absolute left-0 top-1/2 z-10 ml-5 -mt-4 inline-flex h-8 w-8 rounded-full bg-black opacity-20 focus:outline-none"
        />
        <button
          aria-label="previous"
          class="absolute left-0 top-1/2 z-10 ml-5 -mt-4 inline-flex rounded-full text-white hover:text-stone-300 focus:outline-none"
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
          class="absolute right-0 top-1/2 z-10 mr-5 -mt-4 inline-flex h-8 w-8 rounded-full bg-black opacity-20 focus:outline-none"
        />
        <button
          aria-label="next"
          class="absolute right-0 top-1/2 z-10 mr-5 -mt-4 inline-flex rounded-full text-white hover:text-stone-300 focus:outline-none"
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
    <div class="absolute top-5 right-5 z-50">
      <button
        aria-label="close"
        class="rounded text-white hover:text-stone-300 focus:outline-none"
        @click="visible = false"
      >
        <svg
          class="h-6 w-6"
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

<script setup lang="ts">
import { computed, ref, watch, nextTick, PropType } from 'vue'
import Glide, {
  Controls,
  Autoplay,
  Swipe,
  Images,
} from '@glidejs/glide/dist/glide.modular.esm'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
  startIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const glide = ref()

const carousel = ref()

const visible = computed<boolean>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

watch(visible, (val) => {
  if (val) {
    if (props.images.length > 1) {
      nextTick(() => {
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
</script>

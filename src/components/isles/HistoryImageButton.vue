<template>
  <button
    aria-label="show fullscreen"
    class="ml-2 block h-6 text-stone-500 lg:hidden"
    @click="fullscreen = true"
  >
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <FullscreenImageViewer
    v-model="fullscreen"
    :images="images"
    :start-index="0"
  />
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const fullscreen = ref(false)
</script>

<template>
  <div ref="resizeContainer">
    <iframe
      :src="src"
      style="border-width: 0"
      :width="width"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const resizeContainer = ref<HTMLDivElement | null>(null)
const width = ref(800)

function onResize() {
  if (resizeContainer.value) {
    width.value = resizeContainer.value.offsetWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

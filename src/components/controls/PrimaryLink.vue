<template>
  <a
    class="on-focus-dark whitespace-nowrap rounded bg-red-800 px-4 py-2 text-center font-medium text-white hover:bg-red-900 active:bg-red-700"
    :href="to"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

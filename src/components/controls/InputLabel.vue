<template>
  <label
    class="block mb-2 text-xs font-semibold tracking-wide text-black uppercase"
    :for="name"
  >
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>

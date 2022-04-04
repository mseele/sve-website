<template>
  <a
    class="px-4 py-2 font-semibold tracking-wider uppercase border rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring"
    :class="[
      outlined
        ? 'bg-opacity-25 hover:bg-opacity-25 ' +
          (dark
            ? 'text-black border-black bg-stone-900 hover:bg-stone-800 active:bg-stone-700 focus-visible:ring-stone-600 focus-visible:ring-opacity-50'
            : 'text-white border-white bg-white hover:bg-stone-400 active:bg-stone-500 focus-visible:ring-stone-400 focus-visible:ring-opacity-50')
        : dark
        ? 'text-white bg-stone-900 border-stone-900 hover:border-stone-800 hover:bg-stone-800 active:bg-stone-700 focus-visible:ring-stone-600 focus-visible:ring-opacity-50'
        : 'text-stone-900 bg-white border-white hover:bg-stone-400 active:bg-stone-500 focus-visible:ring-stone-500 focus-visible:ring-opacity-50',
    ]"
    :href="href"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: null,
    required: true,
  },
  outlined: {
    type: Boolean,
    default: false,
    required: false,
  },
  dark: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

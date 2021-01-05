<template>
  <a
    class="px-4 py-2 font-semibold tracking-wider uppercase border rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring"
    :class="[
      outlined
        ? 'bg-opacity-25 hover:bg-opacity-25 ' +
          (dark
            ? 'text-black border-black bg-gray-900 hover:bg-gray-800 active:bg-gray-700 focus-visible:ring-gray-600 focus-visible:ring-opacity-50'
            : 'text-white border-white bg-white hover:bg-gray-400 active:bg-gray-500 focus-visible:ring-gray-400 focus-visible:ring-opacity-50')
        : dark
        ? 'text-white bg-gray-900 border-gray-900 hover:border-gray-800 hover:bg-gray-800 active:bg-gray-700 focus-visible:ring-gray-600 focus-visible:ring-opacity-50'
        : 'text-gray-900 bg-white border-white hover:bg-gray-400 active:bg-gray-500 focus-visible:ring-gray-500 focus-visible:ring-opacity-50',
    ]"
    :href="href"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
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
  },
}
</script>

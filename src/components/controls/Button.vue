<template>
  <a
    class="tw-px-4 tw-py-2 tw-font-medium tw-tracking-widest tw-no-underline tw-uppercase tw-whitespace-no-wrap tw-border tw-border-solid tw-rounded-full focus:tw-outline-none focus:tw-shadow-outline"
    :class="[
      outlined
        ? 'tw-bg-opacity-25 hover:tw-bg-opacity-25 ' +
          (dark
            ? 'tw-text-black tw-border-black tw-bg-gray-900 hover:tw-bg-gray-800 active:tw-bg-gray-700'
            : 'tw-text-white tw-border-white tw-bg-white hover:tw-bg-gray-400 active:tw-bg-gray-500')
        : dark
        ? 'tw-text-white tw-bg-gray-900 tw-border-gray-900 hover:tw-border-gray-800 hover:tw-bg-gray-800 active:tw-bg-gray-700'
        : 'tw-text-gray-900 tw-bg-white tw-border-white hover:tw-bg-gray-400 active:tw-bg-gray-500',
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

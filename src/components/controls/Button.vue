<template>
  <a
    class="tw-px-4 tw-py-2 tw-font-medium tw-tracking-widest tw-no-underline tw-uppercase tw-whitespace-no-wrap tw-rounded-full focus:tw-outline-none focus:tw-shadow-outline"
    :class="[
      outlined
        ? 'tw-text-white tw-border tw-border-white tw-bg-opacity-25 tw-border-solid tw-bg-white hover:tw-bg-gray-400 hover:tw-bg-opacity-25 active:tw-bg-gray-500'
        : 'tw-text-gray-800 tw-bg-white tw-border tw-border-white tw-border-solid hover:tw-bg-gray-400 active:tw-bg-gray-500',
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
  },
}
</script>

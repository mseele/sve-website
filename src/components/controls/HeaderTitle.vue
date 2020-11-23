<template>
  <div class="tw-flex tw-flex-row">
    <div class="tw-w-1 tw-h-auto tw-bg-red-800 tw-rounded"></div>
    <div
      class="tw-pl-2 tw-whitespace-nowrap"
      :class="[
        dark ? 'tw-text-gray-900' : 'tw-text-white',
        shadow ? (dark ? 'tw-text-shadow-light' : 'tw-text-shadow-dark') : '',
        uppercase ? 'tw-uppercase tw-tracking-widest' : '',
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
      required: false,
    },
    shadow: {
      type: Boolean,
      default: false,
      required: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

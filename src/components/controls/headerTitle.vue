<template>
  <div class="flex flex-row">
    <div class="w-1 h-auto bg-red-800 rounded"></div>
    <div
      class="pl-2"
      :class="[
        dark ? 'text-gray-900' : 'text-white',
        shadow ? (dark ? 'text-shadow-light' : 'text-shadow-dark') : '',
        uppercase ? 'uppercase tracking-widest' : '',
        truncate && !wrap ? 'truncate' : '',
        wrap ? '' : 'whitespace-nowrap',
        truncate && wrap ? 'overflow-ellipsis overflow-hidden' : '',
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
    truncate: {
      type: Boolean,
      default: false,
      required: false,
    },
    wrap: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

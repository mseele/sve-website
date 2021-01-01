<template>
  <label
    class="tw-block tw-mb-2 tw-text-xs tw-font-semibold tw-tracking-wide tw-text-black tw-uppercase"
    :for="name"
  >
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

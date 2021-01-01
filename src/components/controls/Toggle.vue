<template>
  <div
    class="tw-flex tw-items-center tw-cursor-pointer"
    @click="toggle = !toggle"
  >
    <div
      class="tw-flex tw-items-center tw-w-8 tw-h-5 tw-p-1 tw-duration-300 tw-ease-in-out tw-bg-gray-300 tw-rounded-full"
      :class="{ 'tw-bg-red-800': toggle }"
    >
      <div
        class="tw-w-4 tw-h-4 tw-duration-300 tw-ease-in-out tw-transform tw-bg-white tw-rounded-full tw-shadow-md"
        :class="{ 'tw-translate-x-2': toggle }"
      ></div>
    </div>
    <div class="tw-pl-2"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toggle: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

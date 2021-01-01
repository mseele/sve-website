<template>
  <button
    class="tw-px-4 tw-py-2 tw-font-medium tw-text-white tw-bg-red-800 tw-rounded tw-whitespace-nowrap disabled:tw-cursor-default"
    :class="{
      'hover:tw-bg-red-900 active:tw-bg-red-700 tw-on-focus-dark':
        !disabled && !loading,
      'disabled:tw-opacity-50': !loading,
    }"
    :disabled="disabled || loading"
    :type="type"
    @click="onClick()"
  >
    <div class="tw-grid">
      <svg
        v-if="loading"
        class="tw-self-center tw-w-5 tw-h-5 tw-col-start-1 tw-col-end-1 tw-row-start-1 tw-row-end-1 tw-text-white tw-justify-self-center tw-animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="tw-opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="tw-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div
        class="tw-col-start-1 tw-col-end-1 tw-row-start-1 tw-row-end-1"
        :class="{ 'tw-invisible': loading }"
      >
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    type: {
      type: String,
      default: 'button',
      required: false,
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>

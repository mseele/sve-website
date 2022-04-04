<template>
  <button
    class="whitespace-nowrap rounded bg-red-800 px-4 py-2 font-medium text-white disabled:cursor-default"
    :class="{
      'on-focus-dark hover:bg-red-900 active:bg-red-700': !disabled && !loading,
      'disabled:opacity-50': !loading,
    }"
    :disabled="disabled || loading"
    :type="submit ? 'submit' : 'button'"
    @click="onClick()"
  >
    <div class="grid">
      <svg
        v-if="loading"
        class="col-start-1 col-end-1 row-start-1 row-end-1 h-5 w-5 animate-spin self-center justify-self-center text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div
        class="col-start-1 col-end-1 row-start-1 row-end-1"
        :class="{ invisible: loading }"
      >
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  submit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'click'): void
}>()

function onClick() {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

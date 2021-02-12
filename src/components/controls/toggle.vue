<template>
  <div class="flex items-center cursor-pointer" @click="toggle = !toggle">
    <div
      class="flex items-center w-8 h-5 p-1 duration-300 ease-in-out bg-gray-300 rounded-full"
      :class="{ 'bg-red-800': toggle }"
    >
      <div
        class="w-4 h-4 duration-300 ease-in-out transform bg-white rounded-full shadow-md"
        :class="{ 'translate-x-2': toggle }"
      ></div>
    </div>
    <div class="pl-2"><slot></slot></div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const toggle = computed({
      get: () => props.value,
      set: (value) => emit('input', value),
    })
    return { toggle }
  },
}
</script>

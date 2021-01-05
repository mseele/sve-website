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

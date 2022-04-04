<template>
  <div class="flex cursor-pointer items-center" @click="toggle = !toggle">
    <div
      :class="[
        'flex h-5 w-8 items-center rounded-full p-1 duration-300 ease-in-out',
        toggle ? 'bg-red-800' : 'bg-stone-300',
      ]"
    >
      <div
        class="h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ease-in-out"
        :class="{ 'translate-x-2': toggle }"
      ></div>
    </div>
    <div class="pl-2"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const toggle = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

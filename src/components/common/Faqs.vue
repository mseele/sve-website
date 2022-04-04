<template>
  <div class="space-y-3 divide-x-0 divide-y divide-solid divide-stone-300">
    <div
      v-for="(item, index) in faqs"
      :key="index"
      class="cursor-pointer"
      @click="toggle(index)"
    >
      <div
        class="flex items-center justify-between"
        :class="{ 'pt-3': index > 0 }"
      >
        <div class="font-medium">{{ item.question }}</div>
        <div class="flex items-center stroke-2 pl-2 text-stone-400">
          <svg
            v-if="openItems.indexOf(index) != -1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div v-if="openItems.indexOf(index) != -1" class="pt-1">
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Faq } from '@/models'

const props = defineProps({
  faqs: {
    type: Array as PropType<Faq[]>,
    required: true,
  },
})

const openItems = ref<number[]>([])

function toggle(index: number) {
  const idx = openItems.value.indexOf(index)
  if (idx != -1) {
    openItems.value.splice(idx, 1)
  } else {
    openItems.value.push(index)
  }
}
</script>

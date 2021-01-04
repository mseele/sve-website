<template>
  <div class="space-y-3 divide-x-0 divide-y divide-gray-300 divide-solid">
    <div v-for="(item, index) in faqs" :key="index">
      <div
        class="flex items-center justify-between cursor-pointer"
        :class="{ 'pt-3': index > 0 }"
        @click="toggle(index)"
      >
        <div class="font-medium">{{ item.question }}</div>
        <div class="flex items-center pl-2 text-gray-400 stroke-2">
          <svg
            v-if="openItems.indexOf(index) != -1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
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
            class="w-6 h-6"
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

<script>
export default {
  props: {
    faqs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openItems: [],
    }
  },
  methods: {
    toggle(index) {
      const idx = this.openItems.indexOf(index)
      if (idx != -1) {
        this.openItems.splice(idx, 1)
      } else {
        this.openItems.push(index)
      }
    },
  },
}
</script>

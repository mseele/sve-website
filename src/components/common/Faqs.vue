<template>
  <div
    class="tw-space-y-3 tw-divide-x-0 tw-divide-y tw-divide-gray-300 tw-divide-solid"
  >
    <div v-for="(item, index) in faqs" :key="index">
      <div
        class="tw-flex tw-items-center tw-justify-between tw-cursor-pointer"
        :class="{ 'tw-pt-3': index > 0 }"
        @click="toggle(index)"
      >
        <div class="tw-font-medium">{{ item.question }}</div>
        <div
          class="tw-flex tw-items-center tw-pl-2 tw-text-gray-400 tw-stroke-2"
        >
          <svg
            v-if="openItems.indexOf(index) != -1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="tw-w-6 tw-h-6"
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
            class="tw-w-6 tw-h-6"
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
      <div v-if="openItems.indexOf(index) != -1" class="tw-pt-1">
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

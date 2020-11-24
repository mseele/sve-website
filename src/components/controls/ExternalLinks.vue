<template>
  <div class="tw-flex tw-flex-wrap tw-justify-center tw-space-x-3">
    <a
      v-for="(link, index) in links.externalItems"
      :key="index"
      :href="link.to"
      target="_blank"
      rel="noreferrer"
      class="tw-inline-flex tw-items-center tw-p-2 tw-rounded-full hover:tw-bg-gray-400 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gray-400 focus-visible:tw-ring-opacity-50"
    >
      <g-image class="tw-w-5 tw-h-5" :src="require('@/assets/' + link.img)" />
    </a>
  </div>
</template>

<script>
import links from '@/data/links.json'

export default {
  data() {
    return {
      links,
    }
  },
}
</script>

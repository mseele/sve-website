<template>
  <div class="tw-flex tw-flex-wrap tw-justify-center tw-space-x-3">
    <a
      v-for="(link, index) in links.externalItems"
      :key="index"
      :href="link.to"
      target="_blank"
      rel="noreferrer"
      class="hover:tw-bg-gray-400 tw-p-2 tw-rounded-full tw-inline-flex tw-items-center"
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

<template>
  <div class="flex flex-wrap justify-center space-x-3">
    <a
      v-for="(link, index) in links.externalItems"
      :key="index"
      :href="link.to"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center p-2 rounded-full hover:bg-gray-400 on-focus"
    >
      <g-image class="w-5 h-5" :src="require('@/assets/' + link.img)" />
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

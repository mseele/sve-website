<template>
  <div class="flex flex-wrap justify-center space-x-3">
    <a
      v-for="(link, index) in externalItems"
      :key="index"
      :href="link.to"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center p-2 rounded-full hover:bg-stone-400 on-focus"
    >
      <DynamicIcon
        class="w-5 h-5"
        :name="link.img"
        :alt="'external link to' + link.alt"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import { externalItems } from '@/data/links.json'
</script>

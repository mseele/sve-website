<template>
  <footer class="space-y-4 border-t border-stone-300 xl:space-y-5">
    <div class="container px-5 pt-4 mx-auto">
      <div class="flex flex-wrap justify-center">
        <div v-for="(item, index) in footerItems" :key="index" class="p-2">
          <router-link
            :key="index"
            :to="item.to"
            class="text-sm font-medium text-stone-800 rounded hover:text-black xl:text-base on-focus focus-visible:ring-offset-2"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
    <ExternalLinks class="container px-5 mx-auto" />
    <div class="container flex flex-col px-5 pb-4 mx-auto">
      <div class="text-sm text-center text-stone-900">
        © {{ $site.year }} —
        <span class="font-bold">SV Eutingen 1947 e.V.</span>
      </div>
      <span class="pt-1 text-sm font-bold text-center text-red-800">
        #mehralseinverein
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { footerItems } from '@/data/links.json'
</script>

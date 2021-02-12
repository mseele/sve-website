<template>
  <footer class="space-y-4 border-t border-gray-300 xl:space-y-5">
    <div class="container px-5 pt-4 mx-auto">
      <div class="flex flex-wrap justify-center">
        <div
          v-for="(item, index) in links.footerItems"
          :key="index"
          class="p-2"
        >
          <g-link
            :key="index"
            :to="item.to"
            class="text-sm font-medium text-gray-800 rounded hover:text-black xl:text-base on-focus focus-visible:ring-offset-2"
          >
            {{ item.title }}
          </g-link>
        </div>
      </div>
    </div>
    <external-links class="container px-5 mx-auto" />
    <div class="container flex flex-col px-5 pb-4 mx-auto">
      <div class="text-sm text-center text-gray-900">
        © {{ new Date().getFullYear() }} —
        <span class="font-bold">SV Eutingen 1947 e.V.</span>
      </div>
      <span class="pt-1 text-sm font-bold text-center text-red-800">
        #mehralseinverein
      </span>
    </div>
  </footer>
</template>

<script>
import links from '@/data/links.json'
import externalLinks from '@/components/controls/externalLinks'

export default {
  components: { externalLinks },
  setup() {
    return { links }
  },
}
</script>

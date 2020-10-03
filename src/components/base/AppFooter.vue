<template>
  <footer
    class="tw-space-y-4 xl:tw-space-y-5 tw-border-solid tw-border-0 tw-border-t tw-border-gray-300"
  >
    <div class="tw-container tw-mx-auto tw-px-5 tw-pt-4">
      <div class="tw-flex tw-flex-wrap tw-justify-center">
        <div
          v-for="(item, index) in links.footerItems"
          :key="index"
          class="tw-p-2"
        >
          <g-link
            :key="index"
            :to="item.to"
            class="tw-text-gray-800 hover:tw-text-black tw-text-sm tw-font-medium tw-no-underline"
          >
            {{ item.title }}
          </g-link>
        </div>
      </div>
    </div>
    <external-links class="tw-container tw-mx-auto tw-px-5" />
    <div class="tw-container tw-mx-auto tw-px-5 tw-pb-4 tw-flex tw-flex-col">
      <div class="tw-text-gray-900 tw-text-sm tw-text-center">
        © {{ new Date().getFullYear() }} —
        <span class="tw-font-bold">SV Eutingen 1947 e.V.</span>
      </div>
      <span
        class="tw-text-red-800 tw-font-bold tw-text-sm tw-text-center tw-pt-1"
      >
        #mehralseinverein
      </span>
    </div>
  </footer>
</template>

<script>
import links from '@/data/links.json'
import ExternalLinks from '@/components/controls/ExternalLinks'

export default {
  components: { ExternalLinks },
  data() {
    return {
      links,
    }
  },
}
</script>

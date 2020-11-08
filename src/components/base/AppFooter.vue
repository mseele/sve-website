<template>
  <footer
    class="tw-space-y-4 tw-border-0 tw-border-t tw-border-gray-300 tw-border-solid xl:tw-space-y-5"
  >
    <div class="tw-container tw-px-5 tw-pt-4 tw-mx-auto">
      <div class="tw-flex tw-flex-wrap tw-justify-center">
        <div
          v-for="(item, index) in links.footerItems"
          :key="index"
          class="tw-p-2"
        >
          <g-link
            :key="index"
            :to="item.to"
            class="tw-text-sm tw-font-medium tw-text-gray-800 tw-no-underline hover:tw-text-black xl:tw-text-base"
          >
            {{ item.title }}
          </g-link>
        </div>
      </div>
    </div>
    <external-links class="tw-container tw-px-5 tw-mx-auto" />
    <div class="tw-container tw-flex tw-flex-col tw-px-5 tw-pb-4 tw-mx-auto">
      <div class="tw-text-sm tw-text-center tw-text-gray-900">
        © {{ new Date().getFullYear() }} —
        <span class="tw-font-bold">SV Eutingen 1947 e.V.</span>
      </div>
      <span
        class="tw-pt-1 tw-text-sm tw-font-bold tw-text-center tw-text-red-800"
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

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
            class="tw-text-gray-800 hover:tw-text-black tw-text-sm xl:tw-text-base tw-font-medium tw-no-underline"
          >
            {{ item.title }}
          </g-link>
        </div>
      </div>
    </div>
    <div
      class="tw-container tw-mx-auto tw-px-5 tw-flex tw-flex-wrap tw-justify-center tw-space-x-3"
    >
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

export default {
  data() {
    return {
      links,
    }
  },
}
</script>

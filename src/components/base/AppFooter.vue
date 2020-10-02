<template>
  <footer class="tw-text-gray-700">
    <div
      class="tw-container tw-py-4 tw-px-5 tw-mx-auto tw-flex tw-flex-wrap tw-justify-center tw-space-x-3"
    >
      <a
        v-for="(link, index) in links.externalItems"
        :key="index"
        :href="link.to"
        target="_blank"
        rel="noreferrer"
        class="hover:tw-bg-sec-dark tw-p-2 tw-rounded-full tw-inline-flex tw-items-center"
      >
        <g-image class="tw-w-5 tw-h-5" :src="require('@/assets/' + link.img)" />
      </a>
    </div>
    <div class="tw-border-solid tw-border-0 tw-border-t tw-border-sec-medium">
      <div class="tw-container tw-mx-auto tw-py-4 tw-px-5">
        <div class="tw-flex tw-flex-wrap tw-justify-center">
          <div
            v-for="(item, index) in links.footerItems"
            :key="index"
            class="tw-p-2"
          >
            <g-link
              :key="index"
              :to="item.to"
              class="tw-text-black tw-text-sm tw-font-medium tw-no-underline"
            >
              {{ item.title }}
            </g-link>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-bg-sec-medium">
      <div
        class="tw-container tw-mx-auto tw-py-4 tw-px-5 tw-flex tw-flex-wrap tw-flex-col sm:tw-flex-row"
      >
        <div class="tw-text-gray-900 tw-text-sm tw-text-center sm:tw-text-left">
          © {{ new Date().getFullYear() }} —
          <span class="tw-font-bold">SV Eutingen 1947 e.V.</span>
        </div>
        <span
          class="tw-text-primary tw-font-bold sm:tw-ml-auto sm:tw-mt-0 tw-mt-2 sm:tw-w-auto tw-w-full sm:tw-text-left tw-text-center tw-text-sm"
        >
          #mehralseinverein
        </span>
      </div>
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

<template>
  <Layout :transparent="true" :light="true">
    <hero-section
      id="home"
      v-slot="{ imageClass }"
      title="SV Eutingen"
      subtitle="#mehralseinverein"
      :primary-button="{ text: 'Aktuelles', to: '#aktuelles' }"
      :secondary-button="{ text: 'Mach mit', to: '#mach-mit' }"
    >
      <g-image src="@/assets/home/main.jpg" :class="imageClass" />
    </hero-section>
    <page-section id="aktuelles" title="Aktuelles">
      <div class="tw-space-y-2">
        <div
          v-for="(item, index) in newsItems()"
          :key="index"
          class="tw-p-4 tw-bg-white tw-border-2 tw-border-gray-400 tw-border-solid tw-rounded"
        >
          <div class="tw-flex tw-flex-row tw-items-center tw-pb-4">
            <svg
              class="tw-flex-none tw-w-5 tw-h-5 tw-text-red-800 tw-fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="tw-pl-2 tw-text-xl tw-font-semibold">
              {{ item.title }}
            </div>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="tw-text-sm" v-html="item.text" />
        </div>
      </div>
    </page-section>
    <page-section dark title="Mach mit">
      <div class="tw-space-y-2">
        <div
          v-for="(item, index) in newsItems()"
          :key="index"
          class="tw-p-4 tw-bg-white tw-border-2 tw-border-gray-400 tw-border-solid tw-rounded"
        >
          <div class="tw-flex tw-flex-row tw-items-center tw-pb-4">
            <svg
              class="tw-flex-none tw-w-5 tw-h-5 tw-text-red-800 tw-fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="tw-pl-2 tw-text-xl tw-font-semibold">
              {{ item.title }}
            </div>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="tw-text-sm" v-html="item.text" />
        </div>
      </div>
    </page-section>
    <section id="mach-mit">
      <join></join>
    </section>
  </Layout>
</template>

<script>
import heroSection from '@/components/common/HeroSection'
import pageSection from '@/components/common/PageSection'
import news from '@/data/news.json'
import join from '@/components/sections/Join'

export default {
  components: {
    heroSection,
    pageSection,
    join,
  },
  data() {
    return {
      news,
    }
  },
  methods: {
    newsItems() {
      return this.news.slice(0, 4)
    },
  },
}
</script>

<template>
  <Layout>
    <page-section title="Historie">
      <div class="tw-pb-6">
        Dank der großartigen Recherchearbeiten unserer Dorfhistoriker Willi
        Schaupp, Peter Mücke und Rainer Sattler verfügen wir über eine
        detaillierte Auflistung der SVE-Historie. Für unseren Verein sind diese
        Informationen sehr wertvoll. Denn wer Zukunft gestalten will, muss seine
        Wurzeln kennen.
      </div>
      <div class="tw-w-full tw-h-full tw-mx-auto">
        <div class="tw-relative tw-h-full tw-overflow-hidden tw-wrap">
          <div
            class="tw-absolute tw-h-full tw-border tw-border-gray-700 tw-border-opacity-25 tw-left-3 lg:tw-left-1/2"
          />

          <div
            v-for="(item, index) in history"
            :key="index"
            class="tw-flex tw-items-center tw-justify-between tw-w-full"
            :class="{
              'lg:tw-flex-row-reverse': index % 2 != 0,
              'tw-mt-8': index > 0,
            }"
          >
            <div class="tw-order-1 tw-hidden tw-w-5/12 lg:tw-block">
              <image-viewer
                v-if="item.images"
                height="300"
                :images="item.images"
              ></image-viewer>
            </div>
            <div
              class="tw-z-10 tw-flex tw-items-center tw-flex-none tw-order-1 tw-w-6 tw-h-6 tw-bg-red-800 tw-border-white tw-rounded-full tw-shadow tw-border-3"
            >
              <div
                class="tw-mx-auto tw-text-lg tw-font-semibold tw-text-white"
              ></div>
            </div>
            <div class="tw-order-1 tw-w-full tw-ml-6 lg:tw-m-0 lg:tw-w-5/12">
              <div
                class="tw-flex tw-items-center tw-mb-3 tw-text-lg tw-font-medium tw-text-gray-800 md:tw-text-xl"
              >
                <div>{{ item.date }}</div>
                <button
                  v-if="item.images"
                  class="tw-block tw-h-6 tw-ml-2 tw-text-gray-500 lg:tw-hidden"
                  @click="showFullscreen(item.images)"
                >
                  <svg
                    class="tw-w-6 tw-h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="tw-text-sm tw-leading-relaxed tw-text-gray-800 md:tw-leading-normal md:tw-text-base"
                v-html="item.text"
              />
            </div>
          </div>
        </div>
      </div>
      <fullscreen-image-viewer
        v-model="fullscreen"
        :images="fullscreenImages"
        :start-index="0"
      />
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import imageViewer from '@/components/common/ImageViewer'
import fullscreenImageViewer from '@/components/common/FullscreenImageViewer'
import history from '@/data/history.json'

export default {
  metaInfo: {
    title: 'Historie',
  },
  components: { pageSection, imageViewer, fullscreenImageViewer },
  data() {
    return {
      history,
      fullscreen: false,
      fullscreenImages: [],
    }
  },
  methods: {
    showFullscreen(images) {
      this.fullscreenImages = images
      this.fullscreen = true
    },
  },
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <Layout>
    <page-section title="Historie">
      <div class="pb-6">
        Dank der großartigen Recherchearbeiten unserer Dorfhistoriker Willi
        Schaupp, Peter Mücke und Rainer Sattler verfügen wir über eine
        detaillierte Auflistung der SVE-Historie. Für unseren Verein sind diese
        Informationen sehr wertvoll. Denn wer Zukunft gestalten will, muss seine
        Wurzeln kennen.
      </div>
      <div class="w-full h-full mx-auto">
        <div class="relative h-full overflow-hidden wrap">
          <div
            class="absolute h-full border border-gray-700 border-opacity-25 left-3 lg:left-1/2"
          />

          <div
            v-for="(edge, index) in $page.history.edges"
            :key="index"
            class="flex items-center justify-between w-full"
            :class="{
              'lg:flex-row-reverse': index % 2 != 0,
              'mt-8': index > 0,
            }"
          >
            <div class="order-1 hidden w-5/12 lg:block">
              <image-viewer
                v-if="edge.node.images"
                height="300"
                :images="edge.node.images"
              ></image-viewer>
            </div>
            <div
              class="z-10 flex items-center flex-none order-1 w-6 h-6 bg-red-800 border-white rounded-full shadow border-3"
            >
              <div class="mx-auto text-lg font-semibold text-white"></div>
            </div>
            <div class="order-1 w-full ml-6 lg:m-0 lg:w-5/12">
              <div
                class="flex items-center mb-3 text-lg font-medium text-gray-800 md:text-xl"
              >
                <div>{{ edge.node.date }}</div>
                <button
                  v-if="edge.node.images"
                  aria-label="show fullscreen"
                  class="block h-6 ml-2 text-gray-500 lg:hidden"
                  @click="showFullscreen(edge.node.images)"
                >
                  <svg
                    class="w-6 h-6"
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
                class="text-sm leading-relaxed text-gray-800 md:leading-normal md:text-base"
                v-html="edge.node.text"
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
import { ref } from '@vue/composition-api'
import pageSection from '@/components/common/pageSection'
import imageViewer from '@/components/common/imageViewer'
import fullscreenImageViewer from '@/components/common/fullscreenImageViewer'

export default {
  metaInfo: {
    title: 'Historie',
  },
  components: { pageSection, imageViewer, fullscreenImageViewer },
  setup() {
    const fullscreen = ref(false)
    const fullscreenImages = ref([])

    function showFullscreen(images) {
      fullscreenImages.value = images
      fullscreen.value = true
    }

    return {
      fullscreen,
      fullscreenImages,
      showFullscreen,
    }
  },
}
</script>

<page-query>
query {
  history: allHistory(sortBy: "sortIndex", order: ASC) {
    edges {
      node {
        date
        text
        images
      }
    }
  }
}
</page-query>

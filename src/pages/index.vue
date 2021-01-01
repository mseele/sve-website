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
      <div class="tw-space-y-4">
        <div
          v-for="edge in $page.news.edges"
          :key="edge.node.id"
          class="tw-p-4 tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
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
              {{ edge.node.title }}
            </div>
          </div>
          <!-- eslint-disable-next-line prettier/prettier | eslint-disable-next-line vue/no-v-html -->
          <div class="tw-text-gray-700 " v-html="edge.node.text"/>
        </div>
      </div>
    </page-section>
    <page-section id="mach-mit" dark title="Mach mit">
      <div class="tw-font-medium">
        Du suchst Teamsport oder Fitness-Angebote? Du hast Lust auf Ehrenamt?
        Oder suchst eine starke Sponsoringpartnerschaft für Dein Unternehmen?
      </div>
      <div class="tw-pt-2 tw-pb-4">
        Bei uns bist Du richtig. Denn wir entfalten Talente, ermöglichen
        Mannschafts- und Gesundheitssport, stiften Gemeinschaft und leben
        Partnerschaften.
      </div>
      <div class="tw-flex tw-flex-wrap tw--m-2">
        <div
          v-for="edge in $page.joins.edges"
          :key="edge.node.id"
          class="tw-w-full tw-p-2 lg:tw-w-1/2"
        >
          <div
            class="tw-flex tw-flex-col tw-h-full tw-overflow-hidden tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
          >
            <div class="tw-relative tw-pb-3/5 sm:tw-pb-1/2 md:tw-pb-2/5">
              <g-image
                :src="edge.node.image"
                class="tw-absolute tw-object-cover tw-w-full tw-h-full"
              />
            </div>
            <div class="tw-flex tw-flex-col tw-flex-grow tw-p-4">
              <div class="tw-mb-3 tw-text-lg tw-font-medium tw-text-gray-900">
                {{ edge.node.title }}
              </div>
              <p class="tw-flex-grow tw-text-gray-700">
                {{ edge.node.text }}
              </p>
              <div class="tw-text-center">
                <a
                  :href="edge.node.link"
                  class="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-font-medium tw-text-red-800 tw-no-underline tw-rounded-full hover:tw-bg-red-100 hover:tw-bg-opacity-50 active:tw-text-red-900 md:tw-mb-2 lg:tw-mb-0 tw-on-focus"
                >
                  Mehr Infos
                  <svg
                    class="tw-w-4 tw-h-4 tw-ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import heroSection from '@/components/common/HeroSection'
import pageSection from '@/components/common/PageSection'

export default {
  components: {
    heroSection,
    pageSection,
  },
}
</script>

<page-query>
query {
  news: allNews(order: ASC) {
    edges {
      node {
        id
        title
        text
      }
    }
  }
  joins: allJoin(order: ASC) {
    edges {
      node {
        id
        title
        text
        link
        image(width: 620)
      }
    }
  }
}
</page-query>

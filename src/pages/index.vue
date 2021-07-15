<template>
  <Layout :transparent="true" :light="true">
    <hero-section
      id="home"
      title="SV Eutingen"
      subtitle="#mehralseinverein"
      :image="$page.heroImages.src"
      :primary-button="{ text: 'Aktuelles', to: '#aktuelles' }"
      :secondary-button="{ text: 'Mach mit', to: '#mach-mit' }"
    />
    <page-section id="aktuelles" title="Aktuelles">
      <div class="space-y-4">
        <div
          v-for="edge in $page.news.edges"
          :key="edge.node.id"
          class="p-4 bg-white border-2 border-gray-300 rounded"
        >
          <div class="flex flex-row items-center pb-4">
            <svg
              class="flex-none w-5 h-5 text-red-800 fill-current"
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
            <div class="pl-2 text-xl font-semibold">
              {{ edge.node.title }}
            </div>
          </div>
          <expandableContent
            :content="edge.node.text"
            :collapsed="edge.node.collapsed"
          />
        </div>
      </div>
    </page-section>
    <page-section id="mach-mit" dark title="Mach mit">
      <div class="font-medium">
        Du suchst Teamsport oder Fitness-Angebote? Du hast Lust auf Ehrenamt?
        Oder suchst eine starke Sponsoringpartnerschaft für Dein Unternehmen?
      </div>
      <div class="pt-2 pb-4">
        Bei uns bist Du richtig. Denn wir entfalten Talente, ermöglichen
        Mannschafts- und Gesundheitssport, stiften Gemeinschaft und leben
        Partnerschaften.
      </div>
      <div class="flex flex-wrap -m-2">
        <div
          v-for="edge in $page.joins.edges"
          :key="edge.node.id"
          class="w-full p-2 lg:w-1/2"
        >
          <g-link
            :to="edge.node.link"
            class="flex flex-col h-full overflow-hidden bg-white border-2 border-gray-300 rounded hover:shadow-sm group focus:outline-none focus-visible:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            <div class="relative overflow-hidden pb-3/5 sm:pb-1/2 md:pb-2/5">
              <g-image
                :src="edge.node.image"
                :alt="edge.node.title"
                class="absolute object-cover w-full h-full transition duration-500 ease-in-out group-hover:transform-gpu group-hover:scale-110"
              />
            </div>
            <div class="flex flex-col flex-grow p-4">
              <div
                class="mb-3 text-lg font-medium text-gray-800 group-hover:text-black"
              >
                {{ edge.node.title }}
              </div>
              <p class="flex-grow text-gray-700 group-hover:text-gray-900">
                {{ edge.node.text }}
              </p>
            </div>
          </g-link>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import heroSection from '@/components/common/heroSection'
import pageSection from '@/components/common/pageSection'
import expandableContent from '@/components/controls/expandableContent'

export default {
  components: {
    heroSection,
    pageSection,
    expandableContent,
  },
}
</script>

<page-query>
query {
  heroImages(id: "home") {
    src
  }
  news: allNews(order: ASC) {
    edges {
      node {
        id
        title
        text
        collapsed
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

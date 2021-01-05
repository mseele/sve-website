<template>
  <Layout :transparent="true">
    <hero-section
      title="Sponsoring"
      subtitle="PROFITIERE MIT UNS"
      :image="$page.heroImages.src"
      :primary-button="{ text: 'Bandenwerbung', to: '#bande' }"
      :secondary-button="{ text: 'Unsere Partner', to: '#partner' }"
    />
    <page-section title="Sponsoring">
      Unsere Sponsoren und Partner ermöglichen durch ihre finanzielle und
      materielle Unterstützung das sportliche und kulturelle Angebot des SV
      Eutingen. Durch solche Kooperationen ist es möglich, ein ehrenamtlich
      breites Sportangebot auf die Beine zu stellen. Deshalb fühlen wir uns
      unseren Sponsoren gegenüber verpflichtet und nehmen deren Dienstleistungen
      und Produkte in Anspruch. Wenn ein besonderes Firmenevent, wie bspw. ein
      Jubiläum ins Haus steht, packen wir auch gerne tatkräftig mit an.<br />
      Die Möglichkeiten einer Sponsoringpartnerschaft sind vielfältig: Sponsoren
      können bspw. direkt in die Aus- und Weiterbildung unserer Jugendtrainer
      investieren oder für ein bestimmtes Team auf deren Trikots oder sonstigem
      Equipment Werbung machen. Hast auch Du Interesse an einer Partnerschaft?
      Dann wende Dich bitte über das
      <g-link
        class="rounded on-focus-dark"
        :to="{
          path: '/kontakt/',
          query: { auswahl: 'sponsoring', thema: 'sponsoring' },
        }"
        >Kontaktformular</g-link
      >
      an unseren Vorsitzenden Sebastian Lazar, der für Gespräche gerne zur
      Verfügung steht.
    </page-section>
    <page-section id="bande" title="Bandenwerbung" dark>
      Außerdem bieten wir mit unserem Partner der Eutinger Sportplatz- und
      Vereinswerbung GbR seit über 20 Jahren Bandenwerbung auf unserer sehr
      belebten Sportanlage. Die Abwicklung läuft unkompliziert. Wir kümmern uns
      über Anschaffung und Pflege der Bandenwerbung.
      <br />
      Bei Interesse stehen Dir über das
      <g-link
        class="rounded on-focus-dark"
        :to="{
          path: '/kontakt/',
          query: { auswahl: 'sponsoring', thema: 'bande' },
        }"
        >Kontaktformular</g-link
      >
      Franz Nesch und Thomas Akermann gerne zur Verfügung.
      <div class="flex flex-col pt-6 sm:flex-row sm:justify-center">
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Vertrag-Bandenwerbung.pdf"
          first-row="VERTRAG"
          second-row="Bandenwerbung"
          dark
          class="w-full sm:w-2/5 xl:w-1/4 2xl:w-1/5"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
        </btn>
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Preise-Bandenwerbung.pdf"
          first-row="PREISE"
          second-row="Bandenwerbung"
          dark
          class="w-full mt-4 sm:w-2/5 xl:w-1/4 2xl:w-1/5 sm:ml-4 sm:mt-0 lg:ml-8 2xl:ml-20"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
              clip-rule="evenodd"
            />
          </svg>
        </btn>
      </div>
    </page-section>
    <page-section id="partner" title="Unsere Partner">
      <div class="-mb-2">
        Mit diesen langjährigen Partnern leben wir Zusammenarbeit. Durch ihre
        materielle und finanzielle Unterstützung ermöglichen sie unser
        ehrenamtliches Angebot und machen auf ihre Produkte und Dienstleistungen
        aufmerksam. Partnerschaft bedeutet für uns, dass beide Seiten
        profitieren. Klickt auf die Namen und gelangt direkt auf die Homepage
        unserer Partner.
      </div>
      <div
        v-for="(key, groupIndex) in Object.keys(sponsors)"
        :key="groupIndex"
        class="pt-8"
      >
        <header-title dark class="text-xl font-medium">
          {{ key }}
        </header-title>
        <div class="flex flex-wrap lg:-ml-4">
          <div
            v-for="(item, index) of sponsors[key]"
            :key="index"
            class="w-full pt-4 lg:pl-4 lg:w-1/2"
          >
            <component
              :is="item.url ? 'a' : 'div'"
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="flex items-center h-full p-4 text-black bg-white rounded on-focus-dark"
              :class="{ 'hover:bg-gray-200': item.url }"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 mr-4 text-red-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium title-font">{{ item.name }}</span>
            </component>
          </div>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import heroSection from '@/components/common/heroSection'
import pageSection from '@/components/common/pageSection'
import headerTitle from '@/components/controls/headerTitle'
import btn from '@/components/controls/downloadButton'
import sponsoring from '@/data/sponsoring.json'

export default {
  metaInfo: {
    title: 'Sponsoring',
  },
  components: { heroSection, pageSection, headerTitle, btn },
  data() {
    return {
      sponsors: this.groupSponsors(sponsoring),
    }
  },
  methods: {
    groupSponsors(sponsoring) {
      return sponsoring
        .slice()
        .sort((a, b) => {
          const nameA = a.groupBy.toUpperCase()
          const nameB = b.groupBy.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        .reduce((acc, item) => {
          const key = item.groupBy.toUpperCase().charAt(0)
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {})
    },
  },
}
</script>

<page-query>
query {
  heroImages(id: "sponsoring") {
    src
  }
}
</page-query>

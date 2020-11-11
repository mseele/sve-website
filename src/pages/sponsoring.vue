<template>
  <Layout :transparent="true">
    <hero-section
      v-slot="{ imageClass }"
      title="Sponsoring"
      subtitle="PROFITIERE MIT UNS"
      :primary-button="{ text: 'Bandenwerbung', to: '#bande' }"
      :secondary-button="{ text: 'Unsere Partner', to: '#partner' }"
    >
      <g-image src="@/assets/sponsoring/main.jpg" :class="imageClass" />
    </hero-section>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>SPONSORING</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Unsere Sponsoren und Partner ermöglichen durch ihre finanzielle und
            materielle Unterstützung das sportliche und kulturelle Angebot des
            SV Eutingen. Durch solche Kooperationen ist es möglich, ein
            ehrenamtlich breites Sportangebot auf die Beine zu stellen. Deshalb
            fühlen wir uns unseren Sponsoren gegenüber verpflichtet und nehmen
            deren Dienstleistungen und Produkte in Anspruch. Wenn ein besonderes
            Firmenevent, wie bspw. ein Jubiläum ins Haus steht, packen wir auch
            gerne tatkräftig mit an.<br />
            Die Möglichkeiten einer Sponsoringpartnerschaft sind vielfältig:
            Sponsoren können bspw. direkt in die Aus- und Weiterbildung unserer
            Jugendtrainer investieren oder für ein bestimmtes Team auf deren
            Trikots oder sonstigem Equipment Werbung machen. Hast auch Du
            Interesse an einer Partnerschaft? Dann wende Dich bitte über das
            <g-link
              :to="{
                path: '/kontakt',
                query: { auswahl: 'sponsoring', thema: 'sponsoring' },
              }"
              >Kontaktformular</g-link
            >
            an unseren Vorsitzenden Sebastian Lazar, der für Gespräche gerne zur
            Verfügung steht.
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="bande" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>BANDENWERBUNG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Außerdem bieten wir mit unserem Partner der Eutinger Sportplatz- und
            Vereinswerbung GbR seit über 20 Jahren Bandenwerbung auf unserer
            sehr belebten Sportanlage. Die Abwicklung läuft unkompliziert. Wir
            kümmern uns über Anschaffung und Pflege der Bandenwerbung.
            <br />
            Bei Interesse stehen Dir über das
            <g-link
              :to="{
                path: '/kontakt',
                query: { auswahl: 'sponsoring', thema: 'bande' },
              }"
              >Kontaktformular</g-link
            >
            Franz Nesch und Thomas Akermann gerne zur Verfügung.
          </v-col>
          <v-col cols="12" sm="6">
            <v-row justify="center" no-gutters>
              <v-btn
                text
                rounded
                color="primary"
                href="/downloads/2020/Vertrag-Bandenwerbung.pdf"
                target="_blank"
              >
                <v-icon left>{{ mdiCloudDownload }}</v-icon
                >Vertrag Bandenwerbung</v-btn
              >
            </v-row>
          </v-col>
          <v-col cols="12" sm="6">
            <v-row justify="center" no-gutters>
              <v-btn
                text
                rounded
                color="primary"
                href="/downloads/2020/Preise-Bandenwerbung.pdf"
                target="_blank"
              >
                <v-icon left>{{ mdiCloudDownload }}</v-icon
                >Preise Bandenwerbung</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="partner" class="section">
      <v-container>
        <v-row class="pb-2">
          <v-col cols="12">
            <h2>UNSERE PARTNER</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Mit diesen langjährigen Partnern leben wir Zusammenarbeit. Durch
            ihre materielle und finanzielle Unterstützung ermöglichen sie unser
            ehrenamtliches Angebot und machen auf ihre Produkte und
            Dienstleistungen aufmerksam. Partnerschaft bedeutet für uns, dass
            beide Seiten profitieren. Klickt auf die Namen und gelangt direkt
            auf die Homepage unserer Partner.
          </v-col>
        </v-row>
        <v-row
          v-for="(key, groupIndex) in Object.keys(sponsors)"
          :key="groupIndex"
          :class="{ 'pt-6 pt-sm-8 pt-lg-10': groupIndex > 0 }"
        >
          <v-col cols="12">
            <h3>{{ key }}</h3>
          </v-col>
          <v-col
            v-for="(item, index) of sponsors[key]"
            :key="index"
            class="py-0"
            cols="12"
            lg="6"
          >
            <ul>
              <li class="font-weight-medium">
                <a
                  v-if="item.url"
                  :href="item.url"
                  class="sponsor"
                  target="_blank"
                  rel="noopener"
                >
                  {{ item.name }}
                </a>
                <span v-else>{{ item.name }}</span>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </Layout>
</template>

<script>
import heroSection from '@/components/base/HeroSection'
import { mdiCloudDownload } from '@mdi/js'
import sponsoring from '@/data/sponsoring.json'

export default {
  metaInfo: {
    title: 'Sponsoring',
  },
  components: { heroSection },
  data() {
    return {
      mdiCloudDownload,
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

<style lang="scss">
.sponsor {
  color: black !important;
  text-decoration-line: none !important;

  &:hover,
  &:focus {
    text-decoration: underline !important;
  }
}
</style>

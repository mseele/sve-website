<template>
  <section class="pa-0">
    <v-img
      :lazy-src="require('~/assets/sponsoring/main-min.jpg?original&inline')"
      :src="require('~/assets/sponsoring/main.jpg?original')"
      height="100vh"
    >
      <v-container fill-height>
        <v-row align="center" class="pt-5 px-3">
          <v-sheet class="transparent black--text" max-width="500">
            <h1 class="display-2 white--text">Sponsoring</h1>
            <div class="headline white--text py-4">
              WERDE UNSER PARTNER
            </div>
            <v-row class="mx-0 mt-4">
              <v-btn
                to="#bande"
                nuxt
                rounded
                depressed
                outlined
                dark
                class="mr-2 mt-2"
                >Bandenwerbung</v-btn
              >
              <v-btn to="#partner" nuxt rounded depressed class="mt-2"
                >Unsere Partner</v-btn
              >
            </v-row>
          </v-sheet>
        </v-row>
      </v-container>
    </v-img>
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
            <nuxt-link
              :to="{
                path: '/kontakt',
                query: { auswahl: 'sponsoring', thema: 'sponsoring' },
              }"
              >Kontaktformular</nuxt-link
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
            <nuxt-link
              :to="{
                path: '/kontakt',
                query: { auswahl: 'sponsoring', thema: 'bande' },
              }"
              >Kontaktformular</nuxt-link
            >
            Franz Nesch und Thomas Akermann gerne zur Verfügung.
          </v-col>
          <v-col cols="12" sm="6">
            <v-row justify="center" no-gutters>
              <v-btn
                text
                rounded
                color="primary"
                href="/downloads/Vertrag-Bandenwerbung.pdf"
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
                href="/downloads/Preise-Bandenwerbung.pdf"
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
            Ganz kurzer Text - ca. 1 Satz oder 2. Ungefähr eine Zeile...
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
  </section>
</template>

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

<script>
import { mdiCloudDownload } from '@mdi/js'

export default {
  layout: 'transparent',
  data() {
    return {
      mdiCloudDownload,
      sponsors: this.groupSponsors(),
    }
  },
  methods: {
    groupSponsors() {
      return this.$store.state.sponsoring.sponsors
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
  head() {
    return {
      title: 'Sponsoring',
    }
  },
}
</script>

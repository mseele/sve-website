<template>
  <Layout :transparent="true">
    <section class="pa-0">
      <v-img src="@/assets/gaststaette/main-g.jpg?vuetify-preload" height="100vh">
        <v-container fill-height>
          <v-row align="center" class="pt-5 px-3">
            <v-sheet class="transparent white--text" max-width="500">
              <h1 class="display-2 black--text">Auszeit</h1>
              <div class="headline black--text py-4">
                UNSERE VEREINSGASTSTÄTTE
              </div>
              <v-row class="mx-0 mt-6">
                <v-btn to="#infos" rounded depressed outlined class="mr-2"
                  >Infos</v-btn
                >
                <v-btn to="#oeffnungszeiten" rounded dark depressed
                  >Öffnungszeiten</v-btn
                >
              </v-row>
            </v-sheet>
          </v-row>
        </v-container>
      </v-img>
      <section id="infos" class="section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2>INFOS</h2>
            </v-col>
            <v-col cols="12" class="subtitle-1 font-weight-bold"
              >In unserer Vereinsgaststätte Auszeit Eutingen findest Du die
              perfekte Einkehrmöglichkeit.</v-col
            >
            <v-col cols="12" class="subtitle-1 pt-0"
              >Ob Samstags zur Bundesliga, unter der Woche mit Freunden, auf ein
              Eis an heißen Sommertagen auf der Terrasse oder für ein deftiges
              Essen:<br />
              Schau' bei unseren bewährten Pächtern Andrea und Micha vorbei und
              erlebe gesellige Stunden.</v-col
            >
            <v-col cols="12" class="subtitle-1 pt-0">
              Auch für eine Firmenfeier, Geburtstage und sonstige Anlässe bietet
              die Gaststätte Platz für bis zu 150 Personen.</v-col
            ><v-col cols="12" class="subtitle-1 pt-0"
              >Weitere Informationen findest Du auf der
              <a
                href="https://fb.com/Auszeit-Eutingen-981850018516219"
                target="_blank"
                rel="noreferrer"
                >Facebook-Seite</a
              >
              der Auszeit Eutingen.</v-col
            >
          </v-row>
        </v-container>
      </section>
      <section class="section_alt">
        <v-container>
          <v-row>
            <v-col cols="12" lg="8">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h2>BILDER</h2>
                  </v-col>
                  <v-col cols="12">
                    <image-viewer height="525" :images="images"></image-viewer>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" lg="4">
              <v-container id="oeffnungszeiten">
                <v-row>
                  <v-col cols="12">
                    <h2>ÖFFNUNGSZEITEN</h2>
                  </v-col>
                  <v-col cols="12">
                    <v-card outlined>
                      <v-card-text>
                        <div class="body-2">Dienstag bis Freitag</div>
                        <div
                          class="subtitle-1 font-weight-medium pb-0 text--primary"
                        >
                          16 - 1 Uhr
                        </div>
                      </v-card-text>
                      <v-card-text class="pt-0">
                        <div class="body-2">Samstag</div>
                        <div
                          class="subtitle-1 font-weight-medium pb-0 text--primary"
                        >
                          14 - 1 Uhr
                        </div>
                      </v-card-text>
                      <v-card-text class="pt-0">
                        <div class="body-2">Sonntag</div>
                        <div
                          class="subtitle-1 font-weight-medium pb-0 text--primary"
                        >
                          14 - 22 Uhr
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h2>KONTAKT</h2>
                  </v-col>
                  <v-col cols="12">
                    <v-card outlined>
                      <v-card-title>
                        Auszeit Eutingen
                      </v-card-title>
                      <v-card-text>
                        <div
                          class="subtitle-1 font-weight-medium text--primary"
                        >
                          <div class="pb-2">Micha Gruidl</div>
                          <div>
                            Marktstr. 84<br />
                            72184 Eutingen im Gäu<br />
                          </div>
                        </div>
                      </v-card-text>
                      <v-card-actions class="justify-center">
                        <v-btn
                          rounded
                          text
                          class="px-5"
                          color="primary"
                          :to="{
                            path: $static.metadata.pathPrefix + '/kontakt',
                            query: { auswahl: 'restaurant' },
                          }"
                          >Kontakt</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </section>
  </Layout>
</template>

<script>
import imageViewer from '@/components/common/ImageViewer'

export default {
  metaInfo: {
    title: 'Gaststätte',
  },
  components: {
    imageViewer,
  },
  layout: 'transparent',
  data() {
    return {
      images: [
        {
          src: 'gaststaette/1.jpg',
          lazy: 'gaststaette/1-min.jpg',
        },
        {
          src: 'gaststaette/2.jpg',
          lazy: 'gaststaette/2-min.jpg',
        },
        {
          src: 'gaststaette/3.jpg',
          lazy: 'gaststaette/3-min.jpg',
        },
      ],
    }
  },
}
</script>

<static-query>
query {
  metadata {
    pathPrefix
  }
}
</static-query>

<template>
  <div>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>EVENTS</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Herzlich willkommen beim Fitnessangebot des SV Eutingen 1947 e.V.
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight.
            Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen
            und kannst Dich über Programm, Ort und Zeit auf dem Laufenden
            halten. Bei Angeboten, die eine Anmeldung erforderlich machen,
            kannst Du Dich direkt online anmelden.
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Deshalb: Schaue regelmäßig auf unserer Seite vorbei und nimm' an
            unseren Events teil.<br />Wir freuen uns auf Dich!
          </v-col>
        </v-row>
      </v-container>
    </section>
    <template v-if="events.length > 0">
      <section class="section_alt">
        <events :events="events"></events>
      </section>
      <section class="section">
        <v-col cols="12" class="subtitle-1 text-center pt-12 pb-2">
          Erhalte automatisch eine E-Mail sobald neue Events online sind:
        </v-col>
        <!--
            <emailSubscription class="pb-12"></emailSubscription> 
            -->
      </section>
    </template>
    <template v-else>
      <section class="section_alt">
        <v-container>
          <v-row justify="center">
            <v-col
              class="headline font-weight-bold text-center pt-12"
              cols="12"
            >
              Wir planen aktuell die nächsten Events und informieren Dich gerne,
              sobald es Neuigkeiten gibt.
            </v-col>
            <v-col class="subtitle-1 text-center pt-1 pb-12" cols="12">
              Schaue bald wieder vorbei oder registriere Dich hier und erhalte
              automatisch eine E-Mail sobald neue Eventangebote online sind:
            </v-col>
            <!--
            <emailSubscription class="pb-12"></emailSubscription> 
            -->
          </v-row>
        </v-container>
      </section>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
    events: () => import('~/components/sections/Events')
  },
  async asyncData() {
    const res = await axios.get(process.env.eventsAPI)
    return { events: res.data.filter((e) => e.type === 'Events') }
  },
  head() {
    return {
      title: 'Events'
    }
  }
}
</script>

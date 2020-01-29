<template>
  <div>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>FITNESS</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1 font-weight-bold pb-0">
            Du hast Freude an der Gemeinschaft und möchtest Deinem Körper etwas
            Gutes tun?
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Herzlich willkommen beim Fitnessangebot des SV Eutingen 1947 e.V.
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Wir bieten wohnortnahe, qualitativ hochwertige und preiswerte
            Fitnesskurse sowie Angebote des Gesundheitssports an. Unsere
            Kursleiterinnen und Kursleiter verfügen über entsprechende
            Qualifizierungen und machen die Kurse zu einem Ort der Begegnung.
            Schließlich bereitet Sport innerhalb einer Gruppe und Gemeinschaft
            noch mehr Freude. Unsere Kurse stehen selbstverständlich auch
            Nichtmitgliedern des SV Eutingen zur Verfügung.
          </v-col>
          <v-col cols="12" class="subtitle-1 pt-0">
            Wir freuen uns auf Dich!
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
          Erhalte automatisch eine E-Mail sobald neue Kursangebote online sind:
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
              Wir befinden uns aktuell in der Kurspause und planen die nächste
              Runde.
            </v-col>
            <v-col class="subtitle-1 text-center pt-1 pb-12" cols="12">
              Schaue bald wieder vorbei oder erhalte automatisch eine E-Mail
              sobald neue Kursangebote online sind:
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
    return { events: res.data.filter((e) => e.type === 'Fitness') }
  },
  head() {
    return {
      title: 'Fitness'
    }
  }
}
</script>

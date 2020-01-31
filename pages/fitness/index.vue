<template>
  <events title="FITNESS" :events="events">
    <template v-slot:header>
      <v-col cols="12" class="subtitle-1 font-weight-bold pb-0">
        Du hast Freude an der Gemeinschaft und möchtest Deinem Körper etwas
        Gutes tun?
      </v-col>
      <v-col cols="12" class="subtitle-1 pt-0">
        Herzlich Willkommen beim Fitnessangebot des SV Eutingen 1947 e.V.
      </v-col>
      <v-col cols="12" class="subtitle-1 pt-0">
        Wir bieten wohnortnahe, qualitativ hochwertige und preiswerte
        Fitnesskurse sowie Angebote des Gesundheitssports an. Unsere
        Kursleiterinnen und Kursleiter verfügen über entsprechende
        Qualifizierungen und machen die Kurse zu einem Ort der Begegnung.
        Schließlich bereitet Sport innerhalb einer Gruppe und Gemeinschaft noch
        mehr Freude. Unsere Kurse stehen selbstverständlich auch
        Nichtmitgliedern des SV Eutingen zur Verfügung.
      </v-col>
      <v-col cols="12" class="subtitle-1 pt-0">
        Wir freuen uns auf Dich!
      </v-col>
    </template>
    <template v-slot:subscribeInfo>
      Erhalte automatisch eine E-Mail sobald neue Kursangebote online sind:
    </template>
    <template v-slot:infoEmpty>
      Wir befinden uns aktuell in der Kurspause und planen die nächste Runde.
    </template>
    <template v-slot:subscribeInfoEmpty>
      Schaue bald wieder vorbei oder erhalte automatisch eine E-Mail sobald neue
      Kursangebote online sind:
    </template>
  </events>
</template>

<script>
import axios from 'axios'

export default {
  components: {
    events: () => import('~/components/events/Events')
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

<template>
  <events
    title="EVENTS"
    :events="events"
    subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
  >
    <template v-slot:header>
      <v-col cols="12" class="subtitle-1 font-weight-bold pt-0">
        Herzlich Willkommen beim Fitnessangebot des SV Eutingen 1947 e.V.
      </v-col>
      <v-col cols="12" class="subtitle-1 pt-0">
        Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight. Auf
        dieser Seite findest Du das gesamte Eventangebot des SV Eutingen und
        kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten. Bei
        Angeboten, die eine Anmeldung erforderlich machen, kannst Du Dich direkt
        online anmelden.
      </v-col>
      <v-col cols="12" class="subtitle-1 pt-0">
        Deshalb: Schaue regelmäßig auf unserer Seite vorbei und nimm' an unseren
        Events teil.<br />Wir freuen uns auf Dich!
      </v-col>
    </template>
    <template v-slot:subscribeInfo>
      Erhalte automatisch eine E-Mail sobald neue Events online sind:
    </template>
    <template v-slot:infoEmpty>
      Wir planen aktuell die nächsten Events und informieren Dich gerne, sobald
      es Neuigkeiten gibt.
    </template>
    <template v-slot:subscribeInfoEmpty>
      Schaue bald wieder vorbei oder registriere Dich hier und erhalte
      automatisch eine E-Mail sobald neue Eventangebote online sind:
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
    return { events: res.data.filter((e) => e.type === 'Events') }
  },
  head() {
    return {
      title: 'Events'
    }
  }
}
</script>

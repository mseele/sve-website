<template>
  <Layout>
    <events
      title="EVENTS"
      event-title="AKTUELLE EVENTS"
      :events="$page.events.edges"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
    >
      <template #header>
        <v-col cols="12" class="subtitle-1 font-weight-bold pt-0">
          Herzlich Willkommen beim Fitnessangebot des SV Eutingen 1947 e.V.
        </v-col>
        <v-col cols="12" class="subtitle-1 pt-0">
          Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight.
          Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen
          und kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten.
          Bei Angeboten, die eine Anmeldung erforderlich machen, kannst Du Dich
          direkt online anmelden.
        </v-col>
        <v-col cols="12" class="subtitle-1 pt-0">
          Deshalb: Schaue regelmäßig auf unserer Seite vorbei und nimm' an
          unseren Events teil.<br />Wir freuen uns auf Dich!
        </v-col>
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Events online sind:
      </template>
      <template #infoEmpty>
        Wir planen aktuell die nächsten Events und informieren Dich gerne,
        sobald es Neuigkeiten gibt.
      </template>
      <template #subscribeInfoEmpty>
        Schaue bald wieder vorbei oder registriere Dich hier und erhalte
        automatisch eine E-Mail sobald neue Eventangebote online sind:
      </template>
    </events>
    <pre-booking :hash="preBookingHash" />
  </Layout>
</template>

<script>
import axios from 'axios'
import events from '@/components/events/Events'
import preBooking from '@/components/events/PreBooking'

export default {
  metaInfo: {
    title: 'Events',
  },
  components: {
    events,
    preBooking,
  },
  data() {
    return {
      preBookingHash: null,
    }
  },
  mounted() {
    const value = this.$route.query.pb
    if (value) {
      this.preBookingHash = value
    }
  },
}
</script>

<page-query>
query {
  events: allEvent(
    sortBy: "sortIndex"
    order: ASC
    filter: { type: { eq: "Events" } }
  ) {
    edges {
      node {
        id
        name
        image
        shortDescription
      }
    }
  }
}
</page-query>

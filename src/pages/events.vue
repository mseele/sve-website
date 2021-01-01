<template>
  <Layout>
    <events
      title="EVENTS"
      event-title="AKTUELLE EVENTS"
      :events="$page.events.edges"
      to-prefix="/events/"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
    >
      <template #header>
        <div class="tw-pb-4 tw-font-medium tw-leading-relaxed">
          Herzlich Willkommen beim Eventangebot des SV Eutingen 1947 e.V.
        </div>
        <div class="tw-pb-4 tw-leading-relaxed">
          Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight.
          Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen
          und kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten.
          Bei Angeboten, die eine Anmeldung erforderlich machen, kannst Du Dich
          direkt online anmelden.
        </div>
        <div class="tw-leading-relaxed">
          Deshalb: Schaue regelmäßig auf unserer Seite vorbei und nimm' an
          unseren Events teil.<br />
          Wir freuen uns auf Dich!
        </div>
      </template>
      <template #infoEmpty>
        Wir planen aktuell die nächsten Events und informieren Dich gerne,
        sobald es Neuigkeiten gibt.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Events online sind.
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
        image(width: 620)
        shortDescription
      }
    }
  }
}
</page-query>

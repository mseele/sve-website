<template>
  <Layout>
    <events
      title="EVENTS"
      event-title="AKTUELLE EVENTS"
      :events="$page.events.edges"
      to-prefix="/events/"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
      pre-booking-prefix="Event"
    >
      <template #header>
        <div class="pb-4 font-medium leading-relaxed">
          Herzlich Willkommen beim Eventangebot des SV Eutingen 1947 e.V.
        </div>
        <div class="pb-4 leading-relaxed">
          Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight.
          Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen
          und kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten.
          Bei Angeboten, die eine Anmeldung erforderlich machen, kannst Du Dich
          direkt online anmelden.
        </div>
        <div class="leading-relaxed">
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
  </Layout>
</template>

<script>
import axios from 'axios'
import events from '@/components/events/Events'

export default {
  metaInfo: {
    title: 'Events',
  },
  components: { events },
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

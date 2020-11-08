<template>
  <Layout>
    <events
      title="FITNESS"
      event-title="AKTUELLE KURSE"
      :events="$page.events.edges"
      :faqs="faqs"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Kursangebote online sind. Vielen Dank."
      news-type="Fitness"
    >
      <template #header>
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
          Schließlich bereitet Sport innerhalb einer Gruppe und Gemeinschaft
          noch mehr Freude. Unsere Kurse stehen selbstverständlich auch
          Nichtmitgliedern des SV Eutingen zur Verfügung.
        </v-col>
        <v-col cols="12" class="subtitle-1 pt-0">
          Wir freuen uns auf Dich!
        </v-col>
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Kursangebote online sind:
      </template>
      <template #infoEmpty>
        Wir befinden uns aktuell in der Kurspause und planen die nächste Runde.
      </template>
      <template #subscribeInfoEmpty>
        Schaue bald wieder vorbei oder erhalte automatisch eine E-Mail sobald
        neue Kursangebote online sind:
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
    title: 'Fitness',
  },
  components: {
    events,
    preBooking,
  },
  data() {
    return {
      preBookingHash: null,
      faqs: [
        {
          question: 'Was muss ich zum Kurs mitbringen?',
          answer:
            'Alle benötigten Utensilien werden Dir per Mail bei der Anmeldung mitgeteilt. Wichtig vor allem in den Sommermonaten ist etwas zu trinken.',
        },
        {
          question: 'Können Schichtmitarbeiter am Kursprogramm teilnehmen?',
          answer:
            'Bist du Schichtmitarbeiter und möchtest trotzdem am Kurs teilnehmen, dann suche dir einen Partner aus deiner Gegenschicht, sodass ihr euch die Kursteilnahme teilen könnt. Gib einfach bei der Anmeldung im Kommentarfeld an, mit wem du den Kurs teilst.',
        },
        {
          question:
            'Kann ich für den Kurs über meine Krankenkasse Zuschüsse erhalten?',
          answer:
            'Je nach Krankenkasse und Kurs variiert dies. Informiere dich am besten über deine Krankenkasse, welche Zuschüsse es für dich geben kann. Wir stellen Dir nach Beendigung des Kurses eine Teilnahmebestätigung aus.',
        },
      ],
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
    filter: { type: { eq: "Fitness" } }
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

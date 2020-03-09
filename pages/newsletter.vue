<template>
  <div>
    <section id="anmelden" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>NEWSLETTER ANMELDUNG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Halte Dich mit unseren Newslettern zu Teamsport, Events und/oder
            Fitness immer auf dem neuesten Stand. Keine Sorge: Du wirst keine
            wöchentlichen Spams von uns erhalten, sondern interessante,
            gesammelte Informationen über unsere SVE-Angebot. Trage dafür bitte
            hier Deine Mailadresse ein.
          </v-col>
        </v-row>
        <v-row justify="center">
          <emailSubscription
            success-message="Du erhälst für die ausgewählten Optionen automatisch eine E-Mail. Vielen Dank."
            class="pb-12"
          ></emailSubscription>
        </v-row>
      </v-container>
    </section>
    <section id="abmelden" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>NEWSLETTER ABMELDUNG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Du möchtest Dich von unserem Newsletter abmelden? Schade. Trage
            bitte hier die Mailadresse ein, mit der Du registriert bist und wir
            nehmen Dich umgehend aus dem Verteiler. Danke für Dein Interesse in
            der Vergangenheit!
          </v-col>
        </v-row>
        <v-row justify="center">
          <emailSubscription
            success-message="Du bist für die ausgewählten Optionen vom Newsletter abgemeldet worden und erhälst ab sofort keine Emails mehr."
            type="unsubscribe"
            class="pb-12"
          ></emailSubscription>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import emailSubscription from '~/components/base/EmailSubscription'

export default {
  components: {
    emailSubscription
  },
  head() {
    return {
      title: 'Newsletter'
    }
  }
}
</script>

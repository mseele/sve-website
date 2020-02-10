<template>
  <div>
    <section id="anmelden" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>NEWSLETTER ANMELDUNG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
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
export default {
  components: {
    emailSubscription: () => import('~/components/base/EmailSubscription')
  },
  head() {
    return {
      title: 'Newsletter'
    }
  }
}
</script>

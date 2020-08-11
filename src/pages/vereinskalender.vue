<template>
  <Layout>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>VEREINSKALENDER</h2>
          </v-col>
          <v-col cols="12">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <v-col
                v-for="(edge, index) in $page.appointments.edges"
                :key="index"
                cols="12"
                sm="6"
                lg="4"
                xl="2"
              >
                <appointment :value="edge.node"></appointment>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>TIPPS &amp; TRICKS</h2>
          </v-col>
          <v-col cols="12">
            Über
            <a
              href="https://calendar.google.com/calendar/embed?src=info%40sv-eutingen.de&ctz=Europe%2FBerlin"
              target="_blank"
              rel="noreferrer"
              >diesen Link</a
            >
            können die Termine als Google Kalender geöffnet und auch zu deinem
            persönlichen Kalender hinzugefügt werden.<br />
            <div class="pt-4 subtitle-2">
              Hier findest du den passenden
              <a
                href="https://support.google.com/calendar/answer/37100"
                target="_blank"
                rel="noreferrer"
                >Hilfeartikel</a
              >
              für mehr Informationen.
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </Layout>
</template>

<script>
import Appointment from '@/components/common/Appointment'
export default {
  metaInfo: {
    title: 'Vereinskalender',
  },
  components: {
    Appointment,
  },
}
</script>

<page-query>
query {
  appointments: allAppointment(sortBy: "sortIndex", order: ASC) {
    edges {
      node {
        date
        time
        title
        description
      }
    }
  }
}
</page-query>

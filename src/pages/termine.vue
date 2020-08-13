<template>
  <Layout>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>TERMINE</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Hier findest Du unsere wichtigsten Vereinstermine mit
            unterschiedlichen Veranstaltungen und Events. Details erfährst Du
            durch einen Klick auf den Termin.<br />
            Den digitalen Kalender kannst Du auch als Google-Kalender in Deinen
            persönlichen Kalender integrieren, dann entgeht Dir sicher kein
            Termin mehr.
          </v-col>
          <v-col cols="12">
            <v-row v-if="$page.appointments.edges.length > 0" justify="center">
              <v-timeline>
                <v-timeline-item
                  v-for="(edge, index) in $page.appointments.edges"
                  :key="index"
                  small
                  right
                >
                  <template v-slot:opposite>
                    <div class="title">{{ edge.node.date }}</div>
                    <div class="subtitle-2 grey--text text--darken-3">
                      {{ edge.node.time }}
                    </div>
                  </template>

                  <div class="py-4">
                    <a
                      v-if="edge.node.link"
                      :href="edge.node.link"
                      target="_blank"
                      rel="noreferrer"
                      class="black--text text-decoration-none"
                    >
                      <div class="title mb-4">
                        {{ edge.node.title }}
                      </div>
                      <div
                        v-if="edge.node.description"
                        class="grey--text text--darken-3"
                      >
                        {{ edge.node.description }}
                      </div>
                    </a>
                    <template v-else>
                      <div class="title mb-4">
                        {{ edge.node.title }}
                      </div>
                      <div
                        v-if="edge.node.description"
                        class="grey--text text--darken-3"
                      >
                        {{ edge.node.description }}
                      </div>
                    </template>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-row>
            <v-row v-else justify="center" class="headline py-10">
              In der nächsten Zeit steht kein größerer Termin an.
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
          <v-col cols="12" class="subtitle-1">
            Über
            <a
              href="https://calendar.google.com/calendar/embed?src=info%40sv-eutingen.de&ctz=Europe%2FBerlin"
              target="_blank"
              rel="noreferrer"
              >diesen Link</a
            >
            können die Termine als Google Kalender geöffnet und auch in deinen
            persönlichen Kalender integriert werden.<br />
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
export default {
  metaInfo: {
    title: 'Termine',
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
        link
      }
    }
  }
}
</page-query>

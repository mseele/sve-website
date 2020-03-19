<template>
  <div>
    <section id="kunstrasen" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>MITGLIED WERDEN</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Über 5,3 Millionen Menschen in Baden-Württemberg engagieren sich
            ehrenamtlich. Dafür bieten wir auch beim SVE viele Möglichkeiten. Ob
            Vereinsamt oder reine Mitgliedschaft - mit Deinem Einsatz
            unterstützt Du unsere Arbeit und stiftest gesellschaftlichen
            Nutzen.<br />
            Dein Engagement kann von einer tatkräftigen Unterstützung als
            Helfer, Trainer, Betreuer oder Macher für eine gute Infrastruktur
            über finanzielle Hilfen bis hin zu einer einfachen Mitgliedschaft
            sein.<br />
            Jede Form der Hilfe ist ein Baustein für das große Ganze und
            ermöglicht uns als Verein, dieses wichtige gesellschaftliche Angebot
            aufrechtzuerhalten und Stück für Stück besser zu werden.
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="details" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>MITGLIEDSANTRAG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Hier findest du unseren Mitgliedsantrag als PDF Datei:
          </v-col>
          <v-col cols="12">
            <v-row justify="center" no-gutters>
              <v-btn
                text
                rounded
                color="primary"
                href="/downloads/Mitgliedsantrag-SVE.pdf"
                target="_blank"
              >
                <v-icon left>{{ mdiCloudDownload }}</v-icon
                >Download Mitgliedsantrag</v-btn
              >
            </v-row>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Bitte ausfüllen und dann postalisch an<br />
            <br />
            SV Eutingen 1947 e.V.<br />
            Marktstr. 84<br />
            72184 Eutingen im Gäu<br />
            <br />
            senden.
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mdiCloudDownload } from '@mdi/js'

export default {
  data() {
    return {
      mdiCloudDownload
    }
  },
  head() {
    return {
      title: 'Mitglied werden'
    }
  }
}
</script>

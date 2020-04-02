<template>
  <div>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Der SVE - #mehralseinverein</h2>
          </v-col>
          <v-col cols="12">
            <ul>
              <li>SV Eutingen 1947 e.V.</li>
              <li>unterstützt durch Förderverein des SV Eutingen 1947 e.V.</li>
              <li>
                460 Mitglieder, davon 160 Kinder und Jugendliche unter 18
                Jahren.
              </li>
              <li>
                Abteilungen: Frauenfußball, Herrenfußball, Gymnastik,
                Volleyball, Fitness, Ernährung, Volleyball, Events
              </li>
              <li>
                Vorstandschaft: Sebastian Lazar, Dominik Rakoczy, Dietmar
                Kurbjun (seit 2019)
              </li>
              <li>
                Adresse: SV Eutingen 1947 e.V. / Marktstr. 84 / 72184 Eutingen
                im Gäu
              </li>
              <li>
                Homepage:
                <a href="https://www.sv-eutingen.de">www.sv-eutingen.de</a>
              </li>
              <li>
                Mail:
                <a href="mailto:info@sv-eutingen.de<">info@sv-eutingen.de</a>
              </li>
            </ul>
          </v-col>
          <v-col cols="12">
            <v-row justify="center" no-gutters>
              <v-btn
                text
                rounded
                color="primary"
                href="/downloads/Vereinssatzung-SVE.pdf"
                target="_blank"
              >
                <v-icon left>{{ mdiCloudDownload }}</v-icon
                >Download Vereinssatzung</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Unser Leitbild</h2>
          </v-col>
          <v-col cols="12" class="title">
            SV Eutingen – #mehralseinverein.
          </v-col>
          <v-col cols="12" class="title">
            Wir stiften gesellschaftliche Teilhabe durch Sport und Begegnung.
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Unser sportliches und kulturelles Angebot ermöglicht
            gesellschaftliche Teilhabe. Bei uns begegnen sich Menschen,
            schließen Freundschaften, erfahren Teilhabe und erleben eine schöne
            Zeit.<br />
            Wir lieben die Freudenschreie ausgelassener Kinder, den Torjubel für
            unsere Teams, den Treffpunkt durch unsere Gaststätte Auszeit, die
            Abendsonne am Lagerfeuer.<br />
            <br />
            Wir entfalten die Talente unserer Mitglieder, packen an und trauen
            einander etwas zu. Durch Reflexion, ehrliches Feedback, Aus- und
            Weiterbildung werden wir besser. Unser Verein entwickelt sich
            gesund. Was sich seit 1947 bewährt hat, führen wir fort und steuern
            auch neue Ufer an.<br />
            Unser Verein bringt sich aktiv in Eutingen und der Region ein. Durch
            unser Sport-, Kultur- und Veranstaltungsangebot schaffen wir
            Heimat.<br />
            Bei uns wird nicht nach Herkunft, Geschlecht oder Alter gefragt,
            sondern nach der gemeinsamen Motivation, etwas auf die Beine zu
            stellen.<br />
          </v-col>
          <v-col cols="12" class="title">
            Wertschätzung wird bei uns spürbar.
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <ul>
              <li>
                Für aktive Kinder, Jugendliche, Spielerinnen, Spieler, Trainer-
                und Betreuerteams, die wir am Spielfeldrand anfeuern.
              </li>
              <li>
                Für passive Mitglieder und Macher, die zentrale Ehrenämter
                ausüben, unsere Infrastruktur in Schuss halten und einen Stein
                für das große Vereinsmosaik einbringen.
              </li>
              <li>
                Für unsere Pächter, Partner und Dienstleister, mit denen wir
                Zusammenarbeit leben.
              </li>
            </ul>
          </v-col>
          <v-col cols="12" class="title">
            Teamgeist, Fairness, Leistungsbereitschaft – Grundsätze unseres
            Sportangebots.
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Unseren Mitgliedern und Kunden bieten wir aktive sportliche
            Betätigung.<br />
            Dadurch stärken sie ihre mentale und körperliche Gesundheit, erleben
            Gemeinschaftsgefühl und Erfolge in Teams sowie Wettkampf. Durch
            Niederlagen lernen wir den fairen Umgang damit.<br />
            <br />
            Unser Sportangebot ist breit. Es reicht von offenen
            Individualangeboten, über Teamsport im Hobby-, Amateur- und
            Leistungsbereich.<br />
            Fußball ist unser Schwerpunkt – für Kinder, Jugendliche, Frauen und
            Herren.<br />
            Sportliche Ziele, die wir mit gesundem und fairem Einsatz sowie
            Ehrgeiz erreichen können, wollen wir auch erreichen.<br />
            Statt phasenweiser Liga- und Tabellenplatzsituation steht für uns im
            Vordergrund, das Beste aus den Teams herauszuholen.<br />
            <br />
            Durch Teamgeist, Fairness und gesunde Leistungsbereitschaft binden
            wir Kinder, Jugendliche, Spielerinnen und Spieler nachhaltig an
            unseren Verein. Dies sichert die Zukunft.<br />
            Für unsere Sportangebote und Treffpunkte stellen wir eine sehr gute
            Infrastruktur zur Verfügung. Diese pflegen wir und gehen mit
            Ressourcen nachhaltig um.
          </v-col>
          <v-col cols="12" class="title">
            Der SV Eutingen ist ein ehrenamtlicher Verein – und
            #mehralseinverein.
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
      mdiCloudDownload,
    }
  },
  head() {
    return {
      title: 'Leitbild',
    }
  },
}
</script>

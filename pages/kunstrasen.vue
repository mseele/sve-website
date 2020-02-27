<template>
  <div>
    <section id="kunstrasen" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>VERMIETUNG KUNSTRASENPLATZ</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Mit unserem “Projekt Kunstrasen” wurde eine top moderne
            Kunstrasenanlage (Groß- und Kleinspielfeld) inklusive Flutlicht
            errichtet. Diese Anlage bietet optimale Spielbedingungen auch in
            Zeiten von Schnee, Regen oder Frost. Wir würden uns freuen, auch
            Ihrem Verein / Ihrer Mannschaft diese Möglichkeit zur Verfügung
            stellen zu können.
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="details" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>DETAILS</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <div class="font-weight-bold">
              Nutzungsgebühren / Spiel: 180 € (inkl. MwSt.)
            </div>
            <div>
              Die Platzgebühren sind unmittelbar vor Benutzung in bar zu
              errichten. Sie erhalten eine Quittung.
            </div>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <div class="font-weight-bold">
              In der Nutzungsgebühr enthalten:
            </div>
            <div>
              <ul>
                <li>
                  die Benutzung des Platzes, der Umkleiden und Sanitäranlagen
                </li>
                <li>
                  Flutlicht
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <div class="font-weight-bold">
              Zusätzliche Kosten:
            </div>
            <div>
              Zahlungen von Aufwandspauschalen und Versorgung von
              Schiedsrichtern sind vom jeweiligen mietenden Verein zu
              entrichten, ebenso ist dieser für die Spielanmeldung zuständig.
            </div>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <div class="font-weight-bold">
              Anstoßzeiten:
            </div>
            <div>
              <ul>
                <li>10:00 Uhr</li>
                <li>12:00 Uhr</li>
                <li>14:00 Uhr</li>
                <li>16:00 Uhr</li>
                <li>18:00 Uhr</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <div class="font-weight-bold">
              Hinweise:
            </div>
            <div>
              <ul>
                <li>
                  Das Aufwärmen ist jeweils eine Stunde vor Spielbeginn möglich
                  (ggf. auch auf dem Kleinspielfeld).
                </li>
                <li>
                  Der Kunstrasenplatz darf nur mit Nocken- oder
                  Kunstrasenschuhen bespielt werden (keine Stollen!).
                </li>
                <li>
                  Warmlauf- und Spielball, sowie Getränke sind selbstständig zu
                  organisieren bzw. mitzubringen.
                </li>
                <li>
                  Bitte informieren Sie den SV Eutingen so früh wie möglich,
                  wenn Sie eine Buchungszeit absagen müssen, damit der Platz
                  evtl. anderen Nutzern zur Verfügung gestellt werden kann.
                </li>
                <li>
                  Verursachte Schäden sind dem SV Eutingen unverzüglich
                  mitzuteilen und können ggf. in Rechnung gestellt werden.
                </li>
                <li>
                  Die Spiele bzw. Ergebnisse (Spielbericht online) sind in
                  Eigenregie zu melden. Ein Zugang zum PC kann nicht
                  sichergestellt werden ggf. empfiehlt sich die Nutzung per
                  Smartphone-App.
                </li>
                <li>
                  Es ist möglich, dass das Sportheim nicht zu allen
                  Nutzungszeiten geöffnet hat.
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <span class="font-weight-bold">
              ACHTUNG:
            </span>
            <span>
              Der SV Eutingen hält sich Änderungen / Ausfall von Buchungszeiten
              aufgrund von Witterungsverhältnissen vor. Bitte informieren Sie
              sich bei entsprechender Witterung im Vorfeld über die
              Verfügbarkeit des Platzes (Schiedsrichter und Mannschaften sind zu
              informieren).
            </span>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="buchung" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>BUCHUNG</h2>
          </v-col>
          <v-col cols="12">
            <v-row justify="center" no-gutters>
              <v-btn text rounded color="primary" to="/kontakt" nuxt>
                Buchen Sie ganz unkompliziert über unsere Kontaktseite
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12">
            Freie Buchungstermine für eine konkrete Anfrage entnehmen Sie dem
            Belegungskalender. Im Falle einer erfolgreichen Buchung erhalten Sie
            eine schriftliche Bestätigung inkl. der zu beachtenden Platzordnung.
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="belegung" class="section_alt">
      <v-container ref="resizeContainer">
        <v-row>
          <v-col cols="12">
            <h2>BELEGUNG</h2>
          </v-col>
          <v-col v-resize="onResize" cols="12">
            <iframe
              src="https://calendar.google.com/calendar/embed?title=Kunstrasenplatz%20SV%20Eutingen%20-%20Belegung%20&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23d8d8d8&amp;src=fvrnk6edkmbinqefobuoallft0%40group.calendar.google.com&amp;color=%23711616&amp;ctz=Europe%2FBerlin"
              style="border-width:0"
              :width="gcalWidth"
              height="600"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gcalWidth: 800
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    onResize() {
      this.gcalWidth = this.$refs.resizeContainer.offsetWidth
      // window.innerWidth
    }
  },
  head() {
    return {
      title: 'Kunstrasen'
    }
  }
}
</script>

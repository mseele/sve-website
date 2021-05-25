<template>
  <Layout>
    <page-section title="Der SVE - #mehralseinverein">
      <ul class="pl-6 list-disc">
        <li>SV Eutingen 1947 e.V.</li>
        <li>unterstützt durch Förderverein des SV Eutingen 1947 e.V.</li>
        <li>
          460 Mitglieder, davon 160 Kinder und Jugendliche unter 18 Jahren.
        </li>
        <li>
          Abteilungen: Frauenfußball, Herrenfußball, Kinder- und Jugendfußball,
          Gymnastik, Volleyball, Fitness, Ernährung, Events
        </li>
        <li>
          Vorstandschaft:
          <ul class="pl-6 list-disc">
            <li>
              Sebastian Lazar (<a
                class="default-link on-focus-dark"
                href="mailto:vorstand@sv-eutingen.de"
                >vorstand@sv-eutingen.de</a
              >
              /
              <a class="default-link on-focus-dark" href="tel:+4917630774678"
                >0176-30774678</a
              >) / Dominik Rakoczy / Dietmar Kurbjun
            </li>
            <li>
              Kassier Wolfgang Nesch (<a
                class="default-link on-focus-dark"
                href="mailto:vorstand@sv-eutingen.de"
                >vorstand@sv-eutingen.de</a
              >
              /
              <a class="default-link on-focus-dark" href="tel:+491625323142"
                >0162-5323142</a
              >)
            </li>
          </ul>
        </li>
        <li>
          Adresse: SV Eutingen 1947 e.V. / Marktstr. 84 / 72184 Eutingen im Gäu
        </li>
        <li>
          Kontoverbindung: Sportverein Eutingen / Volksbank Horb-Freudenstadt eG
          / IBAN: DE28 642 910 10 00 344 69 001
        </li>
        <li>
          Homepage:
          <a
            class="default-link on-focus-dark"
            href="https://www.sv-eutingen.de"
            >www.sv-eutingen.de</a
          >
        </li>
        <li>
          Mail:
          <a
            class="default-link on-focus-dark"
            href="mailto:info@sv-eutingen.de"
            >info@sv-eutingen.de</a
          >
        </li>
        <li>
          Informationen zur Aufsichtspflicht:
          <a
            class="default-link on-focus-dark"
            href="/downloads/2020/Aufsichtspflicht-SVE.pdf"
            target="_blank"
          >
            PDF
          </a>
        </li>
        <li>
          Anerkannte Einsatzstelle für das
          <a
            class="default-link on-focus-dark"
            href="https://www.lsvbw.de/sportwelten/sportjugend/fsj-sport-und-schule/"
            target="_blank"
            >FSJ Sport und Schule</a
          >
        </li>
      </ul>
      <div
        class="flex flex-col pt-6 space-y-4 md:flex-row md:justify-center md:space-y-0 md:space-x-4"
      >
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Vereinssatzung-SVE.pdf"
          first-row="DOWNLOAD"
          second-row="Vereinssatzung"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
              clip-rule="evenodd"
            />
          </svg>
        </btn>
      </div>
    </page-section>
    <page-section title="Unser Leitbild" dark>
      <div class="pb-4 text-xl font-medium">
        SV Eutingen – #mehralseinverein.
      </div>
      <div class="pb-4 text-xl font-medium">
        Wir stiften gesellschaftliche Teilhabe durch Sport und Begegnung.
      </div>
      <div class="pb-4 leading-relaxed">
        Unser sportliches und kulturelles Angebot ermöglicht gesellschaftliche
        Teilhabe. Bei uns begegnen sich Menschen, schließen Freundschaften,
        erfahren Teilhabe und erleben eine schöne Zeit.<br />
        Wir lieben die Freudenschreie ausgelassener Kinder, den Torjubel für
        unsere Teams, den Treffpunkt durch unsere Gaststätte Auszeit, die
        Abendsonne am Lagerfeuer.<br />
        <br />
        Wir entfalten die Talente unserer Mitglieder, packen an und trauen
        einander etwas zu. Durch Reflexion, ehrliches Feedback, Aus- und
        Weiterbildung werden wir besser. Unser Verein entwickelt sich gesund.
        Was sich seit 1947 bewährt hat, führen wir fort und steuern auch neue
        Ufer an.<br />
        Unser Verein bringt sich aktiv in Eutingen und der Region ein. Durch
        unser Sport-, Kultur- und Veranstaltungsangebot schaffen wir Heimat.<br />
        Bei uns wird nicht nach Herkunft, Geschlecht oder Alter gefragt, sondern
        nach der gemeinsamen Motivation, etwas auf die Beine zu stellen.<br />
      </div>
      <div class="pb-4 text-xl font-medium">
        Wertschätzung wird bei uns spürbar.
      </div>
      <div class="pb-4 leading-relaxed">
        <ul class="pl-6 space-y-2 list-disc">
          <li>
            Für aktive Kinder, Jugendliche, Spielerinnen, Spieler, Trainer- und
            Betreuerteams, die wir am Spielfeldrand anfeuern, mit denen wir
            Siege feiern und Niederlagen verdauen.
          </li>
          <li>
            Für passive Mitglieder und Macher, die Ehrenämter ausüben, unsere
            Infrastruktur in Schuss halten und mit persönlichem Einsatz unser
            Anliegen wahr werden lassen.
          </li>
          <li>
            Für unsere Pächter, Partner und Dienstleister, mit denen wir
            Zusammenarbeit leben.
          </li>
        </ul>
      </div>
      <div class="pb-4 text-xl font-medium">
        Teamgeist, Fairness, Leistungsbereitschaft und Gesundheitsförderung -
        Grundsätze unseres Sportangebots.
      </div>
      <div class="pb-4 leading-relaxed">
        Unseren Mitgliedern und Kunden bieten wir aktive sportliche
        Betätigung.<br />
        Dadurch stärken sie ihre mentale und körperliche Gesundheit, erleben
        Gemeinschaftsgefühl und Erfolge in Teams sowie Wettkampf. Durch
        Niederlagen lernen wir den fairen Umgang damit.<br />
        <br />
        Unser Sportangebot richtet sich an alle. Die Formate reichen von offenen
        Individualangeboten bis zu Teamsport im Hobby-, Amateur- und
        Leistungsbereich.<br />
        Fußball ist unser Schwerpunkt – für Kinder, Jugendliche, Frauen und
        Männer.<br />
        Sportliche Ziele, die wir mit fairem Einsatz und Ehrgeiz erreichen
        können, wollen wir auch erreichen.<br />
        Statt kurzfristiger Liga- und Tabellenplatzsituationen steht für uns im
        Vordergrund, das Beste aus den Teams herauszuholen und kontinuierlich
        besser zu werden.<br />
        <br />
        Durch Teamgeist, Fairness und gesunde Leistungsbereitschaft binden wir
        Kinder, Jugendliche, Spielerinnen und Spieler nachhaltig an den Verein.
        Dies sichert die Zukunft.<br />
        Für unsere Angebote stellen wir eine sehr gute Infrastruktur zur
        Verfügung. Diese pflegen wir und gehen mit Ressourcen schonend um.
      </div>
      <div class="text-xl font-medium">#mehralseinverein</div>
    </page-section>
    <page-section id="heimspiel" title="Heimspiel">
      Wie wichtig sind kleine Vereine gegenüber großen? Warum sollte man gerade
      auch kleine Vereinsstrukturen erhalten und fördern?<br />
      Die an.kox GmbH hat gemeinsam mit unseren SVE-Frauen auf wichtige
      Zukunftsthemen aufmerksam gemacht und diese in einem Film aufgegriffen.
      Diese neun Minuten zeigen sehr schön, was unser Anliegen ist: Teilhabe
      durch Sport und Begegnung.<br />
      Ein großer Dank geht an unsere Partner der an.kox GmbH und Oliver Lozano
      von den el Pistolero Studios, die den Film produziert haben.<br />
      Viel Freude beim Anschauen!
      <div class="flex flex-col pt-6 sm:flex-row sm:justify-center">
        <btn
          v-slot="{ imageClass }"
          href="https://vimeo.com/359776983"
          first-row="LINK ZUM"
          second-row="Video"
          class="w-full sm:w-2/5 md:w-1/3 xl:w-1/4 2xl:w-1/5"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
            />
          </svg>
        </btn>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/pageSection'
import btn from '@/components/controls/downloadButton'

export default {
  metaInfo: {
    title: 'Leitbild',
  },
  components: { pageSection, btn },
}
</script>

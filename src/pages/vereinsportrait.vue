<page>
title: Vereinsportrait
</page>

<template>
  <Layout>
    <PageSection title="Der SVE - #mehralseinverein">
      <ul class="list-disc pl-6">
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
          <ul class="list-disc pl-6">
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
          Kontoverbindung: Sportverein Eutingen / Volksbank eG im Kreis Freudenstadt
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
        class="flex flex-col space-y-4 pt-6 md:flex-row md:justify-center md:space-y-0 md:space-x-4"
      >
        <DownloadButton
          v-slot="{ imageClass }"
          href="/downloads/2021/Vereinssatzung-SVE.pdf"
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
        </DownloadButton>
      </div>
    </PageSection>
    <PageSection title="Unser Leitbild" dark>
      <div class="pb-4 text-xl font-medium">
        SV Eutingen – #mehralseinverein.
      </div>
      <div class="pb-4 text-xl font-medium">
        1. Wir ermöglichen Teilhabe durch Sport und Begegnung
      </div>
      <div class="pb-4 leading-relaxed">
        Unser sportliches und kulturelles Angebot ermöglicht gesellschaftliche
        Teilhabe. Bei uns begegnen sich Menschen, sie schließen Freundschaften
        und sie können was bewegen – kurzum: Sie erleben eine schöne und
        wertvolle Zeit.
      </div>
      <div class="pb-4 text-xl font-medium">
        2. Wir lieben Emotionen und Gemeinschaft
      </div>
      <div class="pb-4 leading-relaxed">
        Wir lieben die Freudenschreie ausgelassener Kinder, den Torjubel unserer
        Teams und auch die Abendsonne am Lagerfeuer. Besonders stolz sind wir
        auf unser Sportgelände und die Gaststätte „Auszeit“. Dort leben wir
        Gemeinschaft und festigen unseren Zusammenhalt. Dort schlägt unser
        SVE-Herz.
      </div>
      <div class="pb-4 text-xl font-medium">3. Wir entfalten Talente</div>
      <div class="pb-4 leading-relaxed">
        Wir möchten die Fähigkeiten unserer Mitglieder zur Geltung bringen und
        Talente entfalten. Wir trauen einander etwas zu! Durch ehrliches
        Feedback und Aus- und Weiterbildung werden wir besser.
      </div>
      <div class="pb-4 text-xl font-medium">4. Wir sind Teil von Eutingen</div>
      <div class="pb-4 leading-relaxed">
        Wir bringen uns aktiv in unserer Heimatgemeinde und in der Region ein.
        Durch unser Sport-, Kultur- und Veranstaltungsangebot schaffen wir
        Heimat. Wir machen Eutingen liebens- und lebenswert.
      </div>

      <div class="pb-4 text-xl font-medium">
        5. Bei uns wird Wertschätzung spürbar
      </div>
      <div class="pb-4 leading-relaxed">
        Wertschätzung ist für uns nicht nur ein Schlagwort, Wertschätzung
        erfahren …

        <ul class="list-disc space-y-2 pl-6">
          <li>
            aktive Kinder, Jugendliche, Spielerinnen und Spieler, Trainer- und
            Betreuerteams, die wir am Spielfeldrand anfeuern, mit denen wir
            Siege feiern und Niederlagen verarbeiten,
          </li>
          <li>
            Mitglieder und Macher, die Ehrenämter ausüben, unsere Infrastruktur
            in Schuss halten und mit persönlichem Einsatz unser Anliegen wahr
            werden lassen,
          </li>
          <li>
            unsere Pächter, Partner und Dienstleister, mit denen wir im besten
            Sinne zusammenarbeiten.
          </li>
        </ul>
      </div>
      <div class="pb-4 text-xl font-medium">
        6. Unser Sportangebot fördert Gesundheit und Teamgeist
      </div>
      <div class="pb-4 leading-relaxed">
        Unseren Mitgliedern bieten wir aktive sportliche Betätigung. Dadurch
        stärken sie ihre mentale und körperliche Gesundheit, sie erleben
        Gemeinschaft, Teamgeist und ein Wir-Gefühl. Wer an Wettkämpfen
        teilnimmt, lernt den Umgang mit Erfolgen und Rückschlägen.
      </div>

      <div class="pb-4 text-xl font-medium">
        7. Unser Sportangebot richtet sich an alle
      </div>
      <div class="pb-4 leading-relaxed">
        Bei uns wird nicht nach Herkunft, Geschlecht oder Alter gefragt, sondern
        nach der gemeinsamen Motivation, etwas auf die Beine zu stellen. Alle
        packen mit an! Von offenen Individualangeboten bis zu Teamsport im
        Hobby-, Amateur-, und Leistungsbereich – wir bieten Sport für viele
        Geschmäcker. Ganz klar: Fußball ist unser Schwerpunkt – für Kinder,
        Jugendliche, Frauen und Männer.
      </div>
      <div class="pb-4 text-xl font-medium">
        8. Wir fördern Leistungsbereitschaft und langfristige Entwicklung
      </div>
      <div class="pb-4 leading-relaxed">
        Sportliche Ziele, die wir fair und mit gesundem Ehrgeiz erreichen
        können, wollen wir auch erreichen. Statt kurzfristiger Liga- und
        Tabellenplatzsituation steht bei uns die kontinuierliche Entwicklung im
        Vordergrund, um das Beste aus unseren Teams herauszuholen. Durch
        Teamgeist, Fairness und gesunde Leistungsbereitschaft binden wir Kinder,
        Jugendliche, Spielerinnen und Spieler nachhaltig an den Verein.
      </div>
      <div class="pb-4 text-xl font-medium">
        9. Wir haben die Zukunft fest im Blick
      </div>
      <div class="pb-4 leading-relaxed">
        Für unsere Angebote stellen wir eine sehr gute Infrastruktur zur
        Verfügung. Diese pflegen wir und gehen mit Ressourcen schonend um. Was
        sich seit 1947 bewährt hat, führen wir fort. Wir brechen aber auch zu
        neuen Ufern auf. Dadurch sichern wir die Zukunft unseres SVE. Unser
        oberstes Ziel: Eine gesunde Vereinsentwicklung.
      </div>
    </PageSection>
    <PageSection id="heimspiel" title="Heimspiel">
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
        <DownloadButton
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
        </DownloadButton>
      </div>
    </PageSection>
  </Layout>
</template>

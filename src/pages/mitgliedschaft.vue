<template>
  <Layout>
    <page-section title="Mitglied werden">
      <div>
        Über 5,3 Millionen Menschen in Baden-Württemberg engagieren sich
        ehrenamtlich. Dafür bieten wir auch beim SVE viele Möglichkeiten. Ob
        Vereinsamt oder reine Mitgliedschaft - mit Deinem Einsatz unterstützt Du
        unsere Arbeit und stiftest gesellschaftlichen Nutzen.<br />
        Dein Engagement kann von einer tatkräftigen Unterstützung als Helfer,
        Trainer, Betreuer oder Macher für eine gute Infrastruktur über
        finanzielle Hilfen bis hin zu einer einfachen Mitgliedschaft sein.<br />
        Jede Form der Hilfe ist ein Baustein für das große Ganze und ermöglicht
        uns als Verein, dieses wichtige gesellschaftliche Angebot
        aufrechtzuerhalten und Stück für Stück besser zu werden.
      </div>
      <div class="tw-flex tw-flex-wrap tw-pt-6">
        <div class="tw-w-full md:tw-w-1/2 md:tw-pr-2">
          <header-title dark class="tw-text-xl tw-font-medium">
            Mitgliedschaft
          </header-title>
          <div class="tw-pt-4">
            Du möchtest Mitglied werden?
            <a
              class="tw-font-medium tw-default-link tw-on-focus-dark"
              href="/downloads/2020/Mitgliedsantrag-SVE.pdf"
              target="_blank"
              >Download Mitgliedsantrag</a
            >, fülle ihn aus und sende ihn postialisch an die folgende Adresse.
          </div>
          <div
            class="tw-pt-4 tw-text-sm tw-font-bold tw-tracking-wider tw-uppercase"
          >
            Adresse
          </div>
          <div class="tw-pt-2">
            <div>
              SV Eutingen 1947 e.V.<br />
              Marktstr. 84<br />
              72184 Eutingen im Gäu
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-pt-6 md:tw-w-1/2 md:tw-pl-2 md:tw-pt-0">
          <header-title dark class="tw-text-xl tw-font-medium">
            Spenden
          </header-title>
          <div class="tw-pt-4">
            Mit Deiner Spende kannst Du direkt Gutes tun und förderst damit
            unser sportliches und kulturelles Angebot. Dabei hilft uns jeder
            Betrag!
          </div>
          <div
            class="tw-pt-4 tw-text-sm tw-font-bold tw-tracking-wider tw-uppercase"
          >
            Kontoverbindung
          </div>
          <div class="tw-pt-2">
            Sportverein Eutingen<br />
            Volksbank Horb-Freudenstadt eG<br />
            IBAN: DE28 642 910 10 00 344 69 001<br />
          </div>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import headerTitle from '@/components/controls/HeaderTitle'

export default {
  metaInfo: {
    title: 'Mitglied werden',
  },
  components: {
    pageSection,
    headerTitle,
  },
}
</script>

<template>
  <Layout>
    <page-section class="break-words" title="Impressum">
      <div class="pb-4 text-2xl font-medium">Diensteanbieter</div>
      <div class="pb-8 space-y-2">
        <div>SV Eutingen 1947 e.V.</div>
        <div>Marktstraße 84</div>
        <div>72184 Eutingen im Gäu</div>
      </div>
      <div class="pb-4 text-2xl font-medium">Kontaktmöglichkeiten</div>
      <div class="pb-8 space-y-2">
        <div><strong>E-Mail-Adresse</strong>: info@sv-eutingen.de</div>
        <div><strong>Telefon</strong>: +49 (0)7459 12 04</div>
        <div><strong>Fax</strong>: -</div>
      </div>
      <div class="pb-4 text-2xl font-medium">Vertretungsberechtigte</div>
      <div class="pb-8">
        <strong>Vertretungsberechtigt</strong>: Sebastian Lazar (1. Vorstand)
      </div>
      <div class="pb-4 text-2xl font-medium">Register und Registernummer</div>
      <div class="pb-8 space-y-2">
        <div>Vereinsregister</div>
        <div><strong>Geführt bei</strong>: Vereinsregister Stuttgart</div>
        <div><strong>Nummer</strong>: VR 440031</div>
      </div>
      <div class="pb-4 text-2xl font-medium">
        Social Media und andere Onlinepräsenzen
      </div>
      <div class="pb-8 space-y-2">
        <div>
          <strong
            >Dieses Impressum gilt auch für die folgenden Social-Media-Präsenzen
            und Onlineprofile</strong
          >:
        </div>
        <div>
          <a
            class="default-link on-focus focus-visible:ring-offset-2"
            href="https://facebook.com/sveutingen"
            target="_blank"
            rel="noreferrer"
            >https://facebook.com/sveutingen</a
          >
        </div>
        <div>
          <a
            class="default-link on-focus focus-visible:ring-offset-2"
            href="https://www.youtube.com/channel/UC6QXvcCp9CpHl4az3idhkYQ"
            target="_blank"
            rel="noreferrer"
          >
            https://www.youtube.com/channel/UC6QXvcCp9CpHl4az3idhkYQ
          </a>
        </div>
      </div>
      <div class="pb-4 text-2xl font-medium">
        Haftungs- und Urheberrechtshinweise
      </div>
      <div class="pb-8">
        <strong>Links auf fremde Webseiten</strong>: Inhalte fremder Webseiten,
        auf die wir direkt oder indirekt verweisen, liegen außerhalb unseres
        Verantwortungsbereiches und machen wir uns nicht zu Eigen. Für alle
        Inhalte und insbesondere für Schäden, die aus der Nutzung der in den
        verlinkten Webseiten aufrufbaren Informationen entstehen, haftet allein
        der Anbieter der verlinkten Webseiten.
      </div>
      <a
        class="text-gray-600 underline on-focus focus-visible:ring-offset-2"
        href="https://datenschutz-generator.de/?l=de"
        title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
        target="_blank"
        rel="noreferrer"
      >
        Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas
        Schwenke
      </a>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'

export default {
  metaInfo: {
    title: 'Impressum',
  },
  components: {
    pageSection,
  },
}
</script>

<template>
  <Layout :transparent="true">
    <hero-section
      v-slot="{ imageClass }"
      dark
      title="Auszeit"
      subtitle="UNSERE VEREINSGASTSTÄTTE"
      :primary-button="{ text: 'Infos', to: '#infos' }"
      :secondary-button="{ text: 'Öffnungszeiten', to: '#oeffnungszeiten' }"
    >
      <g-image src="@/assets/gaststaette/main.jpg" :class="imageClass" />
    </hero-section>
    <page-section id="infos" title="Infos">
      <div class="pb-2 font-medium">
        In unserer Vereinsgaststätte Auszeit Eutingen findest Du die perfekte
        Einkehrmöglichkeit.
      </div>
      <div class="pb-2">
        Ob Samstags zur Bundesliga, unter der Woche mit Freunden, auf ein Eis an
        heißen Sommertagen auf der Terrasse oder für ein deftiges Essen:<br />
        Schau' bei unseren bewährten Pächtern Andrea und Micha vorbei und erlebe
        gesellige Stunden.
      </div>
      <div class="pb-2">
        Auch für eine Firmenfeier, Geburtstage und sonstige Anlässe bietet die
        Gaststätte Platz für bis zu 150 Personen.
      </div>
      <div class="pb-2">
        Weitere Informationen findest Du auf der
        <a
          class="rounded on-focus-dark"
          href="https://fb.com/Auszeit-Eutingen-981850018516219"
          target="_blank"
          rel="noreferrer"
          >Facebook-Seite</a
        >
        der Auszeit Eutingen.
      </div>
      <div class="flex flex-col pt-6 sm:flex-row sm:justify-center">
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Speisekarte-Auszeit.pdf"
          first-row="UNSERE"
          second-row="Speisekarte"
          class="w-full sm:w-1/3 xl:w-1/4 2xl:w-1/5"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 416 512"
            fill="currentColor"
          >
            <path
              d="M208 15c1 5 16 95 16 129 0 52-28 90-69 105l13 238c1 13-10 25-24 25H80c-14 0-25-11-24-25l13-238C28 234 0 196 0 144 0 110 15 20 16 15c3-20 45-20 48 1v142c1 3 15 3 16 0l8-142c3-21 45-21 48 0l8 142c1 3 15 3 16 0V16c3-21 45-21 48-1zm119 286l-15 185c-1 14 10 26 24 26h56c13 0 24-11 24-24V24c0-13-11-24-24-24-82 0-221 179-65 301z"
            />
          </svg>
        </btn>
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Eiskarte-Auszeit.pdf"
          first-row="UNSERE"
          second-row="Eiskarte"
          class="w-full mt-4 sm:w-1/3 xl:w-1/4 2xl:w-1/5 sm:ml-4 sm:mt-0 lg:ml-8 2xl:ml-20"
        >
          <svg
            :class="imageClass"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path
              d="M368 160h-1a144 144 0 10-286 0h-1a48 48 0 000 96h288a48 48 0 000-96zM195 494a32 32 0 0058 0l99-206H96z"
            />
          </svg>
        </btn>
      </div>
    </page-section>
    <page-section title="Bilder" dark>
      <div class="flex flex-col lg:flex-row">
        <image-viewer
          class="w-full lg:mr-3 lg:w-2/3"
          height="480"
          :images="$page.gaststaette.images"
        />
        <div class="flex flex-col w-full mt-6 lg:ml-3 lg:-mt-15 lg:w-1/3">
          <div id="oeffnungszeiten" class="pb-6">
            <header-title dark class="pb-6 text-3xl font-semibold uppercase">
              Öffnungszeiten
            </header-title>
            <div
              class="flex flex-col p-4 bg-white border-2 border-gray-300 rounded"
            >
              <div
                class="text-xs font-medium tracking-wide text-gray-500 uppercase"
              >
                Dienstag bis Freitag
              </div>
              <div class="font-medium">16 - 1 Uhr</div>
              <div
                class="pt-4 text-xs font-medium tracking-wide text-gray-500 uppercase"
              >
                Samstag
              </div>
              <div class="font-medium">14 - 1 Uhr</div>
              <div
                class="pt-4 text-xs font-medium tracking-wide text-gray-500 uppercase"
              >
                Sonntag
              </div>
              <div class="font-medium">14 - 22 Uhr</div>
            </div>
          </div>
          <div>
            <header-title dark class="pb-6 text-3xl font-semibold uppercase">
              Kontakt
            </header-title>
            <div
              class="flex flex-col p-4 bg-white border-2 border-gray-300 rounded"
            >
              <div
                class="text-lg font-medium tracking-wide text-gray-500 uppercase"
              >
                Auszeit Eutingen
              </div>
              <div class="pt-4 font-medium">Micha Gruidl</div>
              <div class="pt-2 font-medium">
                Marktstr. 84<br />
                72184 Eutingen im Gäu
              </div>
              <div class="pt-4 text-center">
                <g-link
                  :to="{
                    path: '/kontakt/',
                    query: { auswahl: 'restaurant' },
                  }"
                  class="inline-flex items-center justify-center col-start-1 col-end-2 px-3 py-1 font-medium text-red-800 rounded-full hover:bg-red-100 hover:bg-opacity-50 active:text-red-900 md:mb-2 lg:mb-0 on-focus"
                >
                  Kontakt
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </g-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import heroSection from '@/components/common/heroSection'
import pageSection from '@/components/common/pageSection'
import headerTitle from '@/components/controls/headerTitle'
import btn from '@/components/controls/downloadButton'
import imageViewer from '@/components/common/imageViewer'

export default {
  metaInfo: {
    title: 'Gaststätte',
  },
  components: { heroSection, pageSection, headerTitle, btn, imageViewer },
  layout: 'transparent',
}
</script>

<page-query>
query {
  gaststaette(id: "0") {
    images
  }
}
</page-query>

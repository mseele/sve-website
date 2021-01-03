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
      <div class="tw-pb-2 tw-font-medium">
        In unserer Vereinsgaststätte Auszeit Eutingen findest Du die perfekte
        Einkehrmöglichkeit.
      </div>
      <div class="tw-pb-2">
        Ob Samstags zur Bundesliga, unter der Woche mit Freunden, auf ein Eis an
        heißen Sommertagen auf der Terrasse oder für ein deftiges Essen:<br />
        Schau' bei unseren bewährten Pächtern Andrea und Micha vorbei und erlebe
        gesellige Stunden.
      </div>
      <div class="tw-pb-2">
        Auch für eine Firmenfeier, Geburtstage und sonstige Anlässe bietet die
        Gaststätte Platz für bis zu 150 Personen.
      </div>
      <div class="tw-pb-2">
        Weitere Informationen findest Du auf der
        <a
          class="tw-rounded tw-on-focus-dark"
          href="https://fb.com/Auszeit-Eutingen-981850018516219"
          target="_blank"
          rel="noreferrer"
          >Facebook-Seite</a
        >
        der Auszeit Eutingen.
      </div>
      <div
        class="tw-flex tw-flex-col tw-pt-6 sm:tw-flex-row sm:tw-justify-center"
      >
        <btn
          v-slot="{ imageClass }"
          href="/downloads/2020/Speisekarte-Auszeit.pdf"
          first-row="UNSERE"
          second-row="Speisekarte"
          class="tw-w-full sm:tw-w-1/3 xl:tw-w-1/4 2xl:tw-w-1/5"
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
          class="tw-w-full tw-mt-4 sm:tw-w-1/3 xl:tw-w-1/4 2xl:tw-w-1/5 sm:tw-ml-4 sm:tw-mt-0 lg:tw-ml-8 2xl:tw-ml-20"
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
      <div class="tw-flex tw-flex-col lg:tw-flex-row">
        <image-viewer
          class="tw-w-full lg:tw-mr-3 lg:tw-w-2/3"
          height="480"
          :images="images"
        />
        <div
          class="tw-flex tw-flex-col tw-w-full tw-mt-6 lg:tw-ml-3 lg:tw--mt-15 lg:tw-w-1/3"
        >
          <div id="oeffnungszeiten" class="tw-pb-6">
            <header-title
              dark
              class="tw-pb-6 tw-text-3xl tw-font-semibold tw-uppercase"
            >
              Öffnungszeiten
            </header-title>
            <div
              class="tw-flex tw-flex-col tw-p-4 tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
            >
              <div
                class="tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
              >
                Dienstag bis Freitag
              </div>
              <div class="tw-font-medium">16 - 1 Uhr</div>
              <div
                class="tw-pt-4 tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
              >
                Samstag
              </div>
              <div class="tw-font-medium">14 - 1 Uhr</div>
              <div
                class="tw-pt-4 tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
              >
                Sonntag
              </div>
              <div class="tw-font-medium">14 - 22 Uhr</div>
            </div>
          </div>
          <div>
            <header-title
              dark
              class="tw-pb-6 tw-text-3xl tw-font-semibold tw-uppercase"
            >
              Kontakt
            </header-title>
            <div
              class="tw-flex tw-flex-col tw-p-4 tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
            >
              <div
                class="tw-text-lg tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
              >
                Auszeit Eutingen
              </div>
              <div class="tw-pt-4 tw-font-medium">Micha Gruidl</div>
              <div class="tw-pt-2 tw-font-medium">
                Marktstr. 84<br />
                72184 Eutingen im Gäu
              </div>
              <div class="tw-pt-4 tw-text-center">
                <g-link
                  :to="{
                    path: '/kontakt/',
                    query: { auswahl: 'restaurant' },
                  }"
                  class="tw-inline-flex tw-items-center tw-justify-center tw-col-start-1 tw-col-end-2 tw-px-3 tw-py-1 tw-font-medium tw-text-red-800 tw-no-underline tw-rounded-full hover:tw-bg-red-100 hover:tw-bg-opacity-50 active:tw-text-red-900 md:tw-mb-2 lg:tw-mb-0 tw-on-focus"
                >
                  Kontakt
                  <svg
                    class="tw-w-4 tw-h-4 tw-ml-2"
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
import heroSection from '@/components/common/HeroSection'
import pageSection from '@/components/common/PageSection'
import headerTitle from '@/components/controls/HeaderTitle'
import btn from '@/components/controls/DownloadButton'
import imageViewer from '@/components/common/ImageViewer'

export default {
  metaInfo: {
    title: 'Gaststätte',
  },
  components: { heroSection, pageSection, headerTitle, btn, imageViewer },
  layout: 'transparent',
  data() {
    return {
      images: [
        {
          src: 'gaststaette/1.jpg',
          lazy: 'gaststaette/1-min.jpg',
        },
        {
          src: 'gaststaette/2.jpg',
          lazy: 'gaststaette/2-min.jpg',
        },
        {
          src: 'gaststaette/3.jpg',
          lazy: 'gaststaette/3-min.jpg',
        },
      ],
    }
  },
}
</script>

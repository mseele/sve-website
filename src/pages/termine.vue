<template>
  <Layout>
    <page-section title="Termine">
      <div class="pb-6">
        Hier findest Du unsere wichtigsten Vereinstermine mit unterschiedlichen
        Veranstaltungen und Events. Details erfährst Du durch einen Klick auf
        den Termin.<br />
        Den digitalen Kalender kannst Du auch als Google-Kalender in Deinen
        persönlichen Kalender integrieren, dann entgeht Dir sicher kein Termin
        mehr.
      </div>
      <div
        v-if="$page.appointments.edges.length > 0"
        class="w-full h-full mx-auto"
      >
        <div class="relative h-full overflow-hidden wrap">
          <div
            class="absolute h-full border border-gray-700 border-opacity-25 left-1/2"
          />
          <div
            v-for="(edge, index) in $page.appointments.edges"
            :key="index"
            class="flex justify-between w-full"
            :class="{ 'mt-8': index > 0 }"
          >
            <div class="order-1 w-5/12">
              <div
                class="pb-1 font-medium text-right text-gray-900 md:text-lg lg:text-xl 2xl:text-2xl"
              >
                {{ edge.node.date }}
              </div>
              <div
                class="text-sm font-medium text-right text-gray-500 lg:text-base 2xl:text-lg"
              >
                {{ edge.node.time }}
              </div>
            </div>
            <div
              class="z-10 flex items-center self-center flex-none order-1 w-6 h-6 bg-red-800 border-white rounded-full shadow border-3"
            >
              <div class="mx-auto text-lg font-semibold text-white"></div>
            </div>
            <div class="order-1 w-5/12">
              <component
                :is="edge.node.link ? 'a' : 'div'"
                :href="edge.node.link"
                target="_blank"
                rel="noreferrer"
              >
                <div
                  class="pb-1 font-medium text-gray-900 md:text-lg lg:text-xl 2xl:text-2xl"
                >
                  {{ edge.node.title }}
                </div>
                <div
                  v-if="edge.node.description"
                  class="text-sm text-gray-700 md:text-base lg:text-lg 2xl:text-xl"
                >
                  {{ edge.node.description }}
                </div>
              </component>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center">
        <svg
          class="w-36 h-36 2xl:w-48 2xl:h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 864 716.5"
        >
          <path
            fill="#991b1b"
            d="M807 396c-33 54-27 127-12 184 4 20 10 40 6 62-5 26-24 47-43 59-34 21-73 21-102-2-24-19-40-53-66-72-42-31-99-12-150 17-35 20-74 46-107 32-23-11-37-40-44-72-3-15-5-32-13-43-4-7-10-12-16-16-58-34-136-5-191-45-38-26-59-81-66-139-7-59-1-121 6-183 5-44 12-91 35-127 25-37 63-54 96-51 34 4 63 25 88 51 31 32 59 74 99 84 28 7 58-1 87-6 49-8 97-5 145-2 46 2 92 6 134 22 31 11 54 35 82 51 18 10 39 11 56 24 21 17 39 47 31 86-8 37-37 57-55 86z"
            opacity=".1"
          />
          <rect
            width="671"
            height="495.1"
            x="79.5"
            y="99.2"
            fill="#fff"
            stroke="#fff"
            rx="30.6"
            ry="31.2"
          />
          <path
            fill="#991b1b"
            d="M751 130v76h-2v-1H80v1h-2v-76a33 33 0 0133-33h607a33 33 0 0133 33z"
          />
          <path
            fill="#3f3d56"
            d="M718 97H111a33 33 0 00-33 33v434a33 33 0 0033 33h607a33 33 0 0033-33V130a33 33 0 00-33-33zm31 467a31 31 0 01-31 31H111a31 31 0 01-31-31V130a31 31 0 0131-31h607a31 31 0 0131 31z"
          />
          <circle cx="214.3" cy="151.4" r="20" fill="#fff" />
          <circle cx="615.3" cy="151.4" r="20" fill="#fff" />
          <path
            fill="#991b1b"
            d="M272 374H153a19 19 0 01-19-19v-56a19 19 0 0119-19h119a19 19 0 0119 19v56a19 19 0 01-19 19z"
          />
          <g fill="#f2f2f2">
            <path
              d="M474 375H355a20 20 0 01-19-20v-56a20 20 0 0119-19h119a20 20 0 0120 19v56a20 20 0 01-20 20zM272 520H153a20 20 0 01-20-20v-56a20 20 0 0120-20h119a20 20 0 0119 20v56a20 20 0 01-19 20zM677 520H558a20 20 0 01-20-20v-56a20 20 0 0120-20h119a20 20 0 0119 20v56a20 20 0 01-19 20zM677 375H558a20 20 0 01-20-20v-56a20 20 0 0120-20h119a20 20 0 0119 20v56a20 20 0 01-19 20z"
            />
          </g>
          <circle cx="212.6" cy="327.3" r="32.3" fill="#fff" />
          <path
            fill="#991b1b"
            d="M209 340a3 3 0 01-2-1l-7-6a3 3 0 114-5l5 4 11-16a3 3 0 015 0 3 3 0 011 4l-14 18a3 3 0 01-3 2z"
          />
          <g transform="translate(78 242)">
            <path
              fill="#991b1b"
              d="M396 278H277a19 19 0 01-19-20v-56a19 19 0 0119-19h119a19 19 0 0119 19v56a19 19 0 01-19 19z"
            />
            <circle cx="337.3" cy="229.9" r="32.3" fill="#fff" />
            <path
              fill="#991b1b"
              d="M334 242a3 3 0 01-2 0l-8-6a3 3 0 115-6l4 4 12-15a3 3 0 015-1 3 3 0 010 5l-13 18a3 3 0 01-3 1z"
            />
          </g>
        </svg>
        <div class="text-xl text-center text-gray-500 text-medium">
          In der nächsten Zeit steht kein größerer Termin an.
        </div>
      </div>
    </page-section>
    <page-section title="Tipps & Tricks" dark>
      <div>
        Über
        <a
          class="default-link on-focus-dark"
          href="https://calendar.google.com/calendar/embed?src=info%40sv-eutingen.de&ctz=Europe%2FBerlin"
          target="_blank"
          rel="noreferrer"
          >diesen Link</a
        >
        können die Termine als Google Kalender geöffnet und auch in deinen
        persönlichen Kalender integriert werden.
      </div>
      <div class="pt-2 text-sm font-medium">
        Hier findest du den passenden
        <a
          class="default-link on-focus-dark"
          href="https://support.google.com/calendar/answer/37100"
          target="_blank"
          rel="noreferrer"
          >Hilfeartikel</a
        >
        für mehr Informationen.
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'

export default {
  metaInfo: {
    title: 'Termine',
  },
  components: { pageSection },
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

<template>
  <Layout :transparent="true" :light="true">
    <HeroSection
      id="home"
      title="SV Eutingen"
      subtitle="#mehralseinverein"
      image="home.jpg"
      :primary-button="{ text: 'Aktuelles', to: '#aktuelles' }"
      :secondary-button="{ text: 'Mach mit', to: '#mach-mit' }"
    />
    <PageSection id="aktuelles" title="Aktuelles">
      <div class="space-y-4">
        <div
          v-for="(item, index) in news"
          :key="index"
          class="rounded border-2 border-stone-300 bg-white p-4"
        >
          <div class="flex flex-row items-center pb-4">
            <svg
              class="h-5 w-5 flex-none fill-current text-red-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="pl-2 text-xl font-semibold">
              {{ item.title }}
            </div>
          </div>
          <ExpandableContent
            client:idle
            :content="item.text"
            :collapsed="item.collapsed"
          />
        </div>
      </div>
    </PageSection>
    <PageSection id="mach-mit" dark title="Mach mit">
      <div class="font-medium">
        Du suchst Teamsport oder Fitness-Angebote? Du hast Lust auf Ehrenamt?
        Oder suchst eine starke Sponsoringpartnerschaft für Dein Unternehmen?
      </div>
      <div class="pt-2 pb-4">
        Bei uns bist Du richtig. Denn wir entfalten Talente, ermöglichen
        Mannschafts- und Gesundheitssport, stiften Gemeinschaft und leben
        Partnerschaften.
      </div>
      <div class="-m-2 flex flex-wrap">
        <div
          v-for="(item, index) in joins"
          :key="index"
          class="w-full p-2 lg:w-1/2"
        >
          <router-link
            :to="item.link"
            class="group flex h-full flex-col overflow-hidden rounded border-2 border-stone-300 bg-white hover:shadow-sm focus:outline-none focus:ring-red-600 focus:ring-opacity-50 focus-visible:ring-2"
          >
            <div
              class="aspect-[5/3] overflow-hidden sm:aspect-[2/1] lg:aspect-[5/3]"
            >
              <DynamicPictureCard
                :name="item.image"
                :alt="item.title"
                class="h-full w-full object-cover transition duration-500 ease-in-out group-hover:scale-110 group-hover:transform-gpu"
              />
            </div>
            <div class="flex flex-grow flex-col p-4">
              <div
                class="mb-3 text-lg font-medium text-stone-800 group-hover:text-black"
              >
                {{ item.title }}
              </div>
              <p class="flex-grow text-stone-700 group-hover:text-stone-900">
                {{ item.text }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </PageSection>
  </Layout>
</template>

<script setup lang="ts">
import allNews from '@/data/news'

const news = allNews.slice(0, 4)

const joins = [
  {
    title: 'Fußball - unsere Leidenschaft',
    text: 'Auf unserer tollen Sportanlage u.a. mit neuwertigen Kunstrasenplätzen bieten wir für Frauen und Männer ein breites Fußballangebot in verschiedenen Ligen.',
    image: 'join_fussball.jpg',
    link: '/teamsport#fussball',
  },
  {
    title: 'Teilhabe für Kinder und Jugendliche',
    text: 'Eine sinnstiftende Freizeitbeschäftigung für Kinder und Jugendliche ist Schwerpunkt unserer Vereinsarbeit. Wir bieten für alle Altersklassen sowie Mädchen und Jungs die Möglichkeit, Fußball zu spielen. Ebenfalls im Programm haben wir regelmäßige Schwimmkurse für Kinder.',
    image: 'join_jugend.jpg',
    link: '/teamsport#jugend',
  },
  {
    title: "Fühl' Dich wohl durch Fitness",
    text: 'Unser breites Fitnessangebot bietet für jedes Alter den perfekten Ausgleich zum Alltag und schafft spürbar mehr Lebensqualität. Rückenfit, Yoga, Pilates, Power Hour... - bei uns findest Du einen passenden Kurs.',
    image: 'join_fitness.jpg',
    link: '/fitness',
  },
  {
    title: 'Volleyball - genau Dein Ding',
    text: 'Unsere Hobbygruppe heißt Dich als Anfänger, ehemaliger Profi oder Wiedereinsteiger des Volleyballsports herzlich willkommen. Immer freitags um 20 Uhr steht die Freude am Sport im Vordergrund.',
    image: 'join_volleyball.jpg',
    link: '/teamsport#volleyball',
  },
  {
    title: 'Sponsoring - wir leben Partnerschaft',
    text: 'Geben und Nehmen - so lautet unser Grundsatz für gelungene Partnerschaften. Wir bieten Werbemöglichkeiten, um auf unserer belebten Sportanlage auf Unternehmen und Dienstleistungen aufmerksam zu machen. Für unsere Partner stehen wir auch parat, wenn sie die Hilfe unserer tatkräftigen Mitglieder bspw. für ein Firmenjubiläum benötigen.',
    image: 'join_sponsoring.jpg',
    link: '/sponsoring',
  },
  {
    title: 'Mach mit und werde Mitglied',
    text: 'Über 5,3 Millionen Menschen in Baden-Württemberg engagieren sich ehrenamtlich. Dafür bieten wir auch beim SVE viele Möglichkeiten. Ob Vereinsamt oder reine Mitgliedschaft - mit Deinem Einsatz unterstützt Du unsere Arbeit und stiftest gesellschaftlichen Nutzen.',
    image: 'join_mitglied.jpg',
    link: '/mitgliedschaft',
  },
]
</script>

<page>
title: Teamsport
</page>

<template>
  <Layout>
    <PageSection id="fussball" title="Teamsport">
      <div class="pb-1">
        Fußball ist der beliebteste Breitensport in Deutschland. Zu sehr
        günstigen Konditionen bieten wir in unseren verschiedenen Abteilungen
        für Kinder, Jugendliche, Frauen und Männer das passende Angebot rund um
        das beliebte Leder. Gleichzeitig ist Fußball unser Integrationsmotor
        Nummer eins.
      </div>
      <div class="pb-4">
        Neben dem breiten Fussballangebot gibt es beim SV Eutingen auch die
        Möglichkeit Volleyball zu spielen.
      </div>
      <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(section, index) of sections"
          :key="index"
          :href="section.to"
          class="w-fill on-focus-dark flex items-center rounded bg-white p-3 font-medium text-red-800 hover:bg-stone-200"
        >
          <div
            class="relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-800 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-2 truncate">
            {{ section.title }}
          </div>
        </a>
      </div>
    </PageSection>
    <TeamInfos id="herren" dark title="Herrenfussball" :teams="teams.herren">
      In unserer Herrenfußballabteilung ermöglichen wir Teamsport auf
      verschiedenen Leistungsniveaus. Bei uns ist für jeden etwas dabei. Durch
      teambuildende Aktionen stärken wir Gemeinschaft und Wir-Gefühl.
    </TeamInfos>
    <TeamInfos id="frauen" title="Frauenfussball" :teams="teams.frauen">
      In unserer Frauenfußballabteilung ermöglichen wir Teamsport auf
      verschiedenen Leistungsniveaus. Bei uns ist für jede Frau etwas dabei.
      Durch teambuildende Aktionen stärken wir Gemeinschaft und Wir-Gefühl.
    </TeamInfos>
    <TeamInfos
      id="jugend"
      dark
      title="Jugendfussball (männlich)"
      :teams="teams.jugend_herren"
    >
      Jugendliche sind unsere Zukunft. Mit unseren Trainern und Betreuern bieten
      wir ein schönes Sportangebot, bei dem neben dem sportlichen Ehrgeiz die
      Freude an der Gemeinschaft im Mittelpunkt steht. Viele Aktionen bereichern
      unsere Jugendabteilung und bieten Abwechslung.
    </TeamInfos>
    <TeamInfos
      id="jugend-weiblich"
      title="Jugendfussball (weiblich)"
      :teams="teams.jugend_frauen"
    >
      Jugendliche sind unsere Zukunft. Mit unseren Trainern und Betreuern bieten
      wir ein schönes Sportangebot, bei dem neben dem sportlichen Ehrgeiz die
      Freude an der Gemeinschaft im Mittelpunkt steht. Viele Aktionen bereichern
      unsere Jugendabteilung und bieten Abwechslung.
    </TeamInfos>
    <TeamInfos id="kinder" dark title="Kinderfussball" :teams="teams.kinder">
      Kinder sind unsere Zukunft. Mit unseren Trainern und Betreuern bieten wir
      ein schönes Sportangebot, bei dem für die Kinder Bewegung, Sport und die
      Freude an der Gemeinschaft im Mittelpunkt stehen. Viele Aktionen
      bereichern unser Kinderangebot und bieten Abwechslung.
    </TeamInfos>
    <TeamInfos id="volleyball" title="Volleyball" :teams="teams.volleyball">
      Unsere Volleyballgruppe nimmt zwar nicht am regulären Wettbewerb teil,
      aber erlebt tolle Stunden. Denn Volleyball macht in dieser Hobbygruppe
      richtig viel Spaß.
    </TeamInfos>
  </Layout>
</template>

<script setup lang="ts">
import teams from '@/data/teams'

const sections = [
  { title: 'Herrenfussball', to: '#herren' },
  { title: 'Frauenfussball', to: '#frauen' },
  { title: 'Jugendfussball (männlich)', to: '#jugend' },
  { title: 'Jugendfussball (weiblich)', to: '#jugend-weiblich' },
  { title: 'Kinderfussball', to: '#kinder' },
  { title: 'Volleyball', to: '#volleyball' },
]
</script>

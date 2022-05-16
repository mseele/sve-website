<page>
title: Partnerschaft
</page>

<template>
  <Layout :transparent="true">
    <HeroSection
      title="Partnerschaft"
      subtitle="PROFITIERE MIT UNS"
      image="partnerschaft.jpg"
      :primary-button="{ text: 'Bandenwerbung', to: '#bande' }"
      :secondary-button="{ text: 'Unsere Partner', to: '#partner' }"
    />
    <PageSection title="Partnerschaft">
      <span
        >Unsere Partner ermöglichen durch ihre finanzielle und materielle
        Unterstützung das sportliche und kulturelle Angebot des SV Eutingen.
        Durch diese Zusammenarbeit ist es möglich, ein ehrenamtlich breites
        Sportangebot auf die Beine zu stellen.<br />
        Die Möglichkeiten einer Sponsoringpartnerschaft sind vielfältig:
        Sponsoren können bspw. direkt in die Aus- und Weiterbildung unserer
        Jugendtrainer investieren oder für ein bestimmtes Team auf deren Trikots
        oder sonstigem Equipment Werbung machen.<br />
        Hast auch Du Interesse an einer Partnerschaft?<br />
        Dann wende Dich bitte über das
        <router-link
          class="default-link on-focus whitespace-nowrap focus-visible:ring-offset-2"
          :to="{
            path: '/kontakt/',
            query: { auswahl: 'partnerschaft', thema: 'partnerschaft' },
          }"
          >Kontaktformular</router-link
        >
        an unseren Vorsitzenden Sebastian Lazar (<a
          href="mailto:vorstand@sv-eutingen.de"
          class="default-link on-focus whitespace-nowrap focus-visible:ring-offset-2"
          >vorstand@sv-eutingen.de</a
        >), der für Gespräche gerne zur Verfügung steht.</span
      >
    </PageSection>
    <PageSection id="bande" title="Bandenwerbung" dark>
      <span>
        Außerdem bieten wir seit über 20 Jahren eine attrative Bandenwerbung auf
        unserer sehr belebten Sportanlage. Die Abwicklung läuft unkompliziert.
        Wir kümmern uns über Anschaffung und Pflege der Bandenwerbung.<br />
        Du hast Interesse an diesem sehenswerten Auftritt?<br />
        Wende Dich bitte über das
        <router-link
          class="default-link on-focus-dark inline-block whitespace-nowrap focus-visible:ring-offset-2"
          :to="{
            path: '/kontakt/',
            query: { auswahl: 'partnerschaft', thema: 'bande' },
          }"
          >Kontaktformular</router-link
        >
        an unseren Vorsitzenden Sebastian Lazar (<a
          href="mailto:vorstand@sv-eutingen.de"
          class="default-link on-focus-dark whitespace-nowrap focus-visible:ring-offset-2"
          >vorstand@sv-eutingen.de</a
        >).
      </span>
    </PageSection>
    <PageSection id="partner" title="Unsere Partner">
      <div class="-mb-2">
        Mit diesen langjährigen Partnern leben wir Zusammenarbeit. Durch ihre
        materielle und finanzielle Unterstützung ermöglichen sie unser
        ehrenamtliches Angebot und machen auf ihre Produkte und Dienstleistungen
        aufmerksam. Partnerschaft bedeutet für uns, dass beide Seiten
        profitieren.<br />
        Klickt auf die Namen und gelangt direkt auf die Homepage unserer
        Partner.
      </div>
      <div
        v-for="(key, groupIndex) in Object.keys(sponsors)"
        :key="groupIndex"
        class="pt-8"
      >
        <HeaderTitle dark class="text-xl font-medium">
          {{ key }}
        </HeaderTitle>
        <div class="flex flex-wrap lg:-ml-4">
          <div
            v-for="(item, index) of sponsors[key]"
            :key="index"
            class="w-full pt-4 lg:w-1/2 lg:pl-4"
          >
            <component
              :is="item.url ? 'a' : 'div'"
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="on-focus-dark flex h-full items-center rounded bg-white p-4 text-black"
              :class="{ 'hover:bg-stone-200': item.url }"
            >
              <svg
                class="mr-4 h-6 w-6 flex-shrink-0 text-red-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="title-font font-medium">{{ item.name }}</span>
            </component>
          </div>
        </div>
      </div>
    </PageSection>
  </Layout>
</template>

<script setup lang="ts">
import sponsoring from '@/data/sponsoring'
import { Sponsor } from '@/models'

const sponsors = sponsoring
  .slice()
  .sort((a, b) => {
    const nameA = a.groupBy.toUpperCase()
    const nameB = b.groupBy.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
  .reduce((acc: Record<string, Sponsor[]>, item) => {
    const key = item.groupBy.toUpperCase().charAt(0)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})
</script>

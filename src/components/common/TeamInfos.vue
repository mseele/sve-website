<template>
  <PageSection :dark="dark" :title="title">
    <div class="pb-4">
      <slot></slot>
    </div>
    <div class="flex flex-wrap justify-center -m-2">
      <div
        v-for="(value, index) in teams"
        :key="index"
        class="w-full p-2 sm:w-1/2 xl:w-1/3 2xl:w-1/4"
      >
        <div
          class="flex flex-col justify-between h-full p-4 bg-white border-2 border-stone-300 rounded"
        >
          <div>
            <div
              class="flex items-center justify-between pb-2 border-b border-stone-300"
            >
              <div class="text-xl font-medium">{{ value.team }}</div>
              <a
                :href="
                  'http://www.fussball.de/mannschaft/sv-eutingen-ii-sv-eutingen-wuerttemberg/-/saison/9999/team-id/' +
                  value.teamID
                "
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center justify-end p-2 rounded-full hover:bg-stone-400 on-focus"
                :class="{ invisible: !value.teamID }"
              >
                <FussballDeIcon alt="link to fussball.de" class="w-5 h-5" />
              </a>
            </div>
            <div
              class="pt-4 text-xs font-medium tracking-wide text-stone-500 uppercase"
            >
              Spielklasse
            </div>
            <div class="font-medium">
              {{ value.league }}
            </div>
            <div
              class="pt-4 text-xs font-medium tracking-wide text-stone-500 uppercase"
            >
              {{ value.coach?.title || 'Trainer' }}
            </div>
            <div class="font-medium">
              {{ value.coach?.name || '-' }}
            </div>
            <div
              class="pt-4 text-xs font-medium tracking-wide text-stone-500 uppercase"
            >
              {{ value.contact.title }}
            </div>
            <div class="font-medium">
              {{ value.contact.name }}
            </div>
          </div>
          <div class="pt-4 text-center">
            <router-link
              :to="{
                path: '/kontakt/',
                query: { auswahl: 'team', team: value.key },
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
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Team } from '@/models'
import FussballDeIcon from '@/assets/fussball_de.svg?component'

const props = defineProps({
  teams: {
    type: Array as PropType<Team[]>,
    default: () => [],
  },
  dark: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
})
</script>

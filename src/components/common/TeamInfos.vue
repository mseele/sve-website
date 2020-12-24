<template>
  <page-section :dark="dark" :title="title">
    <div class="tw-pb-4">
      <slot></slot>
    </div>
    <div class="tw-flex tw-flex-wrap tw-justify-center tw--m-2">
      <div
        v-for="(value, index) in teams"
        :key="index"
        class="tw-w-full tw-p-2 sm:tw-w-1/2 xl:tw-w-1/3 2xl:tw-w-1/4"
      >
        <div
          class="tw-flex tw-flex-col tw-justify-between tw-h-full tw-p-4 tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
        >
          <div>
            <div
              class="tw-flex tw-items-center tw-justify-between tw-pb-2 tw-border-0 tw-border-b tw-border-gray-300 tw-border-solid"
            >
              <div class="tw-text-xl tw-font-medium">{{ value.team }}</div>
              <a
                :href="
                  'http://www.fussball.de/mannschaft/sv-eutingen-ii-sv-eutingen-wuerttemberg/-/saison/9999/team-id/' +
                  value.teamID
                "
                target="_blank"
                rel="noreferrer"
                class="tw-inline-flex tw-items-center tw-justify-end tw-p-2 tw-rounded-full hover:tw-bg-gray-400 tw-on-focus"
                :class="{ 'tw-invisible': !value.teamID }"
              >
                <g-image
                  class="tw-w-5 tw-h-5"
                  :src="require('@/assets/fussball_de.svg')"
                />
              </a>
            </div>
            <div
              class="tw-pt-4 tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
            >
              Spielklasse
            </div>
            <div class="tw-font-medium">
              {{ value.league }}
            </div>
            <div
              class="tw-pt-4 tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
            >
              {{
                value.coach && value.coach.title ? value.coach.title : 'Trainer'
              }}
            </div>
            <div class="tw-font-medium">
              {{ value.coach ? value.coach.name : '-' }}
            </div>
            <div
              class="tw-pt-4 tw-text-xs tw-font-medium tw-tracking-wide tw-text-gray-500 tw-uppercase"
            >
              {{ value.contact.title }}
            </div>
            <div class="tw-font-medium">
              {{ value.contact.name }}
            </div>
          </div>
          <div class="tw-pt-4 tw-text-center">
            <g-link
              :to="{
                path: $static.metadata.pathPrefix + '/kontakt',
                query: { auswahl: 'team', team: value.key },
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
  </page-section>
</template>

<script>
import pageSection from '@/components/common/PageSection'

export default {
  components: {
    pageSection,
  },
  props: {
    teams: {
      type: Array,
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
  },
}
</script>

<static-query>
query {
  metadata {
    pathPrefix
  }
}
</static-query>

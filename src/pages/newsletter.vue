<template>
  <Layout>
    <page-section title="Newsletter">
      <div class="tw-flex tw-flex-col lg:tw-items-center lg:tw-flex-row">
        <div
          class="tw-w-full tw-pb-6 tw-place-self-start lg:tw-w-1/2 lg:tw-pb-0 lg:tw-pr-2"
        >
          <div class="tw-font-medium lg:tw-text-xl lg:tw-block">
            Bleib auf dem Laufenden.
          </div>
          <div class="tw-pt-2">
            Halte Dich mit unseren Newslettern zu Teamsport, Events und/oder
            Fitness immer auf dem neuesten Stand.<br />
            Keine Sorge: Du wirst keine wöchentlichen Spams von uns erhalten,
            sondern interessante, gesammelte Informationen über unser
            SVE-Angebot.
          </div>
        </div>
        <div class="tw-w-full lg:tw-w-1/2 lg:tw-pl-2">
          <div class="tw-flex tw-flex-col">
            <div
              class="tw-flex tw-mx-auto tw-overflow-hidden tw-border-2 tw-border-red-800 tw-rounded"
            >
              <button
                class="tw-px-4 tw-py-1 focus:tw-outline-none"
                :class="{ 'tw-text-white tw-bg-red-800': subscribe }"
                @click="subscribe = true"
              >
                Anmelden
              </button>
              <button
                class="tw-px-4 tw-py-1 focus:tw-outline-none"
                :class="{ 'tw-text-white tw-bg-red-800': !subscribe }"
                @click="subscribe = false"
              >
                Abmelden
              </button>
            </div>
            <div class="tw-flex tw-py-6 tw-mx-auto">
              <div class="tw-space-y-4">
                <toogle v-model="common">
                  <span class="tw-font-medium">Allgemein</span>
                  <span class="tw-text-sm">
                    (Info's rund um den SV Eutingen)</span
                  >
                </toogle>
                <toogle v-model="fitness">
                  <span class="tw-font-medium">Fitness</span>
                  <span class="tw-text-sm">
                    (Alles über unser Fitnessangebot)</span
                  >
                </toogle>
                <toogle v-model="events">
                  <span class="tw-font-medium">Events</span>
                  <span class="tw-text-sm">
                    (Neuigkeiten über unsere Events)</span
                  >
                </toogle>
              </div>
            </div>
            <emailSubscription
              :success-message="successMessage"
              :type="type"
              :news-types="newsTypes"
            />
          </div>
        </div>
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import toogle from '@/components/controls/Toggle'
import emailSubscription from '@/components/common/EmailSubscription'

export default {
  metaInfo: {
    title: 'Newsletter',
  },
  components: {
    pageSection,
    toogle,
    emailSubscription,
  },
  data() {
    return {
      subscribe: true,
      common: true,
      fitness: true,
      events: true,
    }
  },
  computed: {
    type() {
      return this.subscribe ? 'subscribe' : 'unsubscribe'
    },
    newsTypes() {
      const types = []
      if (this.common) {
        types.push('General')
      }
      if (this.fitness) {
        types.push('Fitness')
      }
      if (this.events) {
        types.push('Events')
      }
      return types
    },
    successMessage() {
      return this.subscribe
        ? 'Du erhälst für die ausgewählten Optionen automatisch eine E-Mail. Vielen Dank.'
        : 'Du bist für die ausgewählten Optionen vom Newsletter abgemeldet worden und erhälst ab sofort keine Emails mehr.'
    },
  },
}
</script>

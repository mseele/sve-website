<template>
  <Layout>
    <page-section title="Newsletter">
      <div class="flex flex-col lg:items-center lg:flex-row">
        <div class="w-full pb-6 place-self-start lg:w-1/2 lg:pb-0 lg:pr-2">
          <div class="font-medium lg:text-xl lg:block">
            Bleib auf dem Laufenden.
          </div>
          <div class="pt-2">
            Halte Dich mit unseren Newslettern zu Teamsport, Events und/oder
            Fitness immer auf dem neuesten Stand.<br />
            Keine Sorge: Du wirst keine wöchentlichen Spams von uns erhalten,
            sondern interessante, gesammelte Informationen über unser
            SVE-Angebot.
          </div>
        </div>
        <div class="w-full lg:w-1/2 lg:pl-2">
          <div class="flex flex-col">
            <div
              class="flex mx-auto overflow-hidden bg-red-800 border-2 border-red-800 rounded"
            >
              <button
                aria-label="subscribe"
                class="px-4 py-1 focus:outline-none"
                :class="{
                  'text-white': subscribe,
                  'bg-white': !subscribe,
                }"
                @click="subscribe = true"
              >
                Anmelden
              </button>
              <button
                aria-label="unsubscribe"
                class="px-4 py-1 focus:outline-none"
                :class="{
                  'text-white': !subscribe,
                  'bg-white': subscribe,
                }"
                @click="subscribe = false"
              >
                Abmelden
              </button>
            </div>
            <div class="flex py-6 mx-auto">
              <div class="space-y-4">
                <toogle v-model="common">
                  <span class="font-medium">Allgemein</span>
                  <span class="text-sm"> (Info's rund um den SV Eutingen)</span>
                </toogle>
                <toogle v-model="fitness">
                  <span class="font-medium">Fitness</span>
                  <span class="text-sm">
                    (Alles über unser Fitnessangebot)</span
                  >
                </toogle>
                <toogle v-model="events">
                  <span class="font-medium">Events</span>
                  <span class="text-sm"> (Neuigkeiten über unsere Events)</span>
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
import { ref, computed } from '@vue/composition-api'
import pageSection from '@/components/common/pageSection'
import toogle from '@/components/controls/toggle'
import emailSubscription from '@/components/common/emailSubscription'

export default {
  metaInfo: {
    title: 'Newsletter',
  },
  components: {
    pageSection,
    toogle,
    emailSubscription,
  },
  setup() {
    const subscribe = ref(true)
    const common = ref(true)
    const fitness = ref(true)
    const events = ref(true)

    const type = computed(() => {
      return subscribe.value ? 'subscribe' : 'unsubscribe'
    })

    const newsTypes = computed(() => {
      const types = []
      if (common.value) {
        types.push('General')
      }
      if (fitness.value) {
        types.push('Fitness')
      }
      if (events.value) {
        types.push('Events')
      }
      return types
    })

    const successMessage = computed(() => {
      return subscribe.value
        ? 'Du erhälst für die ausgewählten Optionen automatisch eine E-Mail. Vielen Dank.'
        : 'Du bist für die ausgewählten Optionen vom Newsletter abgemeldet worden und erhälst ab sofort keine Emails mehr.'
    })

    return {
      subscribe,
      common,
      fitness,
      events,
      type,
      newsTypes,
      successMessage,
    }
  },
}
</script>

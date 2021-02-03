<template>
  <div>
    <hero-section
      :title="event.name"
      :dark="!event.light"
      :image="event.image"
      :primary-button="{ text: 'Mehr Infos', to: '#beschreibung' }"
      :secondary-button="{ text: 'Anmeldung', to: '#anmeldung' }"
      wrap
      dense
    />
    <page-section id="beschreibung" title="Beschreibung">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="event.description" />
    </page-section>
    <page-section id="details" title="Details" dark>
      <div class="flex flex-wrap space-y-3 md:space-y-0">
        <ul class="w-full space-y-3 md:w-1/2">
          <ili v-if="!counterAvailable()">Verfügbarkeit wird geprüft</ili>
          <ili v-else-if="!isBookedUp()">
            {{ toSubscribers(availableSubscribers()) }}
          </ili>
          <ili v-else>Ausgebucht</ili>
          <ili v-if="event.customDate">
            {{ event.customDate }}
          </ili>
          <ili v-else-if="event.dates.length == 1">
            {{ event.dates[0] }}
          </ili>
          <ili v-else>{{ event.dates.length }} Termine</ili>
          <ili>
            {{ durationPrefix() + ' ' }}
            {{ event.duration }}
          </ili>
        </ul>
        <ul class="w-full space-y-3 md:w-1/2">
          <ili v-if="event.costMember === event.costNonMember">
            {{ event.costMember }} pro Teilnehmer
          </ili>
          <template v-else>
            <ili>{{ event.costMember }} für Mitglieder</ili>
            <ili>{{ event.costNonMember }} für Nicht-Mitglieder</ili>
          </template>
          <ili>Wo: {{ event.location }}</ili>
        </ul>
      </div>
      <div v-if="event.externalOperator" class="pt-6">
        <div class="text-sm font-bold tracking-wider uppercase">
          Veranstalter
        </div>
        <div>Förderverein SV Eutingen 1947 e.V.</div>
      </div>
    </page-section>
    <page-section v-if="event.dates.length > 1" id="termine" title="Termine">
      <ul class="flex flex-wrap -mt-2">
        <li
          v-for="(date, index) of event.dates"
          :key="index"
          class="flex items-center w-full mt-2 md:w-1/2"
        >
          <svg
            class="w-5 h-5 mr-3 text-gray-400 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          {{ date }}
        </li>
      </ul>
    </page-section>
    <page-section
      id="anmeldung"
      :title="bookingTitle"
      :dark="event.dates.length > 1"
    >
      <template v-if="counterAvailable()">
        <template v-if="canBook()">
          <div class="pb-4">
            <slot name="bookingHeader"></slot>
          </div>
          <booking
            button-text="Kostenpflichtig buchen"
            :event-id="event.id"
            :label-updates="labelUpdates"
            @on-booking="onBooking($event)"
          ></booking>
        </template>
        <template v-else-if="!isBookedUp()">
          <div class="pb-4">
            Leider sind schon alle Plätze belegt. Gerne kannst Du Dich auf die
            Warteliste setzen lassen. Wir benachrichtigen Dich, wenn Plätze frei
            werden.
          </div>
          <booking
            button-text="Auf die Warteliste setzen"
            :event-id="event.id"
            :label-updates="labelUpdates"
            @on-booking="onBooking($event)"
          ></booking>
        </template>
        <template v-else>
          <div>
            Leider sind schon alle Plätze belegt und die Warteliste ist voll.
            Wir planen aber schon die nächste Runde. Schaue bald wieder vorbei.
          </div>
          <email-subscription
            :success-message="subscribeSuccess"
            :news-type="newsType"
            class="pt-8 lg:pt-4"
          >
            <slot name="subscribeInfo"></slot>
          </email-subscription>
        </template>
      </template>
      <div v-else class="flex items-center">
        <svg
          class="w-5 h-5 mr-3 text-red-800 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <div>
          Wir prüfen gerade die Verfügbarkeit. Die Anmeldemöglichkeiten werden
          in einem Moment angezeigt.
        </div>
      </div>
    </page-section>
  </div>
</template>

<script>
import { onMounted, computed, getCurrentInstance } from '@vue/composition-api'
import axios from 'axios'
import heroSection from '@/components/common/heroSection'
import pageSection from '@/components/common/pageSection'
import ili from '@/components/controls/infoListItem'
import booking from '@/components/events/booking'
import emailSubscription from '@/components/events/emailSubscription'
import { toSubscribers } from '@/util/converters'
import { useStore } from '@/composables/store'

export default {
  components: {
    heroSection,
    pageSection,
    ili,
    booking,
    emailSubscription,
  },
  props: {
    event: {
      type: Object,
      default: () => ({}),
    },
    labelUpdates: {
      type: String,
      default: undefined,
    },
    subscribeSuccess: {
      type: String,
      default: undefined,
    },
    newsType: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const { updateEventsCounter, eventsCounter } = useStore()

    const bookingTitle = computed(() => {
      if (counterAvailable()) {
        if (canBook()) {
          return 'Anmeldung'
        } else if (!isBookedUp()) {
          return 'Warteliste'
        }
        return 'Ausgebucht'
      }
      return 'Anmeldung'
    })

    onMounted(() => {
      axios
        .get(getCurrentInstance().proxy.$static.metadata.eventsAPI + '/counter')
        .then((res) => {
          updateEventsCounter(res.data)
        })
    })

    function eventCounter() {
      const e = props.event
      return eventsCounter.value.find((counter) => counter.id === e.id)
    }

    function counterAvailable() {
      return typeof eventCounter() !== 'undefined'
    }

    function isBookedUp() {
      const counter = eventCounter()
      if (counter.maxSubscribers === -1) {
        return false
      }
      return (
        counter.subscribers >= counter.maxSubscribers &&
        counter.waitingList >= counter.maxWaitingList
      )
    }

    function availableSubscribers() {
      const counter = eventCounter()
      if (counter.maxSubscribers === -1) {
        return -1
      }
      return counter.maxSubscribers - counter.subscribers
    }

    function durationPrefix() {
      if (props.event.type === 'Fitness') {
        return 'Kurslänge:'
      }
      return 'Eventlänge: ca.'
    }

    function canBook() {
      const available = availableSubscribers()
      return available === -1 || available > 0
    }

    return {
      toSubscribers,
      bookingTitle,
      counterAvailable,
      isBookedUp,
      availableSubscribers,
      durationPrefix,
      canBook,
    }
  },
}
</script>

<static-query>
query {
  metadata {
    eventsAPI
  }
}
</static-query>

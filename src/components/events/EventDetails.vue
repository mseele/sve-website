<template>
  <div>
    <PageSection id="details" title="Details" dark>
      <div class="flex flex-wrap space-y-3 md:space-y-0">
        <ul class="w-full space-y-3 md:w-1/2">
          <InfoListItem>
            {{ availabilityStatus }}
          </InfoListItem>
          <InfoListItem v-if="event.dates.length == 1">
            {{ event.dates[0] }}
          </InfoListItem>
          <InfoListItem v-else>{{ event.dates.length }} Termine</InfoListItem>
          <InfoListItem>
            {{ event.duration }}
          </InfoListItem>
        </ul>
        <ul class="w-full space-y-3 md:w-1/2">
          <InfoListItem
            v-if="
              event.priceMember === event.priceNonMember &&
              event.priceMember === '0 €'
            "
          >
            kostenlos
          </InfoListItem>
          <InfoListItem v-else-if="event.priceMember === event.priceNonMember">
            {{ event.priceMember }} pro Teilnehmer
          </InfoListItem>
          <template v-else>
            <InfoListItem>{{ event.priceMember }} für Mitglieder</InfoListItem>
            <InfoListItem
              >{{ event.priceNonMember }} für Nicht-Mitglieder</InfoListItem
            >
          </template>
          <InfoListItem>Wo: {{ event.location }}</InfoListItem>
        </ul>
      </div>
      <div v-if="event.externalOperator" class="pt-6">
        <div class="text-sm font-bold uppercase tracking-wider">
          Veranstalter
        </div>
        <div>Förderverein SV Eutingen 1947 e.V.</div>
      </div>
    </PageSection>
    <PageSection v-if="event.dates.length > 1" id="termine" title="Termine">
      <ul class="-mt-2 flex flex-wrap">
        <li
          v-for="(date, index) of event.dates"
          :key="index"
          class="mt-2 flex w-full items-center md:w-1/2"
        >
          <svg
            class="mr-3 h-5 w-5 fill-current text-stone-400"
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
    </PageSection>
    <PageSection
      id="anmeldung"
      :title="bookingTitle"
      :dark="event.dates.length > 1"
    >
      <template v-if="counterAvailable">
        <template v-if="canBook">
          <div class="pb-4">
            <slot name="bookingHeader"></slot>
          </div>
          <Booking
            :button-text="
              event.altBookingButtonText || 'Kostenpflichtig buchen'
            "
            :event-id="event.id"
            :label-updates="labelUpdates"
          />
        </template>
        <template v-else-if="!isBookedUp">
          <div class="pb-4">
            Leider sind schon alle Plätze belegt. Gerne kannst Du Dich auf die
            Warteliste setzen lassen. Wir benachrichtigen Dich, wenn Plätze frei
            werden.
          </div>
          <Booking
            button-text="Auf die Warteliste setzen"
            :event-id="event.id"
            :label-updates="labelUpdates"
          />
        </template>
        <template v-else>
          <div>
            Leider sind schon alle Plätze belegt und die Warteliste ist voll.
            Wir planen aber schon die nächste Runde. Schaue bald wieder vorbei.
          </div>
          <NewsSubscription
            :subscribe-success="subscribeSuccess"
            :news-type="newsType"
            class="pt-8 lg:pt-4"
          >
            <slot name="subscribeInfo"></slot>
          </NewsSubscription>
        </template>
      </template>
      <div v-else class="flex items-center">
        <svg
          class="mr-3 h-5 w-5 animate-spin text-red-800"
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
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, PropType } from 'vue'
import {
  counters,
  updateCounters,
  availableSubscribers as subscribersText,
} from '@/logic/counters'
import { Event, EventCounter } from '@/models'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
  labelUpdates: {
    type: String,
    required: true,
  },
  subscribeSuccess: {
    type: String,
    required: true,
  },
  newsType: {
    type: String,
    required: true,
  },
})

onMounted(updateCounters)

const eventCounter = computed<EventCounter | undefined>(() => {
  return counters.value?.find((counter) => counter.id === props.event.id)
})

const counterAvailable = computed<boolean>(() => {
  return eventCounter.value != undefined
})

const bookingTitle = computed(() => {
  if (counterAvailable.value) {
    if (canBook.value) {
      return 'Anmeldung'
    } else if (!isBookedUp) {
      return 'Warteliste'
    }
    return 'Ausgebucht'
  }
  return 'Anmeldung'
})

const availabilityStatus = computed(() => {
  if (!counterAvailable.value) {
    return 'Verfügbarkeit wird geprüft'
  } else if (!isBookedUp.value && eventCounter.value) {
    return subscribersText(eventCounter.value)
  }
  return 'Ausgebucht'
})

const canBook = computed<boolean>(() => {
  const available = availableSubscribers.value
  return available === -1 || available > 0
})

const isBookedUp = computed<boolean | undefined>(() => {
  const counter = eventCounter.value
  if (counter) {
    if (counter.max_subscribers === -1) {
      return false
    }
    return (
      counter.subscribers >= counter.max_subscribers &&
      counter.waiting_list >= counter.max_waiting_list
    )
  }
  return undefined // never should be here
})

const availableSubscribers = computed<number>(() => {
  const counter = eventCounter.value
  if (counter) {
    if (counter.max_subscribers === -1) {
      return -1
    }
    return counter.max_subscribers - Math.min(counter.subscribers, counter.max_subscribers)
  }
  return 0
})
</script>

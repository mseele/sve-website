<template>
  <div>
    <pre-booking
      v-if="preBookingHash"
      v-model="preBookingHash"
      :title-prefix="preBookingPrefix"
    />
    <template v-else>
      <page-section :title="title">
        <slot name="header"></slot>
      </page-section>
      <page-section :title="eventTitle" dark>
        <div v-if="events.length > 0">
          <div class="flex flex-wrap justify-center -m-2">
            <div
              v-for="(event, index) in events"
              :key="index"
              class="w-full p-2 lg:w-1/2 2xl:w-1/3"
            >
              <g-link
                :to="toPrefix + event.node.id + '/'"
                class="flex flex-col h-full overflow-hidden bg-white border-2 border-gray-300 rounded hover:shadow-sm group focus:outline-none focus-visible:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                <div
                  class="relative overflow-hidden pb-3/5 sm:pb-1/2 md:pb-2/5"
                >
                  <g-image
                    :src="event.node.image"
                    class="absolute object-cover w-full h-full transition duration-500 ease-in-out group-hover:transform-gpu group-hover:scale-110"
                  />
                </div>
                <div class="flex flex-col flex-grow p-4">
                  <div
                    class="text-lg font-medium text-gray-800 group-hover:text-black"
                  >
                    {{ event.node.name }}
                  </div>
                  <div
                    v-if="!counterAvailable(event.node)"
                    class="text-sm font-medium text-gray-400"
                  >
                    Verfügbarkeit wird geprüft
                  </div>
                  <div
                    v-else-if="!isBookedUp(event.node)"
                    class="text-sm font-medium text-green-600"
                  >
                    {{ toSubscribers(availableSubscribers(event.node)) }}
                  </div>
                  <div v-else class="text-sm font-medium text-red-600">
                    Ausgebucht
                  </div>
                  <div
                    class="flex-grow mt-3 text-gray-700 group-hover:text-gray-900"
                  >
                    {{ event.node.shortDescription }}
                  </div>
                </div>
              </g-link>
            </div>
          </div>
        </div>
        <div v-else class="self-center text-xl font-medium">
          <slot name="infoEmpty"></slot>
        </div>
        <email-subscription
          :success-message="subscribeSuccess"
          :news-type="newsType"
          class="pt-8"
        >
          <slot name="subscribeInfo"></slot>
        </email-subscription>
      </page-section>
      <page-section v-if="faqs.length > 0" id="faqs" title="Faqs">
        <faqs :faqs="faqs" />
      </page-section>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from '@vue/composition-api'
import axios from 'axios'
import pageSection from '@/components/common/pageSection'
import faqs from '@/components/common/faqs'
import emailSubscription from '@/components/events/emailSubscription'
import preBooking from '@/components/events/preBooking'
import { toSubscribers } from '@/util/converters'
import { useStore } from '@/composables/store'

export default {
  components: { pageSection, emailSubscription, faqs, preBooking },
  props: {
    title: {
      type: String,
      default: undefined,
    },
    eventTitle: {
      type: String,
      default: undefined,
    },
    events: {
      type: Array,
      default: () => [],
    },
    toPrefix: {
      type: String,
      default: undefined,
    },
    infoEmpty: {
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
    faqs: {
      type: Array,
      default: () => [],
    },
    preBookingPrefix: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { root }) {
    const { updateEventsCounter, eventsCounter } = useStore()

    const preBookingHash = ref(null)

    onMounted(() => {
      const preBookingValue = root.$route.query.pb
      if (preBookingValue) {
        preBookingHash.value = preBookingValue
      }
      axios
        .get(getCurrentInstance().proxy.$static.metadata.eventsAPI + '/counter')
        .then((res) => {
          updateEventsCounter(res.data)
        })
    })

    function eventCounter(event) {
      return eventsCounter.value.find((counter) => counter.id === event.id)
    }

    function counterAvailable(event) {
      const counter = eventCounter(event)
      return typeof counter !== 'undefined'
    }

    function isBookedUp(event) {
      const counter = eventCounter(event)
      if (counter.maxSubscribers === -1) {
        return false
      }
      return (
        counter.subscribers >= counter.maxSubscribers &&
        counter.waitingList >= counter.maxWaitingList
      )
    }

    function availableSubscribers(event) {
      const counter = eventCounter(event)
      if (counter.maxSubscribers === -1) {
        return -1
      }
      return counter.maxSubscribers - counter.subscribers
    }

    return {
      toSubscribers,
      preBookingHash,
      counterAvailable,
      isBookedUp,
      availableSubscribers,
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

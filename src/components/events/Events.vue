<template>
  <div>
    <page-section :title="title">
      <slot name="header"></slot>
    </page-section>
    <page-section :title="eventTitle" dark>
      <div v-if="events.length > 0">
        <div class="tw-flex tw-flex-wrap tw-justify-center tw--m-2">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="tw-w-full tw-p-2 lg:tw-w-1/2 2xl:tw-w-1/3"
          >
            <g-link
              :to="toPrefix + event.node.id + '/'"
              class="tw-flex tw-flex-col tw-h-full tw-overflow-hidden tw-no-underline tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded hover:tw-shadow-sm tw-group focus:tw-outline-none focus-visible:tw-ring-2 focus:tw-ring-red-600 focus:tw-ring-opacity-50"
            >
              <div
                class="tw-relative tw-overflow-hidden tw-pb-3/5 sm:tw-pb-1/2 md:tw-pb-2/5"
              >
                <g-image
                  :src="event.node.image"
                  class="tw-absolute tw-object-cover tw-w-full tw-h-full tw-transition tw-duration-500 tw-ease-in-out group-hover:tw-transform-gpu group-hover:tw-scale-110"
                />
              </div>
              <div class="tw-flex tw-flex-col tw-flex-grow tw-p-4">
                <div
                  class="tw-text-lg tw-font-medium tw-text-gray-800 group-hover:tw-text-black"
                >
                  {{ event.node.name }}
                </div>
                <div
                  v-if="!counterAvailable(event.node)"
                  class="tw-text-sm tw-font-medium tw-text-gray-400"
                >
                  Verfügbarkeit wird geprüft
                </div>
                <div
                  v-else-if="!isBookedUp(event.node)"
                  class="tw-text-sm tw-font-medium tw-text-green-600"
                >
                  {{ toSubscribers(availableSubscribers(event.node)) }}
                </div>
                <div v-else class="tw-text-sm tw-font-medium tw-text-red-600">
                  Ausgebucht
                </div>
                <div
                  class="tw-flex-grow tw-mt-3 tw-text-gray-700 group-hover:tw-text-gray-900"
                >
                  {{ event.node.shortDescription }}
                </div>
              </div>
            </g-link>
          </div>
        </div>
      </div>
      <div v-else class="tw-text-xl tw-font-medium">
        <slot name="infoEmpty"></slot>
      </div>
      <email-subscription
        :success-message="subscribeSuccess"
        :news-type="newsType"
        class="tw-pt-8"
      >
        <slot name="subscribeInfo"></slot>
      </email-subscription>
    </page-section>
    <page-section v-if="faqs.length > 0" id="faqs" title="Faqs">
      <faqs :faqs="faqs" />
    </page-section>
  </div>
</template>

<script>
import axios from 'axios'
import pageSection from '@/components/common/PageSection'
import faqs from '@/components/common/Faqs'
import emailSubscription from './EmailSubscription'
import { toSubscribers } from '@/util/converters'

export default {
  components: {
    pageSection,
    emailSubscription,
    faqs,
  },
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
  },
  data() {
    return {
      toSubscribers,
    }
  },
  computed: {
    eventsCounter() {
      return this.$store.state.events_counter
    },
  },
  mounted() {
    axios.get(this.$static.metadata.eventsAPI + '/counter').then((res) => {
      this.$store.commit('events_updateCounter', res.data)
    })
  },
  methods: {
    eventCounter(event) {
      return this.eventsCounter.find((counter) => counter.id === event.id)
    },
    counterAvailable(event) {
      const eventCounter = this.eventCounter(event)
      return typeof eventCounter !== 'undefined'
    },
    isBookedUp(event) {
      const eventCounter = this.eventCounter(event)
      if (eventCounter.maxSubscribers === -1) {
        return false
      }
      return (
        eventCounter.subscribers >= eventCounter.maxSubscribers &&
        eventCounter.waitingList >= eventCounter.maxWaitingList
      )
    },
    availableSubscribers(event) {
      const eventCounter = this.eventCounter(event)
      if (eventCounter.maxSubscribers === -1) {
        return -1
      }
      return eventCounter.maxSubscribers - eventCounter.subscribers
    },
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

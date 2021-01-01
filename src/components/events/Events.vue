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
            <div
              class="tw-flex tw-flex-col tw-h-full tw-overflow-hidden tw-bg-white tw-border-2 tw-border-gray-300 tw-border-solid tw-rounded"
            >
              <div class="tw-relative tw-pb-3/5 sm:tw-pb-1/2 md:tw-pb-2/5">
                <g-image
                  :src="event.node.image"
                  class="tw-absolute tw-object-cover tw-w-full tw-h-full"
                />
              </div>
              <div class="tw-flex tw-flex-col tw-flex-grow tw-p-4">
                <div class="tw-text-lg tw-font-medium tw-text-gray-900">
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
                <div class="tw-flex-grow tw-mt-3 tw-text-gray-700">
                  {{ event.node.shortDescription }}
                </div>
                <div class="tw-text-center">
                  <g-link
                    :to="toPrefix + event.node.id + '/'"
                    class="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-font-medium tw-text-red-800 tw-no-underline tw-rounded-full hover:tw-bg-red-100 hover:tw-bg-opacity-50 active:tw-text-red-900 md:tw-mb-2 lg:tw-mb-0 tw-on-focus"
                  >
                    Details
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

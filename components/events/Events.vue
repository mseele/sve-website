<template>
  <div>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>{{ title }}</h2>
          </v-col>
          <slot name="header"></slot>
        </v-row>
      </v-container>
    </section>
    <template v-if="events.length > 0">
      <section class="section_alt">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2>{{ eventTitle }}</h2>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              v-for="(event, index) in events"
              :key="index"
              cols="12"
              sm="6"
              xl="4"
            >
              <v-card outlined class="d-flex flex-column" height="100%">
                <v-img
                  :src="require('~/assets/events/' + event.image)"
                  aspect-ratio="2.75"
                  class="flex-grow-0"
                />
                <v-card-text class="text--primary flex-grow-1">
                  <div class="align-start">
                    <div class="headline">{{ event.name }}</div>
                    <div v-if="!counterAvailable(event)">
                      &nbsp;
                    </div>
                    <div
                      v-else-if="!isBookedUp(event)"
                      class="green--text subtitle-2 font-weight-medium"
                    >
                      {{ toSubscribers(availableSubscribers(event)) }}
                    </div>
                    <div v-else class="red--text subtitle-2 font-weight-medium">
                      Ausgebucht
                    </div>
                    <div class="pt-5 body-2">{{ event.shortDescription }}</div>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    rounded
                    text
                    color="primary"
                    class="px-5"
                    :append="true"
                    :to="event.id"
                  >
                    Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2>NEWSLETTER</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="subtitle-1 text-center pb-2">
              <slot name="subscribeInfo"></slot>
            </v-col>
          </v-row>
          <v-row>
            <emailSubscription
              :success-message="subscribeSuccess"
              :news-type="newsType"
              class="pb-12"
            ></emailSubscription>
          </v-row>
        </v-container>
      </section>
    </template>
    <template v-else>
      <section class="section_alt">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2>{{ eventTitle }}</h2>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="headline font-weight-bold text-center" cols="12">
              <slot name="infoEmpty"></slot>
            </v-col>
            <v-col class="subtitle-1 text-center pt-1" cols="12">
              <slot name="subscribeInfoEmpty"></slot>
            </v-col>
            <emailSubscription
              :success-message="subscribeSuccess"
              :news-type="newsType"
              class="pb-12"
            ></emailSubscription>
          </v-row>
        </v-container>
      </section>
    </template>
    <section
      v-if="faqs.length > 0"
      id="faqs"
      :class="events.length > 0 ? 'section_alt' : 'section'"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>FAQS</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels light>
              <v-expansion-panel v-for="(item, i) in faqs" :key="i">
                <v-expansion-panel-header>
                  <div class="font-weight-bold">{{ item.question }}</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.answer }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import emailSubscription from '~/components/base/EmailSubscription'

export default {
  components: {
    emailSubscription,
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
    infoEmpty: {
      type: String,
      default: undefined,
    },
    subscribeInfo: {
      type: String,
      default: undefined,
    },
    subscribeInfoEmpty: {
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
  computed: {
    eventsCounter() {
      return this.$store.state.events.counter
    },
  },
  mounted() {
    axios.get(process.env.eventsAPI + '/counter').then((res) => {
      this.$store.commit('events/updateCounter', res.data)
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
      return (
        eventCounter.subscribers >= eventCounter.maxSubscribers &&
        eventCounter.waitingList >= eventCounter.maxWaitingList
      )
    },
    availableSubscribers(event) {
      const eventCounter = this.eventCounter(event)
      return eventCounter.maxSubscribers - eventCounter.subscribers
    },
  },
}
</script>

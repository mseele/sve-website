<template>
  <section class="pa-0">
    <v-img :src="require('~/assets/events/' + event.image)" height="100vh">
      <v-container fill-height>
        <v-row align="center" class="pt-5 px-3">
          <v-sheet
            class="transparent"
            :class="event.light ? 'white--text' : 'black--text'"
          >
            <h1 class="display-2 d-none d-sm-flex">{{ event.name }}</h1>
            <h1 class="display-1 d-sm-none">{{ event.name }}</h1>
            <v-row class="mx-0 mt-6">
              <v-btn
                to="#beschreibung"
                nuxt
                rounded
                depressed
                outlined
                :dark="event.light"
                class="mr-2"
                >Mehr Infos</v-btn
              >
              <v-btn
                to="#anmeldung"
                nuxt
                rounded
                depressed
                :dark="!event.light"
                :disabled="!counterAvailable()"
                >Anmeldung</v-btn
              >
            </v-row>
          </v-sheet>
        </v-row>
      </v-container>
    </v-img>
    <section
      id="beschreibung"
      :class="event.dates.length > 1 ? 'section_alt' : 'section'"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>BESCHREIBUNG</h2>
          </v-col>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-col cols="12" v-html="event.description"></v-col>
        </v-row>
      </v-container>
    </section>
    <section
      id="details"
      :class="event.dates.length > 1 ? 'section' : 'section_alt'"
    >
      <v-container>
        <v-row class="pb-4">
          <v-col class="pb-6" cols="12">
            <h2>DETAILS</h2>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <ul>
              <li v-if="!counterAvailable()">
                &nbsp;
              </li>
              <li v-else-if="!isBookedUp()">
                {{ availableSubscribers() | toSubscribers }}
              </li>
              <li v-else>Ausgebucht</li>
              <li v-if="event.dates.length == 1">
                {{ event.dates[0] | toDate }}
              </li>
              <li v-else>{{ event.dates.length }} Termine</li>
              <li>
                {{ durationPrefix() + ' ' }}
                {{ event.durationInMinutes | toDuration }}
              </li>
            </ul>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <ul>
              <li>Wo: {{ event.location }}</li>
              <li>{{ event.costMember | toCurrency }} für Mitglieder</li>
              <li>
                {{ event.costNonMember | toCurrency }} für Nicht-Mitglieder
              </li>
            </ul>
          </v-col>
          <v-col
            v-if="event.externalOperator"
            class="pb-0 pt-6"
            cols="12"
            sm="6"
          >
            <div class="font-weight-bold">Veranstalter</div>
            <div>Förderverein SV Eutingen 1947 e.V.</div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-if="event.dates.length > 1" id="termine" class="section_alt">
      <v-container>
        <v-row class="pb-4">
          <v-col class="pb-6" cols="12">
            <h2>TERMINE</h2>
          </v-col>
          <v-col
            v-for="(date, index) of event.dates"
            :key="index"
            class="py-0"
            cols="12"
            sm="6"
          >
            <ul>
              <li>{{ date | toDate }}</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-if="counterAvailable()" id="anmeldung" class="section">
      <v-container>
        <v-row v-if="availableSubscribers() > 0">
          <v-col cols="12">
            <h2>ANMELDUNG</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            <slot name="bookingHeader"></slot>
          </v-col>
          <v-col cols="12">
            <booking
              button-text="Kostenpflichtig buchen"
              :event-id="event.id"
              :label-updates="labelUpdates"
              @on-booking="onBooking($event)"
            ></booking>
          </v-col>
        </v-row>
        <v-row v-else-if="!isBookedUp()">
          <v-col cols="12">
            <h2>WARTELISTE</h2>
          </v-col>
          <v-col cols="12">
            Leider sind schon alle Plätze belegt. Gerne kannst Du Dich auf die
            Warteliste setzen lassen. Wir benachrichtigen Dich, wenn Plätze frei
            werden.
            <booking
              button-text="Auf die Warteliste setzen"
              :event-id="event.id"
              :label-updates="labelUpdates"
              @on-booking="onBooking($event)"
            ></booking>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <h2>AUSGEBUCHT</h2>
          </v-col>
          <v-col cols="12">
            Leider sind schon alle Plätze belegt und die Warteliste ist voll.
            Wir planen aber schon die nächste Runde. Schaue bald wieder vorbei.
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import booking from '~/components/events/Booking'

export default {
  components: {
    booking
  },
  props: {
    event: {
      type: Object,
      default: () => ({})
    },
    labelUpdates: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      countersAvailable: false
    }
  },
  computed: {
    eventsCounter() {
      return this.$store.state.events.counter
    }
  },
  mounted() {
    axios.get(process.env.eventsAPI + '/counter').then((res) => {
      this.$store.commit('events/updateCounter', res.data)
    })
  },
  methods: {
    eventCounter() {
      const e = this.event
      return this.eventsCounter.find((counter) => counter.id === e.id)
    },
    counterAvailable() {
      const eventCounter = this.eventCounter()
      return typeof eventCounter !== 'undefined'
    },
    isBookedUp() {
      const eventCounter = this.eventCounter()
      return (
        eventCounter.subscribers >= eventCounter.maxSubscribers &&
        eventCounter.waitingList >= eventCounter.maxWaitingList
      )
    },
    availableSubscribers() {
      const eventCounter = this.eventCounter()
      return eventCounter.maxSubscribers - eventCounter.subscribers
    },
    durationPrefix() {
      if (this.event.type === 'Fitness') {
        return 'Kurslänge:'
      }
      return 'Eventlänge: ca.'
    }
  }
}
</script>

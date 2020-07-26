<template>
  <v-container>
    <template v-if="displayOptions()">
      <v-row justify="center" no-gutters>
        <v-checkbox
          v-model="newsTypes"
          label="Allgemein"
          value="General"
        ></v-checkbox>
        <v-checkbox
          v-model="newsTypes"
          label="Events"
          value="Events"
          class="px-4 px-sm-6 px-lg-10"
        ></v-checkbox>
        <v-checkbox
          v-model="newsTypes"
          label="Fitness"
          value="Fitness"
        ></v-checkbox>
      </v-row>
    </template>
    <v-row justify="center">
      <v-col class="subscribe" cols="12" sm="8" lg="6">
        <v-text-field
          v-model="email"
          type="email"
          solo
          dark
          flat
          hide-details
          label="E-Mail Adresse"
        >
          <template v-slot:append>
            <v-btn
              class="btn-subscribe"
              color="primary"
              :loading="subscribeLoading"
              @click="onClick()"
            >
              {{ isSubscription() ? 'Infos erhalten' : 'Abmelden' }}
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.subscribe {
  .v-input__slot {
    padding-right: 0 !important;
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
  }
}

.btn-subscribe {
  border-radius: 0 4px 4px 0;
  box-shadow: none !important;
  height: 48px !important;
  padding-top: 2px;
}
</style>

<script>
import axios from 'axios'
import { validateEmail } from '@/util/validators'

export default {
  props: {
    successMessage: {
      type: String,
      default: undefined,
    },
    newsType: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'subscribe',
    },
  },
  data() {
    return {
      newsTypes: [],
      email: '',
      subscribeLoading: false,
    }
  },
  mounted() {
    if (this.displayOptions()) {
      if (this.isSubscription()) {
        this.newsTypes.push('General', 'Events', 'Fitness')
      }
    } else {
      this.newsTypes.push(this.newsType)
    }
  },
  methods: {
    displayOptions() {
      return typeof this.newsType === 'undefined'
    },
    isSubscription() {
      return this.type === 'subscribe'
    },
    onClick() {
      if (this.isSubscription()) {
        this.subscribe()
      } else {
        this.unsubscribe()
      }
    },
    unsubscribe() {
      const value = this.email.trim()
      if (this.newsTypes.length === 0) {
        this.$store.commit(
          'notification_showError',
          'Bitte wähle mindestens eine Newletter Option aus. Vielen Dank.'
        )
      } else if (!validateEmail(value)) {
        this.$store.commit(
          'notification_showError',
          'Bitte gib eine gültige E-Mail Addresse an. Vielen Dank.'
        )
      } else {
        this.subscribeLoading = true
        const data = {
          email: value,
          types: this.newsTypes,
        }
        axios
          .post(this.$static.metadata.newsAPI + '/unsubscribe', data)
          .then((response) => {
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit('notification_showInfo', this.successMessage)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit(
              'notification_showError',
              'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
            )
          })
      }
    },
    subscribe() {
      const value = this.email.trim()
      if (this.newsTypes.length === 0) {
        this.$store.commit(
          'notification_showError',
          'Bitte wähle mindestens eine Newletter Option aus. Vielen Dank.'
        )
      } else if (!validateEmail(value)) {
        this.$store.commit(
          'notification_showError',
          'Bitte gib eine gültige E-Mail Addresse an. Vielen Dank.'
        )
      } else {
        this.subscribeLoading = true
        const data = {
          email: value,
          types: this.newsTypes,
        }
        axios
          .post(this.$static.metadata.newsAPI + '/subscribe', data)
          .then((response) => {
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit('notification_showInfo', this.successMessage)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit(
              'notification_showError',
              'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
            )
          })
      }
    },
  },
}
</script>

<static-query>
query {
  metadata {
    newsAPI
  }
}
</static-query>

<template>
  <v-col class="mx-auto" cols="12" sm="8" md="6">
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
          @click="subscribe"
        >
          Infos erhalten
        </v-btn>
      </template>
    </v-text-field>
  </v-col>
</template>

<style>
.v-input__slot {
  padding-right: 0 !important;
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
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

export default {
  props: {
    successMessage: {
      type: String,
      default: undefined
    },
    newsType: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'Email wird benötigt',
        (v) =>
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Die Email Addresse muss gültig sein'
      ],
      subscribeLoading: false
    }
  },
  methods: {
    validate(value) {
      return value.length > 0 && /.+@.+/.test(value)
    },
    subscribe() {
      const value = this.email.trim()
      if (this.validate(value)) {
        this.subscribeLoading = true
        const data = {
          email: value,
          type: this.newsType
        }
        axios
          .post(process.env.eventsAPI + '/subscribe', data)
          .then((response) => {
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit('notification/showInfo', this.successMessage)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.subscribeLoading = false
            this.email = ''
            this.$store.commit(
              'notification/showError',
              'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
            )
          })
      } else {
        this.$store.commit(
          'notification/showError',
          'Bitte gib eine gültige E-Mail Addresse an. Vielen Dank.'
        )
      }
    }
  }
}
</script>

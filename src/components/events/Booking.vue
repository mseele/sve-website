<template>
  <v-form ref="form" v-model="valid">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstName"
            label="Vorname"
            outlined
            :rules="notEmptyRule(firstName, 'Vorname')"
            name="fname"
            autocomplete="given-name"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastName"
            label="Nachname"
            outlined
            :rules="notEmptyRule(lastName, 'Nachname')"
            name="lname"
            autocomplete="family-name"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="street"
            label="Straße &amp; Hausnummer"
            outlined
            :rules="notEmptyRule(street, 'Straße &amp; Hausnummer')"
            name="address"
            autocomplete="street-address"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="city"
            label="PLZ &amp; Wohnort"
            outlined
            :rules="notEmptyRule(city, 'PLZ &amp; Wohnort')"
            name="zip city"
            autocomplete="postal-code address-level2"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            :rules="emailRules"
            name="email"
            autocomplete="email"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="phone" label="Telefon (optional)" outlined />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="comments"
            label="Kommentar (optional)"
            outlined
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox
            v-model="member"
            label="Ich bin Mitglied beim SV Eutingen"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="updates" :label="labelUpdates" />
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="checkbox"
            label="Ich stimme der Verarbeitung meiner personenbezogenen Daten zu"
            :rules="checkboxRules"
          />
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-btn
              :disabled="!valid"
              rounded
              depressed
              color="primary"
              :loading="submitLoading"
              @click="submit"
              >{{ buttonText }}</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
import { validateEmail } from '@/util/validators'

export default {
  props: {
    buttonText: {
      type: String,
      default: undefined,
    },
    eventId: {
      type: String,
      default: undefined,
    },
    labelUpdates: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      email: '',
      phone: '',
      member: false,
      updates: false,
      comments: '',
      checkbox: false,
      emailRules: [
        (v) => !!v || 'Email wird benötigt',
        (v) => validateEmail(v) || 'Die Email Addresse muss gültig sein',
      ],
      checkboxRules: [(v) => !!v || 'Eine Zustimmung wird benötigt'],
      submitLoading: false,
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.submitLoading = true
        const data = {
          eventId: this.eventId,
          firstName: this.firstName,
          lastName: this.lastName,
          street: this.street,
          city: this.city,
          email: this.email,
          phone: this.phone,
          member: this.member,
          updates: this.updates,
          comments: this.comments,
        }
        axios
          .post(this.$static.metadata.eventsAPI + '/booking', data)
          .then((response) => {
            this.submitLoading = false
            this.$refs.form.reset()
            const type = response.data.success ? 'showInfo' : 'showError'
            this.$store.commit('notification_' + type, response.data.message)
            if (response.data.success) {
              this.$store.commit('events_updateCounter', response.data.counter)
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            let value
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              value +=
                error.response.data +
                '-' +
                error.response.status +
                '-' +
                error.response.headers
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              value += error.request
            } else {
              // Something happened in setting up the request that triggered an Error
              value += error.message
            }
            value += '-' + error.config

            this.submitLoading = false
            this.$refs.form.reset()
            this.$store.commit('notification_showError', value)
          })
      }
    },
    notEmptyRule(value, name) {
      return [!!value || name + ' wird benötigt']
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

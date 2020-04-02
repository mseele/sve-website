<template>
  <v-form ref="form" v-model="valid">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Vor- und Nachname"
          outlined
          required
          :rules="nameRules"
        ></v-text-field>
      </v-col>
      <v-col class="pt-2" cols="12">
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          required
          :rules="emailRules"
        ></v-text-field>
      </v-col>
      <v-col class="pt-2" cols="12">
        <v-text-field
          v-model="phone"
          label="Telefon (optional)"
          outlined
        ></v-text-field>
      </v-col>
      <v-col class="pt-2" cols="12">
        <v-textarea
          v-model="message"
          label="Nachricht"
          outlined
          required
          :rules="messageRules"
        ></v-textarea>
      </v-col>
      <v-col class="pt-2" cols="12">
        <v-checkbox
          v-model="privacy"
          class="mt-0 ml-3"
          label="Ich stimme der Verarbeitung meiner personenbezogenen Daten zu"
          required
          :rules="privacyRules"
        />
      </v-col>
      <v-col class="pt-5" cols="12">
        <v-btn
          :disabled="!valid"
          rounded
          depressed
          color="primary"
          :loading="submitLoading"
          @click="submit"
        >
          Nachricht senden
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    type: {
      type: String,
      default: 'General',
    },
    to: {
      type: String,
      default: 'info@sv-eutingen.de',
    },
  },
  data() {
    return {
      valid: false,
      submitLoading: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      privacy: false,
      nameRules: [(v) => !!v || 'Vor- und Nachname wird benötigt'],
      messageRules: [(v) => !!v || 'Nachricht wird benötigt'],
      emailRules: [
        (v) => !!v || 'Email wird benötigt',
        (v) =>
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Die Email Addresse muss gültig sein',
      ],
      privacyRules: [(v) => !!v || 'Eine Zustimmung wird benötigt'],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.submitLoading = true
        const data = {
          type: this.type,
          to: this.to,
          name: this.name.trim(),
          email: this.email.trim(),
          phone: this.phone ? this.phone.trim() : '',
          message: this.message.trim(),
        }
        axios
          .post(process.env.contactAPI + '/message', data)
          .then((response) => {
            this.submitLoading = false
            this.$refs.form.reset()
            this.$store.commit(
              'notification/showInfo',
              'Danke für deine Nachricht. Wir melden uns umgehend bei Dir.'
            )
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.submitLoading = false
            this.$refs.form.reset()
            this.$store.commit(
              'notification/showError',
              'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
            )
          })
      }
    },
  },
}
</script>

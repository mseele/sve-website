<template>
  <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }">
    <form class="w-full" @submit.prevent="handleSubmit(submit)">
      <div class="flex flex-wrap">
        <labeled-input
          v-model="firstName"
          class="w-full pb-2 md:w-1/2 md:pr-2"
          label="Vorname"
          rules="required"
          name="fname"
          autocomplete="given-name"
        />
        <labeled-input
          v-model="lastName"
          class="w-full pb-2 md:w-1/2 md:pl-2"
          label="Nachname"
          rules="required"
          name="lname"
          autocomplete="family-name"
        />
        <labeled-input
          v-model="street"
          class="w-full pb-2 md:w-1/2 md:pr-2"
          label="Straße &amp; Hausnummer"
          rules="required"
          name="address"
          autocomplete="street-address"
        />
        <labeled-input
          v-model="city"
          class="w-full pb-2 md:w-1/2 md:pl-2"
          label="PLZ &amp; Wohnort"
          rules="required"
          name="zip city"
          autocomplete="postal-code address-level2"
        />
        <labeled-input
          v-model="email"
          class="w-full pb-2 md:w-1/2 md:pr-2"
          label="Email"
          rules="required|email"
          type="email"
          name="email"
          autocomplete="email"
        />
        <labeled-input
          v-model="phone"
          class="w-full pb-2 md:w-1/2 md:pl-2"
          label="Telefon (optional)"
          name="phone"
          autocomplete="phone"
        />
        <labeled-input
          v-model="comments"
          class="w-full pb-2"
          label="Kommentar (optional)"
          type="textarea"
        />
        <div class="inline-flex w-full pb-4 md:w-1/2 md:pr-2">
          <input
            v-model="member"
            class="mt-0/5 checkbox-input"
            type="checkbox"
          />
          <span
            class="pl-2 text-sm font-medium cursor-pointer select-none"
            @click="member = !member"
          >
            Ich bin Mitglied beim SV Eutingen
          </span>
        </div>
        <div class="inline-flex w-full pb-4 md:w-1/2 md:pl-2">
          <input
            v-model="updates"
            class="mt-0/5 checkbox-input"
            type="checkbox"
          />
          <span
            class="pl-2 text-sm font-medium cursor-pointer select-none"
            @click="updates = !updates"
          >
            {{ labelUpdates }}
          </span>
        </div>
        <privacy-checkbox v-model="privacy" class="w-full pb-2" />
      </div>
      <div class="flex justify-center">
        <btn
          class="w-full md:w-80"
          :disabled="invalid"
          :loading="submitLoading"
          type="submit"
          >{{ buttonText }}</btn
        >
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import axios from 'axios'
import { ValidationObserver } from 'vee-validate'
import labeledInput from '@/components/controls/LabeledInput'
import privacyCheckbox from '@/components/controls/PrivacyCheckbox'
import btn from '@/components/controls/PrimaryButton'

export default {
  components: {
    ValidationObserver,
    labeledInput,
    privacyCheckbox,
    btn,
  },
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
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      email: '',
      phone: '',
      comments: '',
      member: false,
      updates: false,
      privacy: false,
      submitLoading: false,
    }
  },
  methods: {
    submit() {
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
          this.reset()
          const type = response.data.success ? 'showInfo' : 'showError'
          this.$store.commit('notification_' + type, response.data.message)
          if (response.data.success) {
            this.$store.commit('events_updateCounter', response.data.counter)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.submitLoading = false
          this.reset()
          this.$store.commit(
            'notification_showError',
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    },
    reset() {
      this.firstName = ''
      this.lastName = ''
      this.street = ''
      this.city = ''
      this.email = ''
      this.phone = ''
      this.comments = ''
      this.member = false
      this.updates = false
      this.privacy = false
      this.$refs.form.reset()
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

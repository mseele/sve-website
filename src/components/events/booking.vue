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
import { ref, onMounted, getCurrentInstance } from '@vue/composition-api'
import axios from 'axios'
import { ValidationObserver } from 'vee-validate'
import labeledInput from '@/components/controls/labeledInput'
import privacyCheckbox from '@/components/controls/privacyCheckbox'
import btn from '@/components/controls/primaryButton'
import { useStore } from '@/composables/store'

const { updateEventsCounter, showInfo, showError } = useStore()

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
  setup(props) {
    const form = ref()
    const firstName = ref('')
    const lastName = ref('')
    const street = ref('')
    const city = ref('')
    const email = ref('')
    const phone = ref('')
    const comments = ref('')
    const member = ref(false)
    const updates = ref(false)
    const privacy = ref(false)
    const submitLoading = ref(false)

    let $static
    onMounted(() => {
      $static = getCurrentInstance().proxy.$static
    })

    function submit() {
      submitLoading.value = true
      const data = {
        eventId: props.eventId,
        firstName: firstName.value,
        lastName: lastName.value,
        street: street.value,
        city: city.value,
        email: email.value,
        phone: phone.value,
        member: member.value,
        updates: updates.value,
        comments: comments.value,
      }
      axios
        .post($static.metadata.eventsAPI + '/booking', data)
        .then((response) => {
          submitLoading.value = false
          reset()
          if (response.data.success) {
            showInfo(response.data.message)
            updateEventsCounter(response.data.counter)
          } else {
            showError(response.data.message)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          submitLoading.value = false
          reset()
          showError(
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    }

    function reset() {
      firstName.value = ''
      lastName.value = ''
      street.value = ''
      city.value = ''
      email.value = ''
      phone.value = ''
      comments.value = ''
      member.value = false
      updates.value = false
      privacy.value = false
      form.value.reset()
    }

    return {
      form,
      firstName,
      lastName,
      street,
      city,
      email,
      phone,
      comments,
      member,
      updates,
      privacy,
      submitLoading,
      submit,
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

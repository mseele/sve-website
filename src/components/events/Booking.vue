<template>
  <form class="w-full" @submit="onSubmit">
    <div class="flex flex-wrap">
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pr-2"
        label="Vorname"
        field="firstName"
        required
        name="fname"
        autocomplete="given-name"
      />
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pl-2"
        label="Nachname"
        field="lastName"
        required
        name="lname"
        autocomplete="family-name"
      />
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pr-2"
        label="Straße &amp; Hausnummer"
        field="street"
        required
        name="address"
        autocomplete="street-address"
      />
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pl-2"
        label="PLZ &amp; Wohnort"
        field="city"
        required
        name="zip city"
        autocomplete="postal-code address-level2"
      />
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pr-2"
        label="Email"
        field="email"
        required
        email
        name="email"
        autocomplete="email"
      />
      <LabeledInput
        class="w-full pb-2 md:w-1/2 md:pl-2"
        label="Telefon (optional)"
        field="phone"
        name="phone"
        autocomplete="phone"
      />
      <LabeledInput
        class="w-full pb-2"
        label="Kommentar (optional)"
        field="comments"
        textarea
      />
      <Checkbox
        field="member"
        name="member"
        class="inline-flex w-full pb-4 md:w-1/2 md:pr-2"
      >
        Ich bin Mitglied beim SV Eutingen
      </Checkbox>
      <Checkbox
        field="updates"
        name="updates"
        class="inline-flex w-full pb-4 md:w-1/2 md:pl-2"
      >
        {{ labelUpdates }}
      </Checkbox>
      <Checkbox field="privacy" name="privacy" class="w-full pb-2" required />
    </div>
    <div class="flex justify-center">
      <PrimaryButton
        class="w-full md:w-80"
        :disabled="!isValid"
        :loading="submitLoading"
        submit
        >{{ buttonText }}</PrimaryButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from 'ohmyfetch'
import { useForm, useIsFormValid } from 'vee-validate'
import { showInfo, showError } from '@/logic/notification'
import { updateCounters } from '@/logic/counters'
import { Booking, BookingResponse } from '@/models'

const props = defineProps({
  buttonText: {
    type: String,
    default: undefined,
  },
  eventId: {
    type: String,
    required: true,
  },
  labelUpdates: {
    type: String,
    default: undefined,
  },
})

const submitLoading = ref(false)

const { handleSubmit } = useForm({
  initialValues: {
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
  },
})
const isValid = useIsFormValid()

const onSubmit = handleSubmit((values, { resetForm }) => {
  submitLoading.value = true
  let url = import.meta.env.VITE_BACKEND_API + '/events/booking'
  const body: Booking = {
    eventId: props.eventId,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    street: values.street.trim(),
    city: values.city.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    member: values.member,
    updates: values.updates,
    comments: values.comments.trim(),
  }
  $fetch<BookingResponse>(url, { method: 'POST', body })
    .then((response) => {
      submitLoading.value = false
      resetForm()
      if (response.success) {
        showInfo(response.message)
        updateCounters(response.counter)
      } else {
        showError(response.message)
      }
    })
    .catch((error) => {
      submitLoading.value = false
      resetForm()
      showError(
        'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
      )
    })
})
</script>

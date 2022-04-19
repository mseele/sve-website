<template>
  <form class="w-full" @submit="onSubmit">
    <div v-if="toItems && toItems.length > 1" class="w-full pb-2">
      <InputLabel name="to">{{ toLabel }}</InputLabel>
      <select id="to" v-model="toSelection" class="text-input mb-4 w-full">
        <option
          v-for="(item, index) in toItems"
          :key="index"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
    <LabeledInput
      class="w-full pb-2"
      label="Vor- und Nachname"
      required
      field="name"
      name="fname"
      autocomplete="given-name"
    />
    <LabeledInput
      class="w-full pb-2"
      label="Email"
      required
      email
      field="email"
      name="email"
      autocomplete="email"
    />
    <LabeledInput
      class="w-full pb-2"
      label="Telefon (optional)"
      field="phone"
      name="phone"
      autocomplete="phone"
    />
    <LabeledInput
      class="w-full pb-2"
      label="Nachricht"
      field="message"
      name="message"
      textarea
      required
    />
    <Checkbox field="privacy" name="privacy" class="w-full pb-2" required />
    <PrimaryButton
      class="w-full"
      :disabled="!isValid"
      :loading="submitLoading"
      submit
    >
      Nachricht senden
    </PrimaryButton>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, PropType } from 'vue'
import { useForm, useIsFormValid } from 'vee-validate'
import { $fetch } from 'ohmyfetch'
import { showInfo, showError } from '@/logic/notification'
import { Item } from '@/models'

const props = defineProps({
  type: {
    type: String,
    default: 'General',
  },
  to: {
    type: String,
    default: 'info@sv-eutingen.de',
  },
  toLabel: {
    type: String,
    default: '',
  },
  toItems: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
})

const submitLoading = ref(false)
const toSelection = ref<string>()

onMounted(updateToSelection)
watch(() => props.toItems, updateToSelection)
watch(() => props.to, updateToSelection)

function updateToSelection() {
  nextTick(() => {
    toSelection.value =
      props.toItems && props.toItems.length > 0
        ? props.toItems[0].value
        : props.to
  })
}

const { handleSubmit } = useForm({
  initialValues: {
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  },
})
const isValid = useIsFormValid()

const onSubmit = handleSubmit((values, { resetForm }) => {
  submitLoading.value = true
  let url = import.meta.env.VITE_BACKEND_API + '/contact/message'
  const body = {
    type: props.type,
    to: toSelection.value,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    message: values.message.trim(),
  }
  $fetch(url, { method: 'POST', body })
    .then((response) => {
      submitLoading.value = false
      resetForm()
      showInfo('Danke für deine Nachricht. Wir melden uns umgehend bei Dir.')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      submitLoading.value = false
      resetForm()
      showError(
        'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
      )
    })
})
</script>

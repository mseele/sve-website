<template>
  <div class="flex flex-col">
    <div class="flex flex-col lg:flex-row lg:items-center">
      <input
        v-model="input"
        type="email"
        class="text-input"
        placeholder="E-Mail Adresse"
      />
      <PrimaryButton
        class="mt-2 lg:mt-0 lg:ml-2"
        :loading="loading"
        @click="onClick()"
      >
        {{ isSubscription() ? 'Infos erhalten' : 'Abmelden' }}
      </PrimaryButton>
    </div>
    <div class="pt-2 text-sm text-stone-800">
      Wir nehmen Datenschutz sehr ernst. Informiere dich in unserer
      <a class="on-focus-dark rounded text-black underline" href="/datenschutz"
        >Datenschutzerklärung</a
      >.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from 'ohmyfetch'
import {
  required as requiredValidator,
  email as emailValidator,
} from '@vee-validate/rules'
import { showInfo, showError } from '@/logic/notification'

const props = defineProps({
  successMessage: {
    type: String,
    required: true,
  },
  newsTypes: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'subscribe',
  },
})

const input = ref('')
const loading = ref(false)

function isSubscription() {
  return props.type === 'subscribe'
}

function onClick() {
  const types = props.newsTypes
  if (types.length === 0) {
    showError('Bitte wähle mindestens eine Newletter Option aus. Vielen Dank.')
    return
  }
  const email = input.value.trim()
  if (!requiredValidator(email)) {
    showError('Eine E-Mail Adresse wird benötigt')
  } else if (!emailValidator(email)) {
    showError('Die E-Mail Adresse ist ungültig')
  } else {
    loading.value = true
    let url =
      import.meta.env.VITE_BACKEND_API +
      '/news/' +
      (isSubscription() ? 'subscribe' : 'unsubscribe')
    const body = { email, types }
    $fetch(url, { method: 'POST', body })
      .then((response) => {
        loading.value = false
        input.value = ''
        showInfo(props.successMessage)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        loading.value = false
        input.value = ''
        showError(
          'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
        )
      })
  }
}
</script>

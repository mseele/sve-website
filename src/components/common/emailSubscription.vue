<template>
  <div class="flex flex-col">
    <ValidationProvider
      v-slot="{ errors }"
      rules="required|email"
      class="flex flex-col lg:flex-row lg:items-center"
      tag="div"
    >
      <input
        v-model="email"
        type="email"
        class="text-input"
        placeholder="E-Mail Adresse"
      />
      <btn
        class="mt-2 lg:mt-0 lg:ml-2"
        :loading="loading"
        @click="onClick(errors)"
      >
        {{ isSubscription() ? 'Infos erhalten' : 'Abmelden' }}
      </btn>
    </ValidationProvider>
    <div class="pt-2 text-sm text-gray-800">
      Wir nehmen Datenschutz sehr ernst. Informiere dich in unserer
      <a class="text-black underline rounded on-focus-dark" href="/datenschutz"
        >Datenschutzerklärung</a
      >.
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from '@vue/composition-api'
import axios from 'axios'
import { ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import btn from '@/components/controls/primaryButton'
import { useStore } from '@/composables/store'

extend('required', {
  ...required,
  message: 'Eine E-Mail Adresse wird benötigt',
})

extend('email', {
  ...email,
  message: 'Die E-Mail Adresse ist ungültig',
})

export default {
  components: { ValidationProvider, btn },
  props: {
    successMessage: {
      type: String,
      default: undefined,
    },
    newsTypes: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'subscribe',
    },
  },
  setup(props) {
    const { showInfo, showError } = useStore()

    const email = ref('')
    const loading = ref(false)

    let $static = null
    onMounted(() => {
      $static = getCurrentInstance().proxy.$static
    })

    function isSubscription() {
      return props.type === 'subscribe'
    }

    function onClick(errors) {
      if (props.newsTypes.length === 0) {
        showError(
          'Bitte wähle mindestens eine Newletter Option aus. Vielen Dank.'
        )
      } else if (errors.length > 0) {
        showError(errors[0])
      } else {
        const value = email.value.trim()
        if (isSubscription()) {
          subscribe(value)
        } else {
          unsubscribe(value)
        }
      }
    }

    function unsubscribe(value) {
      loading.value = true
      const data = {
        email: value,
        types: props.newsTypes,
      }
      axios
        .post($static.metadata.newsAPI + '/unsubscribe', data)
        .then((response) => {
          loading.value = false
          email.value = ''
          showInfo(props.successMessage)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          loading.value = false
          email.value = ''
          showError(
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    }

    function subscribe(value) {
      loading.value = true
      const data = {
        email: value,
        types: props.newsTypes,
      }
      axios
        .post($static.metadata.newsAPI + '/subscribe', data)
        .then((response) => {
          loading.value = false
          email.value = ''
          showInfo(props.successMessage)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          loading.value = false
          email.value = ''
          showError(
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    }

    return { email, loading, isSubscription, onClick }
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

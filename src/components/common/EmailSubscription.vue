<template>
  <div class="tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center">
      <input
        v-model="email"
        type="email"
        class="tw-text-input"
        placeholder="E-Mail Adresse"
      />
      <btn
        class="tw-mt-2 lg:tw-mt-0 lg:tw-ml-2"
        :loading="loading"
        @click="onClick()"
      >
        {{ isSubscription() ? 'Infos erhalten' : 'Abmelden' }}
      </btn>
    </div>
    <div class="tw-pt-2 tw-text-sm tw-text-gray-800">
      Wir nehmen Datenschutz sehr ernst. Informiere dich in unserer
      <a class="tw-text-black tw-rounded tw-on-focus-dark" href="/datenschutz"
        >Datenschutzerklärung</a
      >.
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validateEmail } from '@/util/validators'
import btn from '@/components/controls/PrimaryButton'

export default {
  components: { btn },
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
  data() {
    return {
      email: '',
      loading: false,
    }
  },
  methods: {
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
        this.loading = true
        const data = {
          email: value,
          types: this.newsTypes,
        }
        axios
          .post(this.$static.metadata.newsAPI + '/unsubscribe', data)
          .then((response) => {
            this.loading = false
            this.email = ''
            this.$store.commit('notification_showInfo', this.successMessage)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.loading = false
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
        this.loading = true
        const data = {
          email: value,
          types: this.newsTypes,
        }
        axios
          .post(this.$static.metadata.newsAPI + '/subscribe', data)
          .then((response) => {
            this.loading = false
            this.email = ''
            this.$store.commit('notification_showInfo', this.successMessage)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.loading = false
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

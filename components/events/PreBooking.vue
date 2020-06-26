<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    hash: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  watch: {
    hash(newVal, oldVal) {
      if (newVal !== null && newVal !== oldVal) {
        this.submit(newVal)
      }
    },
  },
  methods: {
    submit(data) {
      this.loading = true
      axios
        .post(process.env.eventsAPI + '/prebooking', data, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((response) => {
          this.loading = false
          const type = response.data.success ? 'showInfo' : 'showError'
          this.$store.commit('notification/' + type, response.data.message)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.loading = false
          this.$store.commit(
            'notification/showError',
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    },
  },
}
</script>

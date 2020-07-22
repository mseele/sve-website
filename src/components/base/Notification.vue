<template>
  <v-snackbar v-model="model" :color="color" multi-line>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="model = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  data() {
    return {
      mdiClose,
    }
  },
  computed: {
    color() {
      return this.$store.state.notification_color
    },
    message() {
      return this.$store.state.notification_message
    },
    model: {
      get() {
        return this.$store.state.notification_visible
      },
      set(value) {
        this.$store.commit('notification_toggleVisibility', value)
      },
    },
  },
}
</script>

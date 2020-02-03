<template>
  <v-snackbar v-model="model" :color="color" multi-line>
    {{ message }}
    <v-btn dark text @click="model = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    color() {
      return this.$store.state.notification.color
    },
    message() {
      return this.$store.state.notification.message
    },
    model: {
      get() {
        return this.$store.state.notification.visible
      },
      set(value) {
        this.$store.commit('notification/toggleVisibility', value)
      }
    }
  }
}
</script>

<template>
  <v-container class="text-center section" fill-height fluid>
    <v-row align="center">
      <v-col>
        <p class="display-2 primary--text">{{ title }}</p>
        <p class="headline pb-4">{{ message }}</p>
        <v-btn rounded depressed color="primary" to="/" nuxt>
          Zurück zur Startseite
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title:
        this.error.statusCode === 404
          ? 'Ups, falsch abgebogen'
          : 'Ups, nichts geht mehr',
      message:
        this.error.statusCode === 404
          ? 'Die gewünschte Seite wurde leider nicht gefunden.'
          : 'Es ist ein unerwarteter Fehler aufgetreten'
    }
  },
  head() {
    return {
      title: 'Fehler'
    }
  }
}
</script>

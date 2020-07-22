<template>
  <Layout>
    <v-container class="text-center section" fill-height fluid>
      <v-row align="center">
        <v-col>
          <p class="display-2 primary--text">Ups, falsch abgebogen</p>
          <p class="headline pb-4">
            Die gewünschte Seite wurde leider nicht gefunden.
          </p>
          <v-btn rounded depressed color="primary" to="/">
            Zurück zur Startseite
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Fehler',
  },
}
</script>

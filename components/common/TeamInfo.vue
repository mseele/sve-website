<template>
  <v-card outlined class="d-flex flex-column" height="100%">
    <v-card-title>
      {{ value.team }}
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div class="caption">Spielklasse</div>
      <div class="subtitle-1 font-weight-medium pb-0 text--primary">
        {{ value.league }}
      </div>
    </v-card-text>
    <v-card-text class="pt-0">
      <div v-if="value.contact.female" class="caption">Ansprechpartnerin</div>
      <div v-else class="caption">Ansprechpartner</div>
      <div class="subtitle-1 font-weight-medium pb-0 text--primary">
        {{ value.contact.name }}
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        rounded
        text
        class="px-5"
        color="primary"
        :to="{
          path: '/kontakt',
          query: { auswahl: 'team', team: value.key }
        }"
        nuxt
        >Kontakt</v-btn
      >
      <v-btn
        v-if="value.teamID"
        rounded
        text
        class="px-5"
        color="primary"
        :href="
          'http://www.fussball.de/mannschaft/sv-eutingen-ii-sv-eutingen-wuerttemberg/-/saison/9999/team-id/' +
            value.teamID
        "
        target="_blank"
        >Fussball.de</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

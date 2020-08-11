<template>
  <v-card outlined class="d-flex flex-column" height="100%">
    <v-card-title>
      {{ value.date }}
    </v-card-title>
    <v-card-subtitle class="subtitle-2">
      {{ value.time }}
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text class="flex-grow-1">
      <div class="title pb-2 text--primary">
        {{ value.title }}
      </div>
      <div v-if="value.description" class="caption">
        {{ value.description }}
      </div>
    </v-card-text>
    <v-card-actions v-if="value.link" class="justify-center">
      <v-btn
        rounded
        text
        class="px-5"
        color="primary"
        :href="value.link"
        target="_blank"
        rel="noreferrer"
      >
        Mehr Infos
      </v-btn>
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
      },
    },
  },
}
</script>

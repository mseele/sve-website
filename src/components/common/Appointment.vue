<template>
  <v-card outlined class="d-flex flex-column" height="100%">
    <v-card-title>
      {{ value.date }}
    </v-card-title>
    <v-card-subtitle class="subtitle-2">
      {{ value.time }}
    </v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div class="title pb-2 text--primary">
        {{ value.title }}
      </div>

      <div v-if="value.description" class="caption">
        {{ value.description }}
      </div>
    </v-card-text>
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

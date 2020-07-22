<template>
  <v-container fluid>
    <v-row
      v-for="(touch, index) in touches"
      :key="index"
      align="center"
      :class="{ 'pt-4': index >= 1 }"
    >
      <v-btn
        class="mx-4"
        fab
        x-small
        dark
        depressed
        :href="touch.href"
        target="_blank"
      >
        <v-icon dark>{{ touch.icon }}</v-icon>
      </v-btn>
      <a
        :href="touch.href"
        target="_blank"
        class="link font-weight-medium subtitle-1"
        >{{ touch.text }}</a
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    touches: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

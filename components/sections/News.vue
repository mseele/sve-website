<template>
  <div class="section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>AKTUELLES</h2>
        </v-col>
        <v-col v-for="(item, index) in items()" :key="index" cols="12">
          <v-card>
            <v-card-title>
              {{ item.title }}
            </v-card-title>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-card-text v-html="item.text"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const maxItems = 4

export default {
  methods: {
    items() {
      return this.$store.state.news.nodes.slice(0, maxItems)
    }
  }
}
</script>

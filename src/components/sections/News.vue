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
            <v-card-text class="txt" v-html="item.text"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import news from '@/data/news.json'

const maxItems = 4

export default {
  data() {
    return {
      news,
    }
  },
  methods: {
    items() {
      return this.news.slice(0, maxItems)
    },
  },
}
</script>

<style lang="scss">
.txt {
  color: black !important;
}

.video {
  margin: 0 auto;
  width: 400px;
}
</style>

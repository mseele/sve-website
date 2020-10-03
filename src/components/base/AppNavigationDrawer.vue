<template>
  <v-navigation-drawer v-model="drawer" right temporary fixed>
    <v-container class="ext tw-z-20" fluid>
      <v-row justify="center">
        <template v-for="(link, index) in links.externalItems">
          <v-btn
            :key="index"
            class="mx-4"
            :href="link.to"
            target="_blank"
            rel="noreferrer"
            small
            text
            icon
          >
            <v-avatar size="20">
              <v-img :src="require('@/assets/' + link.img)"></v-img>
            </v-avatar>
          </v-btn>
        </template>
      </v-row>
    </v-container>
    <v-list class="py-0">
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-divider :key="'div' + index" />
          <v-list-item
            :key="'itm' + index"
            :to="$static.metadata.pathPrefix + item.to"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.ext {
  padding: 10px !important;
}
</style>

<script>
import links from '@/data/links.json'

export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      drawer: this.value,
      links,
    }
  },
  computed: {
    items() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return this.links.mainItems.concat(this.links.items)
      }
      return this.links.items
    },
  },
  watch: {
    value(val) {
      this.drawer = val
    },
    drawer(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<static-query>
query {
  metadata {
    pathPrefix
  }
}
</static-query>

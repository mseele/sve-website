<template>
  <v-navigation-drawer v-model="drawer" right temporary fixed>
    <v-container class="ext" fluid>
      <v-row justify="center">
        <v-btn
          class="mx-4"
          href="https://www.facebook.com/sveutingen"
          target="_blank"
          small
          text
          icon
        >
          <v-avatar size="20">
            <v-img :src="require('~/assets/facebook.svg')"></v-img>
          </v-avatar>
        </v-btn>
        <v-btn
          class="mx-4 black--text"
          href="http://www.fussball.de/verein/sv-eutingen-wuerttemberg/-/id/00ES8GNAUG000068VV0AG08LVUPGND5I"
          target="_blank"
          small
          text
          icon
        >
          <v-avatar size="20">
            <v-img :src="require('~/assets/fussball_de.svg')"></v-img>
          </v-avatar>
        </v-btn>
      </v-row>
    </v-container>
    <v-list class="py-0">
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-divider :key="'div' + index" />
          <v-list-item :key="'itm' + index" :to="item.to" nuxt>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.ext {
  padding: 10px !important;
}
</style>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      drawer: this.value
    }
  },
  computed: {
    items() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return this.$store.state.links.mainItems.concat(
          this.$store.state.links.items
        )
      }
      return this.$store.state.links.items
    }
  },
  watch: {
    value(val) {
      this.drawer = val
    },
    drawer(val) {
      this.$emit('input', val)
    }
  }
}
</script>

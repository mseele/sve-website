<template>
  <v-navigation-drawer v-model="drawer" right temporary fixed>
    <v-list class="py-0">
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-divider v-if="index > 0" :key="'div' + index" />
          <v-list-item :key="'itm' + index" :to="item.to" nuxt>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

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

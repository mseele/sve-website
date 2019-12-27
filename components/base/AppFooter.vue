<template>
  <v-footer color="white" class="body-2" padless>
    <v-row class="my-3" justify="center">
      <v-col class="px-3 pt-0 hidden-sm-and-up" cols="12">
        <v-row justify="center" no-gutters>
          <template v-for="(item, index) in items">
            <nuxt-link
              :key="index"
              :to="item.to"
              :class="{ 'pl-3': index > 0 }"
              class="lnk"
              >{{ item.title }}</nuxt-link
            >
          </template>
        </v-row>
      </v-col>
      <span :class="{ 'mb-2': this.$vuetify.breakpoint.xsOnly }"
        ><strong>SV Eutingen</strong> &copy;
        {{ new Date().getFullYear() }}
      </span>
      <template v-for="(item, index) in items">
        <nuxt-link :key="index" :to="item.to" class="lnk pl-4 hidden-xs-only">{{
          item.title
        }}</nuxt-link>
      </template>
    </v-row>
  </v-footer>
</template>

<style>
.lnk {
  color: black !important;
  text-decoration: none !important;
}
</style>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.links.footerItems
    }
  }
}
</script>

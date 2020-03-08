<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text>
        <template v-for="(link, index) in links()">
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
              <v-img :src="link.img"></v-img>
            </v-avatar>
          </v-btn>
        </template>
      </v-card-text>
      <v-row justify="center" class="px-2 pb-4 subtitle-2" no-gutters>
        <template v-for="(item, index) in items()">
          <nuxt-link :key="index" :to="item.to" class="px-2 lnk">{{
            item.title
          }}</nuxt-link>
        </template>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class="black--text">
        &copy; {{ new Date().getFullYear() }} —
        <strong>SV Eutingen 1947 e.V. </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style lang="scss">
.lnk {
  color: black !important;
  text-decoration: none !important;
}
</style>

<script>
export default {
  methods: {
    items() {
      return this.$store.state.links.footerItems
    },
    links() {
      return this.$store.state.links.externalItems
    }
  }
}
</script>

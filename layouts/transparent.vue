<template>
  <v-app>
    <app-bar v-model="drawer" :transparent="true" />
    <v-content class="pt-0">
      <nuxt />
    </v-content>
    <app-navigation-drawer v-model="drawer" />
    <app-footer />
    <client-only>
      <cookie-law />
      <notification />
    </client-only>
  </v-app>
</template>

<script>
export default {
  components: {
    'app-bar': () => import('~/components/base/AppBar'),
    'app-navigation-drawer': () =>
      import('~/components/base/AppNavigationDrawer'),
    'app-footer': () => import('~/components/base/AppFooter'),
    'cookie-law': () => import('~/components/base/CookieLaw.vue'),
    notification: () => import('~/components/base/Notification.vue')
  },
  data() {
    return {
      drawer: false
    }
  },
  mounted() {
    // Manually parse hashes / decide on scrollBehavior for initial page load
    if (this.$route.hash) {
      this.$nextTick(() => {
        const hash = this.$route.hash
        if (document.querySelector(hash)) {
          this.$vuetify.goTo(hash, {
            offset: this.$vuetify.breakpoint.smAndDown ? 56 : 64
          })
        }
      })
    }
  }
}
</script>

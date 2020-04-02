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
import appBar from '~/components/base/AppBar'
import appNavigationDrawer from '~/components/base/AppNavigationDrawer'
import appFooter from '~/components/base/AppFooter'
import cookieLaw from '~/components/base/CookieLaw.vue'
import notification from '~/components/base/Notification.vue'

export default {
  components: {
    appBar,
    appNavigationDrawer,
    appFooter,
    cookieLaw,
    notification,
  },
  data() {
    return {
      drawer: false,
    }
  },
  mounted() {
    // Manually parse hashes / decide on scrollBehavior for initial page load
    if (this.$route.hash) {
      this.$nextTick(() => {
        const hash = this.$route.hash
        if (document.querySelector(hash)) {
          this.$vuetify.goTo(hash, {
            offset: this.$vuetify.breakpoint.smAndDown ? 56 : 64,
          })
        }
      })
    }
  },
}
</script>

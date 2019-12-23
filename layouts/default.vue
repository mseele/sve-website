<template>
  <v-app>
    <app-bar v-model="drawer" />
    <v-content>
      <nuxt />
    </v-content>
    <app-navigation-drawer v-model="drawer" />
    <app-footer />
    <client-only>
      <cookie-law />
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
    'cookie-law': () => import('~/components/base/CookieLaw.vue')
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

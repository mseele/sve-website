<template>
  <v-app>
    <app-bar v-model="drawer" />
    <v-content>
      <nuxt />
    </v-content>
    <app-navigation-drawer v-model="drawer" />
    <app-footer />
  </v-app>
</template>

<script>
export default {
  components: {
    'app-bar': () => import('~/components/base/AppBar'),
    'app-navigation-drawer': () =>
      import('~/components/base/AppNavigationDrawer'),
    'app-footer': () => import('~/components/base/AppFooter')
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<template>
  <v-app>
    <app-bar v-model="drawer" :transparent="true" />
    <v-content class="pt-0">
      <nuxt />
    </v-content>
    <app-navigation-drawer v-model="drawer" />
    <app-footer />
  </v-app>
</template>

<script>
export default {
  components: {
    'app-bar': () => import('~/components/AppBar'),
    'app-navigation-drawer': () => import('~/components/AppNavigationDrawer'),
    'app-footer': () => import('~/components/AppFooter')
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

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
import AppBar from '~/components/AppBar'
import AppNavigationDrawer from '~/components/AppNavigationDrawer'
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    'app-bar': AppBar,
    'app-navigation-drawer': AppNavigationDrawer,
    'app-footer': AppFooter
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

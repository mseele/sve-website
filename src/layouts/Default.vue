<template>
  <v-app>
    <app-bar v-model="drawer" :transparent="transparent" :light="light" />
    <app-navigation-drawer v-model="drawer" />
    <v-main :class="[transparent ? 'tw-pt-0' : 'tw-pt-12 md:tw-pt-14']">
      <slot />
    </v-main>
    <app-footer />
    <ClientOnly>
      <cookie-law />
      <notification />
    </ClientOnly>
  </v-app>
</template>

<script>
import appBar from '@/components/base/AppBar'
import appNavigationDrawer from '@/components/base/AppNavigationDrawer'
import appFooter from '@/components/base/AppFooter'
import cookieLaw from '@/components/base/CookieLaw.vue'
import notification from '@/components/base/Notification.vue'

export default {
  components: {
    appBar,
    appNavigationDrawer,
    appFooter,
    cookieLaw,
    notification,
  },
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
}
</script>

<template>
  <div class="flex flex-col max-w-full min-h-screen font-sans antialiased">
    <app-bar v-model="drawer" :transparent="transparent" :light="light" />
    <app-navigation-drawer v-model="drawer" />
    <div
      class="relative flex flex-col flex-grow max-w-full bg-gray-100"
      :class="[transparent ? 'pt-0' : 'pt-12 md:pt-14']"
    >
      <slot />
    </div>
    <app-footer />
    <ClientOnly>
      <cookie-law />
      <notification />
    </ClientOnly>
  </div>
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

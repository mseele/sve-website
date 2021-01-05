<template>
  <div class="flex flex-col max-w-full min-h-screen font-sans antialiased">
    <app-bar v-model="drawer" :transparent="transparent" :light="light" />
    <navigation-drawer v-model="drawer" />
    <div
      class="relative flex flex-col flex-grow max-w-full bg-gray-100"
      :class="[transparent ? 'pt-0' : 'pt-12 md:pt-14']"
    >
      <slot />
    </div>
    <footer />
    <ClientOnly>
      <cookie-law />
      <notification />
    </ClientOnly>
  </div>
</template>

<script>
import appBar from '@/components/base/appBar'
import navigationDrawer from '@/components/base/navigationDrawer'
import footer from '@/components/base/footer'
import cookieLaw from '@/components/base/cookieLaw.vue'
import notification from '@/components/base/notification.vue'

export default {
  components: {
    appBar,
    navigationDrawer,
    footer,
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

<template>
  <div class="flex min-h-screen max-w-full flex-col font-sans antialiased">
    <AppBar client:idle :transparent="props.transparent" :light="props.light">
      <template #logo>
        <router-link to="/" class="on-focus-dark h-6 rounded md:h-8">
          <Logo class="h-full" alt="Logo SV Eutingen" />
        </router-link>
      </template>
      <template #navTransparent>
        <nav class="hidden items-center space-x-5 sm:flex">
          <router-link
            v-for="(item, index) in mainItems"
            :key="index"
            :to="item.to"
            :class="[
              'on-focus-dark cursor-pointer rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-widest',
              light
                ? 'text-shadow-dark text-white hover:text-stone-300'
                : 'text-shadow-light text-stone-900 hover:text-stone-600',
            ]"
            exact-active-class="text-stone-300 bg-stone-800 bg-opacity-75 shadow-inner"
          >
            {{ item.title }}
          </router-link>
        </nav>
      </template>
      <template #nav>
        <nav class="hidden items-center space-x-5 sm:flex">
          <router-link
            v-for="(item, index) in mainItems"
            :key="index"
            :to="item.to"
            class="on-focus-dark cursor-pointer rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-widest text-white hover:bg-stone-800 hover:bg-opacity-75 hover:text-stone-300"
            exact-active-class="text-stone-300 bg-stone-800 bg-opacity-75 shadow-inner"
          >
            {{ item.title }}
          </router-link>
        </nav>
      </template>
    </AppBar>
    <NavigationDrawer client:idle>
      <div class="relative w-screen max-w-xs lg:max-w-sm xl:max-w-md">
        <div
          class="flex h-full flex-col space-y-2 overflow-y-auto bg-white p-2 shadow-xl xl:space-y-4 xl:p-4"
        >
          <ExternalLinks class="mx-auto px-4 md:px-6" />
          <div class="border-0 border-t border-stone-300"></div>
          <div>
            <router-link
              v-for="(item, index) in items"
              :key="'itm' + index"
              :to="item.to"
              class="on-focus my-1 block rounded-md p-2 text-sm font-medium tracking-wide text-stone-800 hover:text-black focus:outline-none xl:p-3 xl:text-base"
              exact-active-class="text-black bg-stone-200"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
      </div>
    </NavigationDrawer>
    <div
      class="relative flex max-w-full flex-grow flex-col bg-stone-100"
      :class="[transparent ? 'pt-0' : 'pt-12 md:pt-14']"
    >
      <slot />
    </div>
    <AppFooter />
    <Notification client:idle />
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.svg?component'
import links, { mainItems } from '@/data/links.json'

const items = links.mainItems.concat(links.items)

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
})
</script>

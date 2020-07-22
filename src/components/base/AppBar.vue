<template>
  <v-app-bar
    v-scroll="onScroll"
    :class="[
      showElevation ? 'elevation-2' : 'elevation-0',
      isTransparent ? 'transparent' : '',
    ]"
    :dark="!isTransparent || light"
    app
  >
    <g-link to="/">
      <v-img
        :src="require('@/assets/logo.svg')"
        alt="SVE"
        class="shrink"
        contain
        transition="fade-transition"
        width="30"
      />
    </g-link>
    <v-spacer />
    <template v-for="(item, index) in items()">
      <v-btn
        :key="index"
        :to="$static.metadata.pathPrefix + item.to"
        :class="{ 'ml-2': index > 0 }"
        class="hidden-xs-only"
        text
        rounded
      >
        {{ item.title }}
      </v-btn>
    </template>
    <v-spacer />
    <v-btn icon @click.stop="drawerClick()">
      <v-icon :dark="!isTransparent || light">{{ mdiMenu }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mdiMenu } from '@mdi/js'
import links from '@/data/links.json'

export default {
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
      currentScroll: 0,
      mdiMenu,
      links,
    }
  },
  computed: {
    isTransparent() {
      return this.transparent && this.currentScroll < 25
    },
    showElevation() {
      return !this.transparent || this.currentScroll > 1
    },
  },
  beforeMount() {
    this.currentScroll = window.pageYOffset
  },
  methods: {
    items() {
      return this.links.mainItems
    },
    drawerClick() {
      this.$emit('input', true)
    },
    onScroll(e) {
      this.currentScroll = window.pageYOffset
    },
  },
}
</script>

<static-query>
query {
  metadata {
    pathPrefix
  }
}
</static-query>

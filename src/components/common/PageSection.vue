<template>
  <div
    class="container flex flex-col flex-grow p-4 py-10 mx-auto sm:px-10 md:px-20"
    :class="[dark ? 'bg-gray-200' : 'bg-gray-100']"
  >
    <header-title
      v-if="title"
      dark
      truncate
      class="pb-6 text-3xl font-semibold tracking-widest uppercase"
    >
      {{ title }}
    </header-title>
    <slot></slot>
  </div>
</template>

<script>
import headerTitle from '@/components/controls/HeaderTitle'

export default {
  components: {
    headerTitle,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

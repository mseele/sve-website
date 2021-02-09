<template>
  <div
    class="flex flex-col flex-grow"
    :class="[dark ? 'bg-gray-200' : 'bg-gray-100']"
  >
    <div
      class="container flex flex-col flex-grow p-4 py-10 mx-auto sm:px-10 md:px-20"
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
  </div>
</template>

<script>
import headerTitle from '@/components/controls/headerTitle'

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

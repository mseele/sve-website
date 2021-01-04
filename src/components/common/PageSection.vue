<template>
  <div
    class="tw-container tw-flex tw-flex-col tw-flex-grow tw-p-4 tw-py-10 tw-mx-auto sm:tw-px-10 md:tw-px-20"
    :class="[dark ? 'tw-bg-gray-200' : 'tw-bg-gray-100']"
  >
    <header-title
      v-if="title"
      dark
      truncate
      class="tw-pb-6 tw-text-3xl tw-font-semibold tw-tracking-widest tw-uppercase"
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

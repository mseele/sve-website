<template>
  <div :class="[dark ? 'tw-bg-gray-200' : 'tw-bg-gray-100']">
    <div
      class="tw-container tw-p-4 tw-py-10 tw-mx-auto sm:tw-px-10 md:tw-px-20"
    >
      <header-title
        v-if="title"
        dark
        class="tw-pb-6 tw-text-3xl tw-font-semibold tw-tracking-widest tw-uppercase"
      >
        {{ title }}
      </header-title>
      <div>
        <slot></slot>
      </div>
    </div>
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

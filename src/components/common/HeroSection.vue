<template>
  <div class="tw-relative tw-w-screen tw-h-screen">
    <!-- workaround for https://github.com/gridsome/gridsome/issues/292 -->
    <slot :imageClass="'tw-w-full tw-h-full tw-object-cover'"></slot>
    <div class="tw-absolute tw-inset-0 tw-flex tw-items-center tw-p-4">
      <div class="tw-container tw-mx-auto sm:tw-px-10 md:tw-px-20">
        <header-title shadow :dark="dark" class="tw-text-5xl xl:tw-text-6xl">
          {{ title }}
        </header-title>
        <div
          v-if="subtitle"
          class="tw-pt-3 tw-text-2xl xl:tw-text-3xl"
          :class="[
            dark
              ? 'tw-text-gray-900 tw-text-shadow-light'
              : 'tw-text-white tw-text-shadow-dark',
          ]"
        >
          {{ subtitle }}
        </div>
        <div class="tw-flex tw-flex-wrap tw-pt-8">
          <btn
            outlined
            :dark="dark"
            :href="primaryButton.to"
            class="tw-mb-4 tw-mr-4 tw-text-sm xl:tw-text-base"
          >
            {{ primaryButton.text }}
          </btn>
          <btn
            :dark="dark"
            :href="secondaryButton.to"
            class="tw-mb-4 tw-text-sm xl:tw-text-base"
          >
            {{ secondaryButton.text }}
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerTitle from '@/components/controls/HeaderTitle'
import btn from '@/components/controls/Button'

export default {
  components: { headerTitle, btn },
  props: {
    title: {
      type: String,
      default: null,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
      required: false,
    },
    dark: {
      type: Boolean,
      default: false,
      required: false,
    },
    primaryButton: {
      type: Object,
      default: () => {
        return { text: '', to: '' }
      },
      required: true,
    },
    secondaryButton: {
      type: Object,
      default: () => {
        return { text: '', to: '' }
      },
      required: true,
    },
  },
}
</script>

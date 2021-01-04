<template>
  <div class="relative w-screen h-screen">
    <!-- workaround for https://github.com/gridsome/gridsome/issues/292 -->
    <slot :imageClass="'w-full h-full object-cover'"></slot>
    <div class="absolute inset-0 flex items-center p-4">
      <div class="container mx-auto sm:px-10 md:px-20">
        <header-title
          shadow
          :dark="dark"
          :wrap="wrap"
          :truncate="truncate"
          :class="[
            dense ? 'text-4xl xs:text-5xl xl:text-6xl' : 'text-5xl xl:text-6xl',
          ]"
        >
          {{ title }}
        </header-title>
        <div
          v-if="subtitle"
          class="pt-3 text-2xl xl:text-3xl"
          :class="[
            dark
              ? 'text-gray-900 text-shadow-light'
              : 'text-white text-shadow-dark',
          ]"
        >
          {{ subtitle }}
        </div>
        <div class="flex flex-wrap pt-8">
          <btn
            outlined
            :dark="dark"
            :href="primaryButton.to"
            class="mb-4 mr-4 text-sm xl:text-base"
          >
            {{ primaryButton.text }}
          </btn>
          <btn
            :dark="dark"
            :href="secondaryButton.to"
            class="mb-4 text-sm xl:text-base"
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
import btn from '@/components/controls/HeroButton'

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
    truncate: {
      type: Boolean,
      default: false,
      required: false,
    },
    wrap: {
      type: Boolean,
      default: false,
      required: false,
    },
    dense: {
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

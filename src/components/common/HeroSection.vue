<template>
  <div class="relative h-screen w-full">
    <DynamicPictureFull
      :name="image"
      class="h-full w-full object-cover"
      alt="hero image"
    />
    <div class="absolute inset-0 flex items-center p-4">
      <div class="container mx-auto sm:px-10 md:px-20">
        <HeaderTitle
          shadow
          :dark="dark"
          :wrap="wrap"
          :truncate="truncate"
          :class="[
            dense ? 'text-4xl xl:text-6xl xs:text-5xl' : 'text-5xl xl:text-6xl',
          ]"
        >
          {{ title }}
        </HeaderTitle>
        <div
          v-if="subtitle"
          class="pt-3 text-2xl xl:text-3xl"
          :class="[
            dark
              ? 'text-shadow-light text-stone-900'
              : 'text-shadow-dark text-white',
          ]"
        >
          {{ subtitle }}
        </div>
        <div class="flex flex-wrap pt-8">
          <HeroButton
            outlined
            :dark="dark"
            :href="primaryButton.to"
            class="mb-4 mr-4 text-sm xl:text-base"
          >
            {{ primaryButton.text }}
          </HeroButton>
          <HeroButton
            :dark="dark"
            :href="secondaryButton.to"
            class="mb-4 text-sm xl:text-base"
          >
            {{ secondaryButton.text }}
          </HeroButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
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
  image: {
    type: String,
    required: true,
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
})
</script>

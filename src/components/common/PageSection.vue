<template>
  <div
    class="flex flex-grow scroll-mt-12 flex-col"
    :class="[dark ? 'bg-stone-200' : 'bg-stone-100']"
  >
    <div
      class="flex flex-grow flex-col p-4 py-10 sm:container sm:mx-auto sm:px-10 md:px-20"
    >
      <HeaderTitle
        v-if="title"
        dark
        truncate
        class="pb-6 text-3xl font-semibold uppercase tracking-widest"
      >
        {{ title }}
      </HeaderTitle>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  dark: {
    type: Boolean,
    default: false,
  },
})
</script>

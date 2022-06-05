<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
    <div class="w-full pb-4 lg:w-1/2 lg:pb-0 lg:pr-2">
      <div class="text-xl font-medium">Halte dich auf dem Laufenden.</div>
      <div class="pt-1 lg:pt-2">
        <slot></slot>
      </div>
    </div>
    <EmailSubscription
      :success-message="props.subscribeSuccess"
      :news-types="[props.newsType]"
      class="w-full lg:w-1/2 lg:pl-2"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  subscribeSuccess: {
    type: String,
    required: true,
  },
  newsType: {
    type: String,
    required: true,
  },
})
</script>

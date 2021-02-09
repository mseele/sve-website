<template>
  <div class="flex flex-col lg:items-center lg:flex-row lg:justify-between">
    <div class="w-full pb-4 lg:w-1/2 lg:pb-0 lg:pr-2">
      <div class="text-xl font-medium">Halte dich auf dem Laufenden.</div>
      <div class="pt-1 lg:pt-2">
        <slot></slot>
      </div>
    </div>
    <email-subscription
      :success-message="subscribeSuccess"
      :news-types="[newsType]"
      class="w-full lg:w-1/2 lg:pl-2"
    />
  </div>
</template>

<script>
import emailSubscription from '@/components/common/emailSubscription'

export default {
  components: {
    emailSubscription,
  },
  props: {
    subscribeSuccess: {
      type: String,
      default: undefined,
    },
    newsType: {
      type: String,
      default: undefined,
    },
  },
}
</script>

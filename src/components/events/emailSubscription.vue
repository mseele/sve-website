<template>
  <div class="flex flex-col lg:items-center lg:flex-row lg:justify-between">
    <div class="pb-3 lg:pb-0 lg:pr-3">
      <div class="text-xl font-medium">Halte dich auf dem Laufenden.</div>
      <div class="pt-1 lg:pt-2">
        <slot></slot>
      </div>
    </div>
    <emailSubscription
      :success-message="subscribeSuccess"
      :news-types="[newsType]"
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

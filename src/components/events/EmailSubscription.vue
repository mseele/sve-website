<template>
  <div
    class="tw-flex tw-flex-col lg:tw-items-center lg:tw-flex-row lg:tw-justify-between"
  >
    <div class="tw-pb-3 lg:tw-pb-0 lg:tw-pr-3">
      <div class="tw-text-xl tw-font-medium">Halte dich auf dem Laufenden.</div>
      <div class="tw-pt-1 lg:tw-pt-2">
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
import emailSubscription from '@/components/common/EmailSubscription'

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

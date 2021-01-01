<template>
  <div class="tw-flex tw-flex-wrap tw-pt-6">
    <div class="tw-w-full md:tw-w-1/2 md:tw-pr-2">
      <header-title dark class="tw-text-xl tw-font-medium">
        Kontakt aufnehmen
      </header-title>
      <div class="tw-pt-4">
        <slot name="description"></slot>
      </div>
      <slot name="touches"></slot>
    </div>
    <div class="tw-w-full tw-pt-6 md:tw-w-1/2 md:tw-pl-2 md:tw-pt-0">
      <header-title dark class="tw-text-xl tw-font-medium">
        Nachricht senden
      </header-title>
      <send-message
        ref="sendMessage"
        class="tw-pt-4"
        :to="to"
        :to-items="toItems"
        :to-label="toLabel"
      />
    </div>
  </div>
</template>

<script>
import headerTitle from '@/components/controls/HeaderTitle'
import sendMessage from './sendMessage'

export default {
  components: { headerTitle, sendMessage },
  props: {
    to: {
      type: String,
      default: 'info@sv-eutingen.de',
    },
    toItems: {
      type: Array,
      default: () => [],
    },
    toLabel: {
      type: String,
      default: '',
    },
  },
  methods: {
    selectToItem(index) {
      this.$refs.sendMessage.selectToItem(index)
    },
  },
}
</script>

<template>
  <div class="flex flex-wrap pt-6">
    <div class="w-full md:w-1/2 md:pr-2">
      <header-title dark class="text-xl font-medium">
        Kontakt aufnehmen
      </header-title>
      <div class="pt-4">
        <slot name="description"></slot>
      </div>
      <slot name="touches"></slot>
    </div>
    <div class="w-full pt-6 md:w-1/2 md:pl-2 md:pt-0">
      <header-title dark class="text-xl font-medium">
        Nachricht senden
      </header-title>
      <send-message
        ref="sendMessage"
        class="pt-4"
        :to="to"
        :to-items="toItems"
        :to-label="toLabel"
      />
    </div>
  </div>
</template>

<script>
import headerTitle from '@/components/controls/headerTitle'
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

<template>
  <div class="flex flex-wrap pt-6">
    <div class="w-full md:w-1/2 md:pr-2">
      <HeaderTitle dark class="text-xl font-medium">
        Kontakt aufnehmen
      </HeaderTitle>
      <div class="pt-4">
        <slot name="description"></slot>
      </div>
      <slot name="touches"></slot>
    </div>
    <div class="w-full pt-6 md:w-1/2 md:pl-2 md:pt-0">
      <HeaderTitle dark class="text-xl font-medium">
        Nachricht senden
      </HeaderTitle>
      <SendMessage
        ref="sendMessage"
        class="pt-4"
        :to="to"
        :to-items="toItems"
        :to-label="toLabel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Item } from '@/models'

defineProps({
  to: {
    type: String,
    default: 'info@sv-eutingen.de',
  },
  toItems: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
  toLabel: {
    type: String,
    default: '',
  },
})

const sendMessage = ref()

function selectToItem(index: number) {
  sendMessage.value.selectToItem(index)
}

defineExpose({ selectToItem })
</script>

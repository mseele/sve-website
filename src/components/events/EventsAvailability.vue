<template>
  <div>
    <div v-if="!counterAvailable" class="text-sm font-medium text-stone-400">
      Verfügbarkeit wird geprüft
    </div>
    <div v-else-if="!isBookedUp" class="text-sm font-medium text-green-600">
      {{ availableSubscribers }}
    </div>
    <div v-else class="text-sm font-medium text-red-600">Ausgebucht</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { EventCounter } from '@/models'
import {
  counters,
  updateCounters,
  availableSubscribers as subscribersText,
} from '@/logic/counters'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(updateCounters)

const eventCounter = computed<EventCounter | undefined>(() => {
  return counters.value?.find((counter) => counter.id === props.id)
})

const counterAvailable = computed<boolean>(() => {
  return eventCounter.value != undefined
})

const isBookedUp = computed<boolean | undefined>(() => {
  const counter = eventCounter.value
  if (counter) {
    if (counter.maxSubscribers === -1) {
      return false
    }
    return (
      counter.subscribers >= counter.maxSubscribers &&
      counter.waitingList >= counter.maxWaitingList
    )
  }
  return undefined // never should be here
})

const availableSubscribers = computed<string>(() => {
  const counter = eventCounter.value
  if (counter) {
    return subscribersText(eventCounter.value)
  }
  return '-' // never should be here
})
</script>

import { computed, ref } from 'vue'
import { $fetch } from 'ohmyfetch'
import { EventCounter } from '@/models'

const counterPath =
  import.meta.env.VITE_BACKEND_API +
  '/events/counter?beta=' +
  import.meta.env.VITE_BETA

const _counters = ref<EventCounter[]>()

let fetching = false

export const counters = computed(() => _counters.value)

export function updateCounters(
  counters: undefined | EventCounter[] = undefined
) {
  if (counters != undefined) {
    _counters.value = counters
    return
  }
  if (fetching) {
    return
  }
  fetching = true
  $fetch<EventCounter[]>(counterPath).then((response) => {
    _counters.value = response
    fetching = false
  })
}

export function availableSubscribers(counter: EventCounter): string {
  const value =
    counter.max_subscribers === -1
      ? -1
      : counter.max_subscribers - Math.min(counter.subscribers, counter.max_subscribers)
  if (value === -1) {
    return 'Freie Plätze verfügbar'
  } else if (value === 1) {
    return 'Noch 1 freier Platz'
  } else if (value > 1) {
    return 'Noch ' + value + ' freie Plätze'
  }
  return 'Die Warteliste ist geöffnet'
}

import { ref, computed } from '@vue/composition-api'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

const notification = ref()
const notificationType = ref('info')
const eventsCounter = ref([])

export function useStore() {
  function showInfo(message) {
    notificationType.value = 'info'
    notification.value = message
  }

  function showError(message) {
    notificationType.value = 'error'
    notification.value = message
  }

  function hideNotification(value) {
    notification.value = undefined
  }

  function updateEventsCounter(counter) {
    eventsCounter.value = counter
  }

  return {
    showInfo,
    showError,
    hideNotification,
    updateEventsCounter,
    notificationMessage: computed(() => notification.value),
    notificationType: computed(() => notificationType.value),
    eventsCounter: computed(() => eventsCounter.value),
  }
}

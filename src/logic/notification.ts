import { ref } from 'vue'
import { Notification, NotificationType } from '@/models'

export const notification = ref<Notification>()

export function showInfo(message: string) {
  notification.value = { type: NotificationType.Info, message }
}

export function showError(message: string) {
  notification.value = { type: NotificationType.Error, message }
}

export function hideNotification() {
  notification.value = undefined
}

export function notify(title: string, message: string, error = false) {
  document.dispatchEvent(
    new CustomEvent('show-notification', {
      detail: {
        title,
        message,
        error,
      },
    }),
  )
}

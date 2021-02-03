export function toSubscribers(value) {
  if (value === -1) {
    return 'Freie Plätze verfügbar'
  } else if (value === 1) {
    return 'Noch 1 freier Platz'
  } else if (value > 1) {
    return 'Noch ' + value + ' freie Plätze'
  }
  return 'Die Warteliste ist geöffnet'
}

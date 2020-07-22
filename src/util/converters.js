export function toCurrency(value) {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  })
  return formatter.format(value)
}

export function toDate(value) {
  const formatter = new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  })
  return formatter.format(new Date(value + ':00.000Z')) + ' Uhr'
}

export function toDuration(value) {
  let hours = 0
  let minutes = 0
  while (value > 0) {
    if (value >= 60) {
      hours++
      value -= 60
    } else {
      minutes = value
      value = 0
    }
  }
  let string = ''
  if (hours > 1) {
    string += hours + ' Stunden'
  } else if (hours > 0) {
    string += hours + ' Stunde'
  }
  if (string && minutes > 0) {
    string += ' und '
  }
  if (minutes > 0) {
    string += minutes + ' Minuten'
  }
  return string
}

export function toSubscribers(value) {
  if (value === -1) {
    return 'Freie Plätze verfügbar'
  } else if (value > 1) {
    return 'Noch ' + value + ' freie Plätze'
  } else if (value === 1) {
    return 'Noch 1 freier Platz'
  }
  return 'Die Warteliste ist geöffnet'
}

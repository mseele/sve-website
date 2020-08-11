const moment = require('moment')
const numeral = require('numeral')
require('numeral/locales/de')

moment.locale('de')

numeral.locale('de')
numeral.localeData('de').delimiters.thousands = '.'

function toCurrency(value) {
  if (typeof value !== 'number') {
    return value
  }
  return numeral(value).format('0,0[.]00 $')
}

function toDate(value) {
  return moment(value).format('dd, DD. MMM YYYY H:mm') + ' Uhr'
}

function toDuration(value) {
  const duration = moment.duration(value, 'minutes')
  let hours = duration.hours()
  let minutes = duration.minutes()
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

function toDatespan(appointment) {
  const pattern = 'dd, D. MMM YYYY'
  if (appointment.startDate && appointment.endDate) {
    const start = moment(appointment.startDate)
    const end = moment(appointment.endDate)
    if (isEqualDate(start, end)) {
      return start.format(pattern)
    }
    return start.format(pattern) + ' - ' + end.format(pattern)
  }
  const start = moment(appointment.startDateTime)
  const end = moment(appointment.endDateTime)
  if (
    isEqualDate(start, end) ||
    isEqualDate(start, end.clone().subtract(1, 'minutes'))
  ) {
    return start.format(pattern)
  }
  return start.format(pattern) + ' - ' + end.format(pattern)
}

function isEqualDate(start, end) {
  return (
    start.date() === end.date() &&
    start.month() === end.month() &&
    start.year() === end.year()
  )
}

function toTimespan(appointment) {
  if (appointment.startDate && appointment.endDate) {
    return 'ganztägig'
  }
  const pattern = 'H:mm'
  const start = moment(appointment.startDateTime)
  const end = moment(appointment.endDateTime)
  return start.format(pattern) + ' - ' + end.format(pattern) + ' Uhr'
}

module.exports = {
  toCurrency: toCurrency,
  toDate: toDate,
  toDuration: toDuration,
  toDatespan: toDatespan,
  toTimespan: toTimespan,
}

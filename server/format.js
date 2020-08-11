const moment = require('moment')
moment.locale('de')

function toDatespan(appointment) {
  const pattern = 'dd, D.MM.YYYY'
  if (appointment.startDate && appointment.endDate) {
    if (appointment.startDate === appointment.endDate) {
      moment(appointment.startDate).format(pattern)
    }
    const start = moment(appointment.startDate)
    const end = moment(appointment.endDate)
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
  toDatespan: toDatespan,
  toTimespan: toTimespan,
}

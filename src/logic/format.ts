import moment, { Moment } from 'moment'
import numeral from 'numeral'
import 'numeral/locales/de'
import { RawAppointment } from '@/models'

moment.locale('de')

numeral.locale('de')
numeral.localeData('de').delimiters.thousands = '.'

const DATE_PATTERN = 'dd., D. MMM YYYY'
const TIME_PATTERN = 'H:mm'

export function toCurrency(value: number): string {
  if (typeof value !== 'number') {
    return value
  }
  return numeral(value).format('0,0[.]00 $')
}

export function toDate(value: string): string {
  return moment(value).format(DATE_PATTERN + ', ' + TIME_PATTERN) + ' Uhr'
}

export function toDuration(value: number): string {
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

export function toDatespan(appointment: RawAppointment): string {
  if (appointment.startDate && appointment.endDate) {
    const start = moment(appointment.startDate)
    const end = moment(appointment.endDate)
    if (isEqualDate(start, end)) {
      return start.format(DATE_PATTERN)
    }
    return start.format(DATE_PATTERN) + ' - ' + end.format(DATE_PATTERN)
  }
  const start = moment(appointment.startDateTime)
  const end = moment(appointment.endDateTime)
  if (
    isEqualDate(start, end) ||
    isEqualDate(start, end.clone().subtract(1, 'minutes'))
  ) {
    return start.format(DATE_PATTERN)
  }
  return start.format(DATE_PATTERN) + ' - ' + end.format(DATE_PATTERN)
}

function isEqualDate(start: Moment, end: Moment) {
  return (
    start.date() === end.date() &&
    start.month() === end.month() &&
    start.year() === end.year()
  )
}

export function toTimespan(appointment: RawAppointment) {
  if (appointment.startDate && appointment.endDate) {
    return 'ganztägig'
  }
  const start = moment(appointment.startDateTime)
  const end = moment(appointment.endDateTime)
  return start.format(TIME_PATTERN) + ' - ' + end.format(TIME_PATTERN) + ' Uhr'
}

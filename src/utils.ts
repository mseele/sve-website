import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import moment, { type Moment } from 'moment'
import type { RawAppointment } from './types'

const DATE_PATTERN = 'd. MMMM yyyy'
const LONG_DATE_PATTERN = 'dd., D. MMM YYYY'
const TIME_PATTERN = 'H:mm'

moment.locale('de')

export function formatDate(date: Date) {
  return format(date, DATE_PATTERN, { locale: de })
}

export function formatDatespan(appointment: RawAppointment): string {
  if (appointment.start_date && appointment.end_date) {
    const start = moment(appointment.start_date)
    const end = moment(appointment.end_date)
    if (isEqualDate(start, end)) {
      return start.format(LONG_DATE_PATTERN)
    }
    return start.format(LONG_DATE_PATTERN) + ' - ' + end.format(LONG_DATE_PATTERN)
  }
  const start = moment(appointment.start_date_time)
  const end = moment(appointment.end_date_time)
  if (isEqualDate(start, end) || isEqualDate(start, end.clone().subtract(1, 'minutes'))) {
    return start.format(LONG_DATE_PATTERN)
  }
  return start.format(LONG_DATE_PATTERN) + ' - ' + end.format(LONG_DATE_PATTERN)
}

function isEqualDate(start: Moment, end: Moment) {
  return start.date() === end.date() && start.month() === end.month() && start.year() === end.year()
}

export function formatTimespan(appointment: RawAppointment) {
  if (appointment.start_date && appointment.end_date) {
    return 'ganztägig'
  }
  const start = moment(appointment.start_date_time)
  const end = moment(appointment.end_date_time)
  return start.format(TIME_PATTERN) + ' - ' + end.format(TIME_PATTERN) + ' Uhr'
}

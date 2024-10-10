import { differenceInMinutes, format, isSameDay, parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { de } from 'date-fns/locale'
import type { RawAppointment } from './types'

const DATE_PATTERN = 'd. MMMM yyyy'
const LONG_DATE_PATTERN = 'eee, d. MMM yyyy'
const TIME_PATTERN = 'H:mm'

export function formatDate(date: Date) {
  return format(date, DATE_PATTERN, { locale: de })
}

export function formatDatetime(value: string): string {
  return `${formatInTimeZone(value, 'UTC', `${LONG_DATE_PATTERN}, ${TIME_PATTERN}`, { locale: de })} Uhr`
}

export function formatDatespan(appointment: RawAppointment): string {
  if (appointment.start_date && appointment.end_date) {
    const start = parseISO(appointment.start_date)
    const end = parseISO(appointment.end_date)
    if (isSameDay(start, end)) {
      return format(start, LONG_DATE_PATTERN, { locale: de })
    }
    return `${format(start, LONG_DATE_PATTERN, { locale: de })} - ${format(end, LONG_DATE_PATTERN, { locale: de })}`
  }
  if (appointment.start_date_time && appointment.end_date_time) {
    const start = parseISO(appointment.start_date_time)
    const end = parseISO(appointment.end_date_time)

    if (isSameDay(start, end) || differenceInMinutes(end, start) === 1) {
      return format(start, LONG_DATE_PATTERN)
    }
    return format(start, LONG_DATE_PATTERN) + ' - ' + format(end, LONG_DATE_PATTERN)
  }
  throw new Error('Appointment has no start or end date')
}

export function formatTimespan(appointment: RawAppointment) {
  if (appointment.start_date && appointment.end_date) {
    return 'ganztägig'
  }
  if (appointment.start_date_time && appointment.end_date_time) {
    const start = parseISO(appointment.start_date_time)
    const end = parseISO(appointment.end_date_time)
    return `${format(start, TIME_PATTERN, { locale: de })} - ${format(end, TIME_PATTERN, { locale: de })} Uhr`
  }
  throw new Error('Appointment has no start or end date time')
}

export function formatDuration(value: number): string {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
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

export function formatCurrency(value: number): string {
  if (typeof value !== 'number' && Number.isNaN(Number(value))) {
    return value
  }
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value)
}

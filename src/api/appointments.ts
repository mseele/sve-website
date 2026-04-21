import { formatDatespan, formatTimespan } from '@/utils'
import type { RawAppointment, Appointment } from '@/types'
import { BACKEND_API } from 'astro:env/client'

function bySortIndex(a: RawAppointment, b: RawAppointment) {
  return a.sort_index - b.sort_index
}

function toAppointment(appointment: RawAppointment): Appointment {
  let startISO: string | undefined
  let endISO: string | undefined
  if (appointment.start_date_time) {
    startISO = appointment.start_date_time
    endISO = appointment.end_date_time
  } else if (appointment.start_date) {
    startISO = appointment.start_date
    endISO = appointment.end_date
  }
  return {
    date: formatDatespan(appointment),
    time: formatTimespan(appointment),
    title: appointment.title || '-',
    description: appointment.description,
    link: appointment.link,
    startDateISO: startISO,
    endDateISO: endISO,
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  const response = await fetch(`${BACKEND_API}/calendar/appointments`)
  if (!response.ok) {
    throw new Error(`Failed to load appointments: ${response.status} ${response.statusText}`)
  }
  const appointments: RawAppointment[] = await response.json()
  return appointments.sort(bySortIndex).map(toAppointment)
}

import { formatDatespan, formatTimespan } from '@/utils'
import type { RawAppointment, Appointment } from '@/types'
import { BACKEND_API } from "astro:env/client"

function bySortIndex(a: RawAppointment, b: RawAppointment) {
  return a.sort_index - b.sort_index
}

function toAppointment(appointment: RawAppointment): Appointment {
  return {
    date: formatDatespan(appointment),
    time: formatTimespan(appointment),
    title: appointment.title || '-',
    description: appointment.description,
    link: appointment.link
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  const appointments = await fetch(
    `${BACKEND_API}/calendar/appointments`
  ).then((res): Promise<RawAppointment[]> => res.json())
  return appointments.sort(bySortIndex).map(toAppointment)
}

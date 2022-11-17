import { $fetch } from 'ohmyfetch'
import { withCache } from '@/logic/cache'
import { toDatespan, toTimespan } from '@/logic/format'
import { RawAppointment, Appointment } from '@/models'

const appointmentsPath =
  import.meta.env.VITE_BACKEND_API + '/calendar/appointments'

function bySortIndex(a: RawAppointment, b: RawAppointment) {
  return a.sort_index - b.sort_index
}

function toAppointment(appointment: RawAppointment): Appointment {
  return {
    date: toDatespan(appointment),
    time: toTimespan(appointment),
    title: appointment.title || '-',
    description: appointment.description,
    link: appointment.link,
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  let appointments = await withCache<Appointment[]>('appointments', async () => {
    const appointments = await $fetch<RawAppointment[]>(appointmentsPath)
    return appointments.sort(bySortIndex).map(toAppointment)
  })
  return appointments.value
}

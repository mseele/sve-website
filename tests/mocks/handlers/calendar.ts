import { http, HttpResponse } from 'msw'
import { BACKEND_API } from '../backend'

export const CALENDAR_APPOINTMENTS_URL = `${BACKEND_API}/calendar/appointments`

export const rawAppointmentsFixture = [
  {
    id: 'a1',
    sort_index: 3,
    title: 'Pokalspiel',
    description: 'Austragung im heimischen Stadion',
    start_date_time: '2024-05-11T15:00:00',
    end_date_time: '2024-05-11T16:30:00',
  },
  {
    id: 'a0',
    sort_index: 1,
    title: 'Jahreshauptversammlung',
    start_date: '2024-01-15',
    end_date: '2024-01-15',
  },
]

export const calendarHandlers = [
  http.get(CALENDAR_APPOINTMENTS_URL, () => HttpResponse.json(rawAppointmentsFixture)),
]

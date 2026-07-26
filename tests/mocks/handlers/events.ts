import { http, HttpResponse } from 'msw'
import { BACKEND_API } from '../backend'

export const EVENTS_URL = `${BACKEND_API}/events`
export const EVENTS_COUNTER_URL = `${BACKEND_API}/events/counter`
export const EVENTS_BOOKING_URL = `${BACKEND_API}/events/booking`
export const prebookingUrl = (hash: string) => `${BACKEND_API}/events/prebooking/${hash}`
export const prebookingIbanUrl = (hash: string) => `${BACKEND_API}/events/prebooking/${hash}/iban`

export const rawEventFixture = {
  id: 'evt-1',
  type: 'Fitness',
  name: 'Rückenfit',
  sort_index: 1,
  short_description: 'Pilates für den Rücken',
  description: 'Ein sanfter Kurs',
  image: 'rueckenfit.jpg',
  light: true,
  dates: ['2024-04-08T18:00:00', '2024-04-15T18:00:00'],
  custom_date: null,
  duration_in_minutes: 60,
  max_subscribers: 12,
  max_waiting_list: 4,
  price_member: 40,
  price_non_member: 60,
  cost_per_date: null,
  location: 'Clubhaus',
  booking_template: 'fitness',
  payment_account: 'DE123',
  alt_booking_button_text: null,
  alt_email_address: null,
  external_operator: false,
  custom_fields: [{ id: 'cf-1', name: 'Rückenbeschwerden', type: 'Text' }],
  payment_method: 'SepaDirectDebit',
}

export const rawEventsFixture = [rawEventFixture]

export const rawCounterFixture = {
  id: 'evt-1',
  max_subscribers: 12,
  subscribers: 5,
  waiting_list: 0,
  max_waiting_list: 4,
}

export const bookingSuccessResponse = {
  success: true,
  message: 'Buchung bestätigt',
  counter: [rawCounterFixture],
}

export const bookingSuccessNoCounters = {
  success: true,
  message: 'Buchung bestätigt',
  counter: [],
}

export const prebookingSuccessResponse = {
  success: true,
  message: 'Pre-Buchung gültig',
  counter: [rawCounterFixture],
  requires_iban: true,
}

export const prebookingSuccessNoIbanResponse = {
  success: true,
  message: 'Pre-Buchung gültig',
  counter: [rawCounterFixture],
  requires_iban: false,
}

export const eventsHandlers = [
  http.get(`${EVENTS_URL}`, () => HttpResponse.json(rawEventsFixture)),
  http.get(`${EVENTS_COUNTER_URL}`, () => HttpResponse.json([rawCounterFixture])),
  http.post(`${EVENTS_BOOKING_URL}`, () => HttpResponse.json(bookingSuccessResponse)),
]

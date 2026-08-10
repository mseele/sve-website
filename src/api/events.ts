import {
  EventType,
  type Booking,
  type BookingResponse,
  type Event,
  type EventAvailability,
  type RawEvent,
  type RawEventCounter,
} from '@/types'
import { formatCurrency, formatDuration } from '@/utils'
import { reportError } from '@/client/rollbar'
import { BACKEND_API, PREVIEW } from 'astro:env/client'
import { parseISO, format, getDay } from 'date-fns'
import { de } from 'date-fns/locale'

/**
 * Four-state phase machine derived from {@link EventAvailability}. Tests pin
 * every transition; consumer sites must branch on this enum rather than
 * re-decoding the `-1` / `0` sentinels themselves, so a future sentinel change
 * (e.g. to `Infinity` or a `kind: 'unlimited'` discriminated field) either
 * moves every site together or fails a test.
 *
 * Lives in `src/api/events.ts` (not `src/types.ts`) so the browser `<script>`
 * bundles that import it as a runtime value do not pull `@/types` — and with
 * it the side-effectful `zod` import — into the client bundle.
 */
export enum AvailabilityState {
  /** Subscriber phase, no capacity limit (`max_subscribers === -1`). Sentinel `-1`. */
  Unlimited = 'unlimited',
  /** Subscriber phase, slots remaining. */
  Subscribing = 'subscribing',
  /** Subscribers full; waiting-list phase open. */
  WaitingList = 'waitingList',
  /** Subscribers full and waiting-list full. Terminal. */
  FullyBooked = 'fullyBooked',
}

/**
 * Canonical decode of the {@link EventAvailability} sentinel + phase switch
 * into a single {@link AvailabilityState}. This is the ONLY function that
 * should read `availableSlots === -1` or `availableSlots === 0`; everywhere
 * else derives through this predicate or {@link canSubscribe}.
 */
export function availabilityState(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): AvailabilityState {
  if (av.availableSlots === -1) {
    return AvailabilityState.Unlimited
  }
  if (av.isWaitingList) {
    return av.availableSlots > 0 ? AvailabilityState.WaitingList : AvailabilityState.FullyBooked
  }
  return av.availableSlots > 0 ? AvailabilityState.Subscribing : AvailabilityState.FullyBooked
}

/**
 * Whether the booking form is open for this event — `true` for the
 * `Unlimited` and `Subscribing` phases, `false` once the waiting-list or
 * fully-booked phases begin. Captures the "is booking open" question the
 * `Event.astro` consumer used to re-derive inline from two enum values; goes
 * through {@link availabilityState} so it never reads the sentinel directly.
 */
export function canSubscribe(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): boolean {
  const state = availabilityState(av)
  return state === AvailabilityState.Unlimited || state === AvailabilityState.Subscribing
}

export async function loadEvents(type: EventType): Promise<Event[]> {
  const response = await fetch(`${BACKEND_API}/events?type=${type}&beta=${PREVIEW}`)
  if (!response.ok) {
    throw new Error(`Failed to load events: ${response.status} ${response.statusText}`)
  }
  const events: RawEvent[] = await response.json()
  return await Promise.all(
    events
      .sort((a, b) => a.sort_index - b.sort_index)
      .filter((event) => event.type === type)
      .map<Promise<Event>>(async (event) => {
        return {
          id: event.id,
          name: event.name,
          image: `/src/assets/events/${event.image}`,
          sortIndex: event.sort_index,
          shortDescription: event.short_description,
          description: event.description,
          location: event.location,
          dates: event.custom_date ? [event.custom_date] : event.dates,
          datesDisplay: computeDatesDisplay(event.dates, event.custom_date),
          duration: durationPrefix(event.type) + formatDuration(event.duration_in_minutes),
          priceMember: formatCurrency(event.price_member),
          priceNonMember: formatCurrency(event.price_non_member),
          externalOperator: event.external_operator,
          altBookingButtonText: event.alt_booking_button_text || undefined,
          customFields: event.custom_fields.map((field) => ({
            name: field.name,
            type: field.type,
            minValue: field.min_value || undefined,
            maxValue: field.max_value || undefined,
          })),
          paymentMethod: event.payment_method,
        }
      }),
  )
}

function durationPrefix(type: EventType) {
  switch (type) {
    case EventType.Fitness:
      return 'Kurslänge: '
    case EventType.Events:
      return 'Eventlänge: ca. '
  }
}

function computeDatesDisplay(dates: string[], customDate?: string | null): string | undefined {
  if (customDate) {
    return customDate
  }
  if (dates.length === 0) {
    return undefined
  }

  try {
    if (dates.length === 1) {
      return format(parseISO(dates[0]), 'eee, d. MMM, H:mm', { locale: de }) + ' Uhr'
    }

    const first = parseISO(dates[0])
    const firstDay = getDay(first)
    const firstTime = format(first, 'H:mm')

    const allSamePattern = dates.every((dateStr) => {
      const d = parseISO(dateStr)
      return getDay(d) === firstDay && format(d, 'H:mm') === firstTime
    })

    if (allSamePattern) {
      const weekday = format(first, 'eee', { locale: de })
      return `${weekday}, ${firstTime} Uhr (${dates.length} Termine)`
    }

    return `${format(first, 'd. MMM, H:mm', { locale: de })} Uhr (+${dates.length - 1} weitere)`
  } catch {
    return dates.length === 1 ? dates[0] : `${dates[0]} (+${dates.length - 1} weitere)`
  }
}

export function convertToEventAvailability(counter: RawEventCounter): EventAvailability {
  const noLimit = counter.max_subscribers === -1
  const noMoreSubscriptions = counter.subscribers >= counter.max_subscribers
  const noMoreWaitingList = counter.waiting_list >= counter.max_waiting_list

  const availableSlots = noLimit
    ? -1
    : noMoreSubscriptions
      ? noMoreWaitingList
        ? 0
        : Math.max(0, counter.max_waiting_list - counter.waiting_list)
      : Math.max(0, counter.max_subscribers - counter.subscribers)

  const isWaitingList = !noLimit && noMoreSubscriptions

  return {
    availableSlots,
    isWaitingList,
    message: calculateAvailabilityMessage({ availableSlots, isWaitingList }),
  }
}

export function calculateAvailabilityMessage(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): string {
  switch (availabilityState(av)) {
    case AvailabilityState.Unlimited:
      return 'Freie Plätze verfügbar'
    case AvailabilityState.WaitingList:
      return 'Warteliste ist geöffnet'
    case AvailabilityState.Subscribing:
      return av.availableSlots === 1
        ? 'Noch 1 freier Platz'
        : `Noch ${av.availableSlots} freie Plätze`
    case AvailabilityState.FullyBooked:
      return 'Ausgebucht'
  }
}

export async function loadEventAvailability(
  id: string,
  callback: (availability: EventAvailability) => void,
) {
  loadEventsAvailability((record) => {
    const availability = record[id]
    if (availability) {
      callback(availability)
    }
  })
}

interface Cache {
  timestamp: number
  data: Record<string, EventAvailability>
}
const sessionStorageKey = 'eventAvailability'

export async function loadEventsAvailability(
  callback: (availability: Record<string, EventAvailability>) => void,
) {
  // Try to load availability from session storage
  const storage = sessionStorage.getItem(sessionStorageKey)
  if (storage) {
    try {
      const cache: Cache = JSON.parse(storage)
      // Only use cached availability if it is not older than 1 hour
      if (cache.timestamp > Date.now() - 3600000) {
        callback(cache.data)
      }
    } catch (e) {
      reportError(e, { query: 'parseEventAvailability sessionStorage' })
    }
  }

  // Fetch availability from backend
  const response = await fetch(`${BACKEND_API}/events/counter?beta=${PREVIEW}`)
  if (!response.ok) {
    throw new Error(`Failed to load event availability: ${response.status} ${response.statusText}`)
  }
  const counters: RawEventCounter[] = await response.json()
  processCounters(counters, callback)
}

function processCounters(
  counters: RawEventCounter[],
  callback: (availability: Record<string, EventAvailability>) => void,
) {
  const availability: Record<string, EventAvailability> = {}
  for (const counter of counters) {
    availability[counter.id] = convertToEventAvailability(counter)
  }
  callback(availability)

  // Store availability in session storage
  const cache: Cache = { timestamp: Date.now(), data: availability }
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(cache))
}

export async function bookEvent(
  formData: Booking,
  token: string,
  callback: (availability: EventAvailability) => void,
) {
  const response = await fetch(`${BACKEND_API}/events/booking`, {
    method: 'POST',
    body: JSON.stringify({ ...formData, token }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const data: BookingResponse = await response.json()
    if (data.counter.length > 0) {
      processCounters(data.counter, (record) => {
        const availability = record[formData.event_id]
        if (availability) {
          callback(availability)
        }
      })
    }
    return { success: data.success, message: data.message }
  }
  return {
    success: false,
    message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
  }
}

export async function prebooking(hash: string) {
  const response = await fetch(`${BACKEND_API}/events/prebooking/${hash}`)
  if (response.ok) {
    const data: BookingResponse = await response.json()
    return {
      success: data.success,
      message: data.message,
      requires_iban: data.requires_iban || false,
    }
  }
  return {
    success: false,
    message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
  }
}

export async function prebookWithIban(hash: string, iban: string) {
  const response = await fetch(`${BACKEND_API}/events/prebooking/${hash}/iban`, {
    method: 'POST',
    body: JSON.stringify({ iban }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const data: BookingResponse = await response.json()
    return { success: data.success, message: data.message }
  }
  return {
    success: false,
    message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
  }
}

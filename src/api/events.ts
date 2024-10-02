import {
  EventType,
  type Booking,
  type BookingResponse,
  type Event,
  type EventAvailability,
  type RawEvent,
  type RawEventCounter,
} from '@/types'
import { formatCurrency, formatDatetime, formatDuration } from '@/utils'
import { BACKEND_API, PREVIEW } from 'astro:env/client'

export async function loadEvents(type: EventType): Promise<Event[]> {
  const events: RawEvent[] = await fetch(`${BACKEND_API}/events?type=${type}&beta=${PREVIEW}`).then(
    (response) => response.json(),
  )
  return await Promise.all(
    events
      .sort((a, b) => a.sort_index - b.sort_index)
      .filter((event) => event.type === type)
      .map<Promise<Event>>(async (event) => {
        let dates: string[]
        if (event.custom_date) {
          dates = [event.custom_date]
        } else {
          dates = event.dates.map((date) => formatDatetime(date))
        }

        return {
          id: event.id,
          name: event.name,
          image: `src/assets/events/${event.image}`,
          shortDescription: event.short_description,
          description: event.description,
          location: event.location,
          dates,
          duration: durationPrefix(event.type) + formatDuration(event.duration_in_minutes),
          priceMember: formatCurrency(event.price_member),
          priceNonMember: formatCurrency(event.price_non_member),
          externalOperator: event.external_operator,
          altBookingButtonText: event.alt_booking_button_text || undefined,
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

function convertToEventAvailability(counter: RawEventCounter): EventAvailability {
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
    message: calculateAvailabilityMessage(availableSlots, isWaitingList),
  }
}

function calculateAvailabilityMessage(availableSlots: number, isWaitingList: boolean): string {
  if (availableSlots === -1) {
    return 'Freie Plätze verfügbar'
  }
  if (isWaitingList && availableSlots > 0) {
    return 'Warteliste ist geöffnet'
  }
  if (availableSlots === 1) {
    return 'Noch 1 freier Platz'
  } else if (availableSlots > 1) {
    return `Noch ${availableSlots} freie Plätze`
  }
  return 'Ausgebucht'
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
      console.error('Error while parsing event availability from session storage', e)
    }
  }

  // Fetch availability from backend
  const counters: RawEventCounter[] = await fetch(
    `${BACKEND_API}/events/counter?beta=${PREVIEW}`,
  ).then((response) => response.json())
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
  callback: (availability: EventAvailability) => void,
) {
  const response = await fetch(`${BACKEND_API}/events/booking`, {
    method: 'POST',
    body: JSON.stringify(formData),
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
    return { success: data.success, message: data.message }
  }
  return {
    success: false,
    message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
  }
}

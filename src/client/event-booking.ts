import { BACKEND_API, PREVIEW } from 'astro:env/client'
import { convertToEventAvailability } from '@/domain/availability'
import { reportError } from '@/client/rollbar'
import type { Booking, BookingResponse, EventAvailability, RawEventCounter } from '@/types'

/**
 * Browser adapter for event availability and booking. Imported by the
 * `<script>` bundles in `Event.astro`, `Events.astro` and `PreBooking.astro`,
 * so it must stay free of Zod and server-only loaders (see
 * `tests/architecture/browser-imports.test.ts`).
 */

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

import { BACKEND_API, PREVIEW } from 'astro:env/client'
import { parseISO, format, getDay } from 'date-fns'
import { de } from 'date-fns/locale'
import { EventType } from '@/domain/events'
import type { Event, RawEvent } from '@/types'
import { formatCurrency, formatDuration } from '@/utils'

/**
 * Build-time loader for the `events` / `fitness` content collections
 * (`src/content.config.ts`). Server-only: never import from a browser
 * `<script>` bundle — the client booking adapter lives in
 * `src/client/event-booking.ts` (see `tests/architecture/browser-imports.test.ts`).
 */
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

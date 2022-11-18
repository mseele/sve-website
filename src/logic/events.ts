import { $fetch } from 'ohmyfetch'
import { withCache } from '@/logic/cache'
import { toDate, toDuration, toCurrency } from '@/logic/format'
import { RawEvent, Event, EventType } from '@/models'

const eventsPath =
  import.meta.env.VITE_BACKEND_API + '/events?beta=' + import.meta.env.VITE_BETA

function bySortIndex(a: RawEvent, b: RawEvent) {
  return a.sort_index - b.sort_index
}

function toEvent(event: RawEvent): Event {
  let dates
  if (event.custom_date) {
    dates = [event.custom_date]
  } else {
    dates = event.dates.map((date) => toDate(date))
  }

  return {
    id: event.id,
    name: event.name,
    image: event.image,
    light: event.light,
    shortDescription: event.short_description,
    description: event.description,
    location: event.location,
    dates,
    duration: durationPrefix(event.type) + toDuration(event.duration_in_minutes),
    costMember: toCurrency(event.cost_member),
    costNonMember: toCurrency(event.cost_non_member),
    externalOperator: event.external_operator,
    altBookingButtonText: event.alt_booking_button_text,
  }
}

function durationPrefix(type: EventType) {
  switch (type) {
    case EventType.Fitness:
      return 'Kurslänge: '
    case EventType.Events:
      return 'Eventlänge: ca. '
  }
}

export async function getEvents(type: EventType): Promise<Event[]> {
  let events = await withCache<RawEvent[]>('events', async () => {
    const events = await $fetch<RawEvent[]>(eventsPath)
    return events.sort(bySortIndex)
  })
  return events.value.filter((e) => e.type == type).map(toEvent)
}

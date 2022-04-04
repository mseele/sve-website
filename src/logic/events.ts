import { $fetch } from 'ohmyfetch'
import { withCache } from '@/logic/cache'
import { toDate, toDuration, toCurrency } from '@/logic/format'
import { RawEvent, Event, EventType } from '@/models'

const eventsPath =
  import.meta.env.VITE_BACKEND_API + '/events?beta=' + import.meta.env.VITE_BETA

function bySortIndex(a: RawEvent, b: RawEvent) {
  return a.sortIndex - b.sortIndex
}

function toEvent(event: RawEvent): Event {
  let dates
  if (event.customDate) {
    dates = [event.customDate]
  } else {
    dates = event.dates.map((date) => toDate(date))
  }

  return {
    id: event.id,
    name: event.name,
    image: event.image,
    light: event.light,
    shortDescription: event.shortDescription,
    description: event.description,
    location: event.location,
    dates,
    duration: durationPrefix(event.type) + toDuration(event.durationInMinutes),
    costMember: toCurrency(event.costMember),
    costNonMember: toCurrency(event.costNonMember),
    externalOperator: event.externalOperator,
    altBookingButtonText: event.altBookingButtonText,
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

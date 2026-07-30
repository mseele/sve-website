import { afterEach, describe, expect, it, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { EventType, type Booking } from '@/types'
import {
  AvailabilityState,
  availabilityState,
  bookEvent,
  loadEventAvailability,
  loadEvents,
  loadEventsAvailability,
  prebooking,
  prebookWithIban,
} from '@/api/events'
import { server } from '../mocks/server'
import {
  EVENTS_BOOKING_URL,
  EVENTS_COUNTER_URL,
  EVENTS_URL,
  bookingSuccessNoCounters,
  bookingSuccessResponse,
  prebookingIbanUrl,
  prebookingSuccessNoIbanResponse,
  prebookingSuccessResponse,
  prebookingUrl,
  rawCounterFixture,
  rawEventFixture,
} from '../mocks/handlers/events'

vi.mock('astro:env/client', async (importOriginal) => {
  const orig = await importOriginal<typeof import('astro:env/client')>()
  return {
    ...orig,
    get PREVIEW(): boolean {
      return (import.meta.env.PREVIEW as unknown as boolean | undefined) ?? false
    },
  }
})

const EVENT_ID = 'evt-1'

afterEach(() => {
  vi.unstubAllEnvs()
  sessionStorage.clear()
})

const sampleBooking: Booking = {
  event_id: EVENT_ID,
  first_name: 'Lisa',
  last_name: 'Müller',
  street: 'Hauptstr. 1',
  city: 'Eutingen',
  email: 'lisa@example.org',
  phone: '01761234567',
  member: true,
  updates: false,
  comments: 'keine',
  custom_values: [],
}

const expectedAvailabilityForFixture = {
  availableSlots: 7,
  isWaitingList: false,
  message: 'Noch 7 freie Plätze',
}

describe('loadEvents — fetch wrapper', () => {
  it('maps RawEvent[] to Event[] with the calendar-aware shape', async () => {
    const result = await loadEvents(EventType.Fitness)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 'evt-1',
      name: 'Rückenfit',
      image: '/src/assets/events/fit.jpg',
      sortIndex: 1,
      shortDescription: 'Pilates für den Rücken',
      description: 'Ein sanfter Kurs',
      location: 'Clubhaus',
      dates: ['2024-04-08T18:00:00', '2024-04-15T18:00:00'],
      datesDisplay: expect.any(String),
      duration: 'Kurslänge: 1 Stunde',
      priceMember: '40,00\u00A0€',
      priceNonMember: '60,00\u00A0€',
      externalOperator: false,
      altBookingButtonText: undefined,
      customFields: [
        { name: 'Rückenbeschwerden', type: 'Text', minValue: undefined, maxValue: undefined },
      ],
      paymentMethod: 'SepaDirectDebit',
    })
  })

  it('keeps only events whose `type` matches the requested type', async () => {
    server.use(
      http.get(EVENTS_URL, () =>
        HttpResponse.json([
          rawEventFixture,
          { ...rawEventFixture, id: 'evt-2', type: 'Events', sort_index: 2 },
        ]),
      ),
    )
    const result = await loadEvents(EventType.Fitness)
    expect(result.map((e) => e.id)).toEqual(['evt-1'])
  })

  it('sorts events ascending by sort_index before mapping', async () => {
    server.use(
      http.get(EVENTS_URL, () =>
        HttpResponse.json([
          { ...rawEventFixture, id: 'evt-b', sort_index: 5 },
          { ...rawEventFixture, id: 'evt-a', sort_index: 1 },
        ]),
      ),
    )
    const result = await loadEvents(EventType.Fitness)
    expect(result.map((e) => e.id)).toEqual(['evt-a', 'evt-b'])
  })

  it('ships a stable datesDisplay for a single-date event (custom_date passthrough)', async () => {
    server.use(
      http.get(EVENTS_URL, () =>
        HttpResponse.json([{ ...rawEventFixture, custom_date: 'Individuell' }]),
      ),
    )
    expect((await loadEvents(EventType.Fitness))[0].datesDisplay).toBe('Individuell')
  })

  it('throws a descriptive error on non-2xx (500)', async () => {
    server.use(http.get(EVENTS_URL, () => HttpResponse.json({ msg: 'boom' }, { status: 500 })))
    await expect(loadEvents(EventType.Fitness)).rejects.toThrow(
      'Failed to load events: 500 Internal Server Error',
    )
  })

  describe('PREVIEW query branch (vi.stubEnv)', () => {
    it('sends beta=false by default (the .env default)', async () => {
      let capturedRequest: Request | undefined
      server.use(
        http.get(EVENTS_URL, ({ request }) => {
          capturedRequest = request
          return HttpResponse.json([])
        }),
      )

      await loadEvents(EventType.Fitness)

      const url = new URL(capturedRequest!.url)
      expect(url.pathname).toBe('/api/events')
      expect(url.searchParams.get('type')).toBe('Fitness')
      expect(url.searchParams.get('beta')).toBe('false')
    })

    it('sends beta=true when PREVIEW is stubbed true', async () => {
      vi.stubEnv('PREVIEW', 'true')
      let capturedRequest: Request | undefined
      server.use(
        http.get(EVENTS_URL, ({ request }) => {
          capturedRequest = request
          return HttpResponse.json([])
        }),
      )

      await loadEvents(EventType.Events)

      const url = new URL(capturedRequest!.url)
      expect(url.pathname).toBe('/api/events')
      expect(url.searchParams.get('type')).toBe('Events')
      expect(url.searchParams.get('beta')).toBe('true')
    })
  })
})

describe('loadEventsAvailability — fetch + sessionStorage cache', () => {
  it('on a cache miss, fetches counters, invokes callback with fresh data and writes the cache', async () => {
    const callback = vi.fn()
    await loadEventsAvailability(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    const record = callback.mock.calls[0][0]
    expect(record[EVENT_ID]).toEqual(expectedAvailabilityForFixture)

    const stored = sessionStorage.getItem('eventAvailability')
    expect(stored).not.toBeNull()
    const cache = JSON.parse(stored!)
    expect(cache.data[EVENT_ID]).toEqual(expectedAvailabilityForFixture)
    expect(typeof cache.timestamp).toBe('number')
  })

  it('on a fresh cache hit, invokes callback with cached data first, then with refreshed data', async () => {
    const seeded = {
      timestamp: Date.now() - 1000,
      data: { other: { availableSlots: 1, isWaitingList: false, message: 'cached' } },
    }
    sessionStorage.setItem('eventAvailability', JSON.stringify(seeded))

    const callback = vi.fn()
    await loadEventsAvailability(callback)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback.mock.calls[0][0]).toEqual(seeded.data)
    expect(callback.mock.calls[1][0][EVENT_ID]).toEqual(expectedAvailabilityForFixture)

    const stored = JSON.parse(sessionStorage.getItem('eventAvailability')!)
    expect(stored.data[EVENT_ID]).toEqual(expectedAvailabilityForFixture)
  })

  it('on a stale cache (older than 1 hour), skips the cached callback and only delivers the fetched data', async () => {
    const stale = {
      timestamp: Date.now() - 3600000 - 1,
      data: { stale: { availableSlots: 9, isWaitingList: false, message: 'stale' } },
    }
    sessionStorage.setItem('eventAvailability', JSON.stringify(stale))

    const callback = vi.fn()
    await loadEventsAvailability(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0][EVENT_ID]).toEqual(expectedAvailabilityForFixture)
    expect(callback.mock.calls[0][0].stale).toBeUndefined()
  })

  it('on a corrupt cache JSON, logs an error and still delivers the fetched data', async () => {
    sessionStorage.setItem('eventAvailability', '{not json')
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const callback = vi.fn()
    await loadEventsAvailability(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0][EVENT_ID]).toEqual(expectedAvailabilityForFixture)
    expect(errorSpy).toHaveBeenCalledWith(
      'Error while parsing event availability from session storage',
      expect.any(Error),
    )
    errorSpy.mockRestore()
  })

  it('throws a descriptive error when the backend returns a non-2xx', async () => {
    server.use(http.get(EVENTS_COUNTER_URL, () => HttpResponse.json({}, { status: 503 })))
    await expect(loadEventsAvailability(() => {})).rejects.toThrow(
      'Failed to load event availability: 503 Service Unavailable',
    )
  })

  it('sends the counter endpoint URL with the PREVIEW-flagged `beta` query param', async () => {
    let capturedRequest: Request | undefined
    server.use(
      http.get(EVENTS_COUNTER_URL, ({ request }) => {
        capturedRequest = request
        return HttpResponse.json([])
      }),
    )

    await loadEventsAvailability(() => {})

    const url = new URL(capturedRequest!.url)
    expect(url.pathname).toBe('/api/events/counter')
    expect(url.searchParams.get('beta')).toBe('false')
  })
})

describe('loadEventAvailability — single-id convenience wrapper around loadEventsAvailability', () => {
  it('delivers availability for the matching event id only', async () => {
    const callback = vi.fn()
    await loadEventAvailability(EVENT_ID, callback)
    await vi.waitFor(() => expect(callback).toHaveBeenCalledTimes(1))
    expect(callback.mock.calls[0][0]).toEqual(expectedAvailabilityForFixture)
    expect(availabilityState(callback.mock.calls[0][0])).toBe(AvailabilityState.Subscribing)
  })

  it('does not invoke the callback when the fetched record does not include the requested id', async () => {
    const callback = vi.fn()
    await loadEventAvailability('missing', callback)
    await vi.waitFor(() => expect(callback).not.toHaveBeenCalled())
  })

  it('delivers the cached record for the matching id, then the refreshed record', async () => {
    const seeded = {
      timestamp: Date.now() - 500,
      data: { [EVENT_ID]: { availableSlots: 1, isWaitingList: false, message: 'cached' } },
    }
    sessionStorage.setItem('eventAvailability', JSON.stringify(seeded))

    const callback = vi.fn()
    await loadEventAvailability(EVENT_ID, callback)
    await vi.waitFor(() => expect(callback).toHaveBeenCalledTimes(2))
    expect(callback.mock.calls[0][0]).toEqual(seeded.data[EVENT_ID])
    expect(callback.mock.calls[1][0]).toEqual(expectedAvailabilityForFixture)
  })

  it('failure path: callback never invoked when the underlying fetch returns non-2xx', async () => {
    server.use(http.get(EVENTS_COUNTER_URL, () => HttpResponse.json({}, { status: 503 })))

    const swallow = () => {}
    const priorListeners = process.listeners('unhandledRejection')
    process.removeAllListeners('unhandledRejection')
    process.on('unhandledRejection', swallow)
    try {
      const callback = vi.fn()
      await loadEventAvailability(EVENT_ID, callback)
      await new Promise((resolve) => setTimeout(resolve, 0))
      await vi.waitFor(() => expect(callback).not.toHaveBeenCalled())
    } finally {
      process.off('unhandledRejection', swallow)
      for (const l of priorListeners) process.on('unhandledRejection', l)
    }
  })
})

describe('bookEvent — mutating POST booking route', () => {
  it('asserts request shape: URL, POST, Content-Type application/json, body is {...formData, token}', async () => {
    let capturedMethod: string | undefined = undefined
    let capturedContentType: string | null = null
    let capturedUrl: string | undefined = undefined
    let capturedBody: any = undefined
    server.use(
      http.post(EVENTS_BOOKING_URL, async ({ request }) => {
        capturedMethod = request.method
        capturedContentType = request.headers.get('Content-Type')
        capturedUrl = request.url
        capturedBody = await request.json()
        return HttpResponse.json(bookingSuccessResponse)
      }),
    )

    const callback = vi.fn()
    const result = await bookEvent(sampleBooking, 'token-abc', callback)

    expect(capturedMethod).toBe('POST')
    expect(new URL(capturedUrl!).pathname).toBe('/api/events/booking')
    expect(capturedContentType).toBe('application/json')
    expect(capturedBody).toEqual({ ...sampleBooking, token: 'token-abc' })
    expect(result).toEqual({ success: true, message: 'Buchung bestätigt' })
  })

  it('invokes the callback with the refreshed availability when the response counters include the booked event', async () => {
    const callback = vi.fn()
    const result = await bookEvent(sampleBooking, 'tok', callback)

    expect(result).toEqual({ success: true, message: 'Buchung bestätigt' })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0]).toEqual(expectedAvailabilityForFixture)
  })

  it('does not invoke the callback when the response counters omit the booked event id', async () => {
    server.use(
      http.post(EVENTS_BOOKING_URL, () =>
        HttpResponse.json({
          ...bookingSuccessResponse,
          counter: [{ ...rawCounterFixture, id: 'other' }],
        }),
      ),
    )

    const callback = vi.fn()
    const result = await bookEvent(sampleBooking, 'tok', callback)

    expect(result).toEqual({ success: true, message: 'Buchung bestätigt' })
    expect(callback).not.toHaveBeenCalled()
  })

  it('does not invoke the callback when the response counters array is empty', async () => {
    server.use(http.post(EVENTS_BOOKING_URL, () => HttpResponse.json(bookingSuccessNoCounters)))

    const callback = vi.fn()
    const result = await bookEvent(sampleBooking, 'tok', callback)

    expect(result).toEqual({ success: true, message: 'Buchung bestätigt' })
    expect(callback).not.toHaveBeenCalled()
  })

  it('returns the user-facing failure object on non-2xx (does not throw)', async () => {
    server.use(http.post(EVENTS_BOOKING_URL, () => HttpResponse.json({}, { status: 500 })))

    const callback = vi.fn()
    const result = await bookEvent(sampleBooking, 'tok', callback)

    expect(result).toEqual({
      success: false,
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
    })
    expect(callback).not.toHaveBeenCalled()
  })
})

describe('prebooking — GET pre-booking route', () => {
  it('returns the BookingResponse subset {success, message, requires_iban} on 2xx', async () => {
    server.use(
      http.get(prebookingUrl('hash-123'), () => HttpResponse.json(prebookingSuccessResponse)),
    )
    const result = await prebooking('hash-123')
    expect(result).toEqual({
      success: true,
      message: 'Pre-Buchung gültig',
      requires_iban: true,
    })
  })

  it('defaults requires_iban to false when the backend omits it', async () => {
    server.use(
      http.get(prebookingUrl('hash-456'), () => HttpResponse.json(prebookingSuccessNoIbanResponse)),
    )
    const result = await prebooking('hash-456')
    expect(result).toEqual({
      success: true,
      message: 'Pre-Buchung gültig',
      requires_iban: false,
    })
  })

  it('sends GET to /events/prebooking/:hash with no body (request shape)', async () => {
    let capturedMethod: string | undefined = undefined
    let capturedUrl: string | undefined = undefined
    let capturedBodyText: string | null = null
    server.use(
      http.get(prebookingUrl('hash-789'), async ({ request }) => {
        capturedMethod = request.method
        capturedUrl = request.url
        capturedBodyText = await request.text()
        return HttpResponse.json(prebookingSuccessResponse)
      }),
    )

    const result = await prebooking('hash-789')

    expect(capturedMethod).toBe('GET')
    expect(new URL(capturedUrl!).pathname).toBe('/api/events/prebooking/hash-789')
    expect(capturedBodyText).toBe('')
    expect(result).toEqual({
      success: true,
      message: 'Pre-Buchung gültig',
      requires_iban: true,
    })
  })

  it('returns the failure object when the backend responds non-2xx', async () => {
    server.use(http.get(prebookingUrl('bad'), () => HttpResponse.json({}, { status: 404 })))
    expect(await prebooking('bad')).toEqual({
      success: false,
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
    })
  })
})

describe('prebookWithIban — mutating POST iban route', () => {
  it('asserts request shape: URL, POST, Content-Type application/json, body is { iban }', async () => {
    let capturedMethod: string | undefined = undefined
    let capturedContentType: string | null = null
    let capturedUrl: string | undefined = undefined
    let capturedBody: any = undefined
    server.use(
      http.post(prebookingIbanUrl('hash-X'), async ({ request }) => {
        capturedMethod = request.method
        capturedContentType = request.headers.get('Content-Type')
        capturedUrl = request.url
        capturedBody = await request.json()
        return HttpResponse.json({ success: true, message: 'IBAN gespeichert' })
      }),
    )

    const result = await prebookWithIban('hash-X', 'DE89370400440532013000')

    expect(capturedMethod).toBe('POST')
    expect(new URL(capturedUrl!).pathname).toBe('/api/events/prebooking/hash-X/iban')
    expect(capturedContentType).toBe('application/json')
    expect(capturedBody).toEqual({ iban: 'DE89370400440532013000' })
    expect(result).toEqual({ success: true, message: 'IBAN gespeichert' })
  })

  it('returns only {success, message} even when the backend also returns requires_iban', async () => {
    server.use(
      http.post(prebookingIbanUrl('hash-Y'), () =>
        HttpResponse.json({ success: true, message: 'ok', requires_iban: true, counter: [] }),
      ),
    )
    expect(await prebookWithIban('hash-Y', 'DE89370400440532013000')).toEqual({
      success: true,
      message: 'ok',
    })
  })

  it('returns the failure object on non-2xx', async () => {
    server.use(http.post(prebookingIbanUrl('hash-Z'), () => HttpResponse.json({}, { status: 400 })))
    expect(await prebookWithIban('hash-Z', 'DE89370400440532013000')).toEqual({
      success: false,
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
    })
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { EventType } from '@/domain/events'
import { loadEvents } from '@/api/events-server'
import { server } from '../mocks/server'
import { EVENTS_URL, rawEventFixture } from '../mocks/handlers/events'

vi.mock('astro:env/client', async (importOriginal) => {
  const orig = await importOriginal<typeof import('astro:env/client')>()
  return {
    ...orig,
    get PREVIEW(): boolean {
      return (import.meta.env.PREVIEW as unknown as boolean | undefined) ?? false
    },
  }
})

afterEach(() => {
  vi.unstubAllEnvs()
})

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

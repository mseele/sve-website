import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { getAppointments } from '@/api/appointments'
import { server } from '../mocks/server'
import { CALENDAR_APPOINTMENTS_URL } from '../mocks/handlers/calendar'

describe('getAppointments — fetch wrapper', () => {
  it('sorts raw appointments ascending by sort_index and maps via toAppointment', async () => {
    const result = await getAppointments()

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Jahreshauptversammlung')
    expect(result[0].startDateISO).toBe('2024-01-15')
    expect(result[0].endDateISO).toBe('2024-01-15')
    expect(result[1].title).toBe('Pokalspiel')
    expect(result[1].startDateISO).toBe('2024-05-11T15:00:00')
  })

  it('returns an empty array when the backend responds with []', async () => {
    server.use(http.get(CALENDAR_APPOINTMENTS_URL, () => HttpResponse.json([])))
    expect(await getAppointments()).toEqual([])
  })

  it('throws a descriptive error on non-2xx (404)', async () => {
    server.use(
      http.get(CALENDAR_APPOINTMENTS_URL, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 }),
      ),
    )
    await expect(getAppointments()).rejects.toThrow('Failed to load appointments: 404 Not Found')
  })

  it('throws on a 500 response', async () => {
    server.use(
      http.get(CALENDAR_APPOINTMENTS_URL, () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }),
      ),
    )
    await expect(getAppointments()).rejects.toThrow(
      'Failed to load appointments: 500 Internal Server Error',
    )
  })

  it('hits the canonical calendar appointments endpoint with GET (request shape)', async () => {
    let capturedRequest: Request | undefined
    server.use(
      http.get(CALENDAR_APPOINTMENTS_URL, ({ request }) => {
        capturedRequest = request
        return HttpResponse.json([])
      }),
    )

    await getAppointments()

    expect(capturedRequest!.method).toBe('GET')
    expect(new URL(capturedRequest!.url).pathname).toBe('/api/calendar/appointments')
  })
})

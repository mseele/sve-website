import { describe, expect, it } from 'vitest'
import type { Appointment, RawAppointment } from '@/types'
import { bySortIndex, toAppointment } from '@/api/appointments'

const toNaiveIso = (year: number, month: number, day: number, hours = 0, minutes = 0) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${year}-${pad(month)}-${pad(day)}`
  return hours === 0 && minutes === 0 ? date : `${date}T${pad(hours)}:${pad(minutes)}:00`
}

const raw = (fields: Partial<RawAppointment>): RawAppointment => ({
  sort_index: 0,
  ...fields,
})

describe('toAppointment', () => {
  describe('date-only variant (start_date / end_date)', () => {
    it('passes start_date / end_date through as startDateISO / endDateISO', () => {
      const result = toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-18' }))
      expect(result.startDateISO).toBe('2024-01-15')
      expect(result.endDateISO).toBe('2024-01-18')
    })

    it('formats date and time for a single-day all-day appointment', () => {
      const result = toAppointment(
        raw({ start_date: '2024-01-15', end_date: '2024-01-15', title: 'Jahreshauptversammlung' }),
      )
      expect(result.date).toBe('Mo., 15. Jan. 2024')
      expect(result.time).toBe('ganztägig')
      expect(result.title).toBe('Jahreshauptversammlung')
    })

    it('formats a multi-day span', () => {
      const result = toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-18' }))
      expect(result.date).toBe('Mo., 15. Jan. 2024 - Do., 18. Jan. 2024')
      expect(result.time).toBe('ganztägig')
    })
  })

  describe('datetime variant (start_date_time / end_date_time)', () => {
    it('passes start_date_time / end_date_time through as startDateISO / endDateISO', () => {
      const result = toAppointment(
        raw({
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 16, 45),
        }),
      )
      expect(result.startDateISO).toBe(toNaiveIso(2024, 1, 15, 14, 30))
      expect(result.endDateISO).toBe(toNaiveIso(2024, 1, 15, 16, 45))
    })

    it('formats same-calendar-day datetime range', () => {
      const result = toAppointment(
        raw({
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 16, 45),
          title: 'Vorstandssitzung',
        }),
      )
      expect(result.date).toBe('Mon, 15. Jan 2024')
      expect(result.time).toBe('14:30 - 16:45 Uhr')
      expect(result.title).toBe('Vorstandssitzung')
    })

    it('1-minute difference collapses date span to a single day (tracer branch)', () => {
      const result = toAppointment(
        raw({
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 14, 31),
        }),
      )
      expect(result.date).toBe('Mon, 15. Jan 2024')
      expect(result.time).toBe('14:30 - 14:31 Uhr')
    })

    it('cross-midnight datetime span renders both endpoints', () => {
      const result = toAppointment(
        raw({
          start_date_time: toNaiveIso(2024, 1, 15, 23, 30),
          end_date_time: toNaiveIso(2024, 1, 16, 0, 30),
        }),
      )
      expect(result.date).toBe('Mon, 15. Jan 2024 - Tue, 16. Jan 2024')
      expect(result.time).toBe('23:30 - 0:30 Uhr')
    })
  })

  describe('ISO passthrough priority (datetime beats date)', () => {
    it('uses start_date_time over start_date when both are present', () => {
      const result = toAppointment(
        raw({
          start_date: '2024-01-15',
          end_date: '2024-01-15',
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 16, 45),
        }),
      )
      expect(result.startDateISO).toBe(toNaiveIso(2024, 1, 15, 14, 30))
      expect(result.endDateISO).toBe(toNaiveIso(2024, 1, 15, 16, 45))
    })

    it('falls back to start_date when datetime fields are absent', () => {
      const result = toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-18' }))
      expect(result.startDateISO).toBe('2024-01-15')
      expect(result.endDateISO).toBe('2024-01-18')
    })

    it('throws when neither date nor datetime range is present (date/time formatters run first)', () => {
      expect(() => toAppointment(raw({ title: 'Lost' }))).toThrow(
        'Appointment has no start or end date',
      )
    })
  })

  describe('field pass-through and fallbacks', () => {
    it('defaults title to "-" when title is missing', () => {
      expect(toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-15' })).title).toBe(
        '-',
      )
    })

    it('defaults title to "-" when title is the empty string', () => {
      expect(
        toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-15', title: '' })).title,
      ).toBe('-')
    })

    it('passes description through when present', () => {
      expect(
        toAppointment(
          raw({
            start_date: '2024-01-15',
            end_date: '2024-01-15',
            description: 'Treffen im Clubhaus',
          }),
        ).description,
      ).toBe('Treffen im Clubhaus')
    })

    it('passes link through when present', () => {
      expect(
        toAppointment(
          raw({
            start_date: '2024-01-15',
            end_date: '2024-01-15',
            link: 'https://example.org/event',
          }),
        ).link,
      ).toBe('https://example.org/event')
    })

    it('leaves description and link undefined when absent', () => {
      const result = toAppointment(raw({ start_date: '2024-01-15', end_date: '2024-01-15' }))
      expect(result.description).toBeUndefined()
      expect(result.link).toBeUndefined()
    })
  })

  describe('propagates formatter failure for appointment with no dates', () => {
    it('throws when neither date nor datetime range is present', () => {
      expect(() => toAppointment(raw({}))).toThrow('Appointment has no start or end date')
    })

    it('throws with only a start_date', () => {
      expect(() => toAppointment(raw({ start_date: '2024-01-15' }))).toThrow(
        'Appointment has no start or end date',
      )
    })

    it('throws with only a start_date_time (asymmetric datetime input — no fallback pairing)', () => {
      expect(() =>
        toAppointment(raw({ start_date_time: toNaiveIso(2024, 1, 15, 14, 30) })),
      ).toThrow('Appointment has no start or end date')
    })
  })

  it('produces a full Appointment shape for a representative input', () => {
    const result: Appointment = toAppointment(
      raw({
        sort_index: 3,
        title: 'Pokalspiel',
        description: 'Austragung im heimischen Stadion',
        link: 'https://sve-eutingen.de/spiel',
        start_date_time: toNaiveIso(2024, 5, 11, 15, 0),
        end_date_time: toNaiveIso(2024, 5, 11, 16, 30),
      }),
    )
    expect(result).toEqual({
      date: 'Sat, 11. May 2024',
      time: '15:00 - 16:30 Uhr',
      title: 'Pokalspiel',
      description: 'Austragung im heimischen Stadion',
      link: 'https://sve-eutingen.de/spiel',
      startDateISO: toNaiveIso(2024, 5, 11, 15, 0),
      endDateISO: toNaiveIso(2024, 5, 11, 16, 30),
    })
  })
})

describe('bySortIndex', () => {
  const cases: Array<[RawAppointment, RawAppointment, number]> = [
    [raw({ sort_index: 1 }), raw({ sort_index: 2 }), -1],
    [raw({ sort_index: 2 }), raw({ sort_index: 1 }), 1],
    [raw({ sort_index: 5 }), raw({ sort_index: 5 }), 0],
    [raw({ sort_index: 0 }), raw({ sort_index: 10 }), -10],
    [raw({ sort_index: 10 }), raw({ sort_index: 0 }), 10],
    [raw({ sort_index: -3 }), raw({ sort_index: -1 }), -2],
    [raw({ sort_index: -1 }), raw({ sort_index: -3 }), 2],
  ]
  for (const [a, b, expected] of cases) {
    it(`sort_index ${a.sort_index} vs ${b.sort_index} -> ${expected}`, () => {
      expect(bySortIndex(a, b)).toBe(expected)
    })
  }

  it('sorts an array of raw appointments ascending by sort_index', () => {
    const items: RawAppointment[] = [
      raw({ sort_index: 3, title: 'c' }),
      raw({ sort_index: 1, title: 'a' }),
      raw({ sort_index: 2, title: 'b' }),
      raw({ sort_index: 0, title: 'root' }),
    ]
    expect([...items].sort(bySortIndex).map((i) => i.title)).toEqual(['root', 'a', 'b', 'c'])
  })

  it('is a stable comparator (equal sort_index returns 0)', () => {
    const a = raw({ sort_index: 7, title: 'a' })
    const b = raw({ sort_index: 7, title: 'b' })
    expect(bySortIndex(a, b)).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import type { RawAppointment } from '@/types'
import {
  formatDate,
  formatCurrency,
  formatDateCompact,
  formatDatespan,
  formatDatetime,
  formatDuration,
  formatTimespan,
} from '@/utils'

const toUtcIso = (year: number, month: number, day: number, hours = 0, minutes = 0) =>
  new Date(Date.UTC(year, month - 1, day, hours, minutes)).toISOString()

const toNaiveIso = (year: number, month: number, day: number, hours = 0, minutes = 0) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${year}-${pad(month)}-${pad(day)}`
  return hours === 0 && minutes === 0 ? date : `${date}T${pad(hours)}:${pad(minutes)}:00`
}

const appointment = (fields: Partial<RawAppointment>): RawAppointment => ({
  sort_index: 0,
  ...fields,
})

const NBSP = '\u00A0'

describe('formatDate', () => {
  const cases: Array<[Date, string]> = [
    [new Date(Date.UTC(2024, 0, 15)), '15. Januar 2024'],
    [new Date(Date.UTC(2024, 2, 9)), '9. März 2024'],
    [new Date(Date.UTC(2024, 11, 1)), '1. Dezember 2024'],
  ]
  for (const [input, expected] of cases) {
    it(`formats ${input.toISOString()} as ${expected}`, () => {
      expect(formatDate(input)).toBe(expected)
    })
  }
})

describe('formatDatetime', () => {
  const cases: Array<[string, string]> = [
    [toUtcIso(2024, 1, 15, 14, 30), 'Mo., 15. Jan. 2024, 14:30 Uhr'],
    [toUtcIso(2024, 3, 9, 9, 5), 'Sa., 9. März 2024, 9:05 Uhr'],
    [toUtcIso(2024, 12, 31, 23, 59), 'Di., 31. Dez. 2024, 23:59 Uhr'],
  ]
  for (const [input, expected] of cases) {
    it(`formats ${input} as ${expected}`, () => {
      expect(formatDatetime(input)).toBe(expected)
    })
  }
})

describe('formatDateCompact', () => {
  const cases: Array<[string, string]> = [
    [toUtcIso(2024, 1, 15, 14, 30), 'Mo., 15. Jan., 14:30 Uhr'],
    [toUtcIso(2024, 3, 9, 9, 5), 'Sa., 9. März, 9:05 Uhr'],
    [toUtcIso(2024, 12, 31, 23, 59), 'Di., 31. Dez., 23:59 Uhr'],
  ]
  for (const [input, expected] of cases) {
    it(`formats ${input} as ${expected}`, () => {
      expect(formatDateCompact(input)).toBe(expected)
    })
  }
})

describe('formatDatespan', () => {
  describe('date-only (start_date / end_date)', () => {
    it('single day renders just the start in long form (German locale)', () => {
      expect(
        formatDatespan(appointment({ start_date: '2024-01-15', end_date: '2024-01-15' })),
      ).toBe('Mo., 15. Jan. 2024')
    })

    it('multi-day span renders both days joined with a dash (German locale)', () => {
      expect(
        formatDatespan(appointment({ start_date: '2024-01-15', end_date: '2024-01-18' })),
      ).toBe('Mo., 15. Jan. 2024 - Do., 18. Jan. 2024')
    })

    it('span across months and years (German locale)', () => {
      expect(
        formatDatespan(appointment({ start_date: '2024-12-30', end_date: '2025-01-02' })),
      ).toBe('Mo., 30. Dez. 2024 - Do., 2. Jan. 2025')
    })
  })

  describe('datetime-only (start_date_time / end_date_time)', () => {
    it('same-calendar-day collapse renders only the start (default locale, no de)', () => {
      expect(
        formatDatespan(
          appointment({
            start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
            end_date_time: toNaiveIso(2024, 1, 15, 16, 30),
          }),
        ),
      ).toBe('Mon, 15. Jan 2024')
    })

    it('1-minute difference collapse renders only the start (tracer branch)', () => {
      expect(
        formatDatespan(
          appointment({
            start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
            end_date_time: toNaiveIso(2024, 1, 15, 14, 31),
          }),
        ),
      ).toBe('Mon, 15. Jan 2024')
    })

    it('cross-midnight span (different calendar days) renders both endpoints (default locale)', () => {
      expect(
        formatDatespan(
          appointment({
            start_date_time: toNaiveIso(2024, 1, 15, 23, 30),
            end_date_time: toNaiveIso(2024, 1, 16, 0, 30),
          }),
        ),
      ).toBe('Mon, 15. Jan 2024 - Tue, 16. Jan 2024')
    })

    it('multi-day datetime span renders both endpoints (default locale)', () => {
      expect(
        formatDatespan(
          appointment({
            start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
            end_date_time: toNaiveIso(2024, 1, 18, 10, 0),
          }),
        ),
      ).toBe('Mon, 15. Jan 2024 - Thu, 18. Jan 2024')
    })
  })

  describe('no dates', () => {
    it('throws when neither date nor datetime range is present', () => {
      expect(() => formatDatespan(appointment({}))).toThrow('Appointment has no start or end date')
    })

    it('throws with only a start_date', () => {
      expect(() => formatDatespan(appointment({ start_date: '2024-01-15' }))).toThrow(
        'Appointment has no start or end date',
      )
    })

    it('throws with only a start_date_time', () => {
      expect(() =>
        formatDatespan(appointment({ start_date_time: toNaiveIso(2024, 1, 15, 14, 30) })),
      ).toThrow('Appointment has no start or end date')
    })
  })
})

describe('formatTimespan', () => {
  it('returns ganztägig for all-day date range', () => {
    expect(formatTimespan(appointment({ start_date: '2024-01-15', end_date: '2024-01-15' }))).toBe(
      'ganztägig',
    )
  })

  it('formats datetime range as start - end Uhr', () => {
    expect(
      formatTimespan(
        appointment({
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 16, 45),
        }),
      ),
    ).toBe('14:30 - 16:45 Uhr')
  })

  it('1-minute difference still formats as a normal time range (no same-day collapse branch here)', () => {
    expect(
      formatTimespan(
        appointment({
          start_date_time: toNaiveIso(2024, 1, 15, 14, 30),
          end_date_time: toNaiveIso(2024, 1, 15, 14, 31),
        }),
      ),
    ).toBe('14:30 - 14:31 Uhr')
  })

  it('throws on empty appointment', () => {
    expect(() => formatTimespan(appointment({}))).toThrow(
      'Appointment has no start or end date time',
    )
  })

  it('throws with only a start_date set', () => {
    expect(() => formatTimespan(appointment({ start_date: '2024-01-15' }))).toThrow(
      'Appointment has no start or end date time',
    )
  })
})

describe('formatDuration', () => {
  const cases: Array<[number, string]> = [
    [0, ''],
    [30, '30 Minuten'],
    [60, '1 Stunde'],
    [90, '1 Stunde und 30 Minuten'],
    [120, '2 Stunden'],
    [150, '2 Stunden und 30 Minuten'],
    [180, '3 Stunden'],
  ]
  for (const [input, expected] of cases) {
    it(`formats ${input} minutes as "${expected}"`, () => {
      expect(formatDuration(input)).toBe(expected)
    })
  }
})

describe('formatCurrency', () => {
  const cases: Array<[number, string]> = [
    [0, `0,00${NBSP}€`],
    [9.99, `9,99${NBSP}€`],
    [1000, `1.000,00${NBSP}€`],
    [1234.5, `1.234,50${NBSP}€`],
    [-5, `-5,00${NBSP}€`],
  ]
  for (const [input, expected] of cases) {
    it(`formats ${input} as ${expected}`, () => {
      expect(formatCurrency(input)).toBe(expected)
    })
  }

  it('returns the original value when not coercible to a number', () => {
    expect(formatCurrency('not-a-number' as unknown as number)).toBe('not-a-number')
  })
})

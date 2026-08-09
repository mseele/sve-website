import { describe, expect, it } from 'vitest'
import {
  AvailabilityState,
  availabilityState,
  calculateAvailabilityMessage,
  canSubscribe,
  convertToEventAvailability,
} from '@/api/events'
import type { RawEventCounter } from '@/types'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const counter = (fields: Partial<RawEventCounter>): RawEventCounter => ({
  id: 'evt-1',
  max_subscribers: 10,
  subscribers: 0,
  waiting_list: 0,
  max_waiting_list: 5,
  ...fields,
})

describe('convertToEventAvailability — producer sentinel + phase switch', () => {
  const cases: Array<{
    name: string
    input: RawEventCounter
    expectedSlots: number
    expectedWaitingList: boolean
    expectedState: AvailabilityState
    expectedMessage: string
  }> = [
    {
      name: 'Unlimited event (max_subscribers === -1): sentinel -1, subscriber phase',
      input: counter({ max_subscribers: -1, subscribers: 999 }),
      expectedSlots: -1,
      expectedWaitingList: false,
      expectedState: AvailabilityState.Unlimited,
      expectedMessage: 'Freie Plätze verfügbar',
    },
    {
      name: 'Subscribers open, many slots remaining',
      input: counter({ max_subscribers: 10, subscribers: 2 }),
      expectedSlots: 8,
      expectedWaitingList: false,
      expectedState: AvailabilityState.Subscribing,
      expectedMessage: 'Noch 8 freie Plätze',
    },
    {
      name: 'Subscribers open, exactly one slot remaining (singular message)',
      input: counter({ max_subscribers: 10, subscribers: 9 }),
      expectedSlots: 1,
      expectedWaitingList: false,
      expectedState: AvailabilityState.Subscribing,
      expectedMessage: 'Noch 1 freier Platz',
    },
    {
      name: 'Subscribers full, waiting-list open: phase switches, isWaitingList true',
      input: counter({
        max_subscribers: 10,
        subscribers: 10,
        max_waiting_list: 5,
        waiting_list: 1,
      }),
      expectedSlots: 4,
      expectedWaitingList: true,
      expectedState: AvailabilityState.WaitingList,
      expectedMessage: 'Warteliste ist geöffnet',
    },
    {
      name: 'Subscribers and waiting-list full: 0 + isWaitingList true (FullyBooked)',
      input: counter({
        max_subscribers: 10,
        subscribers: 10,
        max_waiting_list: 5,
        waiting_list: 5,
      }),
      expectedSlots: 0,
      expectedWaitingList: true,
      expectedState: AvailabilityState.FullyBooked,
      expectedMessage: 'Ausgebucht',
    },
    {
      name: 'Unlimited event ignores the waiting-list phase entirely',
      input: counter({
        max_subscribers: -1,
        subscribers: 999,
        max_waiting_list: 0,
        waiting_list: 0,
      }),
      expectedSlots: -1,
      expectedWaitingList: false,
      expectedState: AvailabilityState.Unlimited,
      expectedMessage: 'Freie Plätze verfügbar',
    },
    {
      name: 'Subscribers exactly at capacity but waiting-list open does NOT underflow below zero',
      input: counter({
        max_subscribers: 10,
        subscribers: 12,
        max_waiting_list: 3,
        waiting_list: 0,
      }),
      expectedSlots: 3,
      expectedWaitingList: true,
      expectedState: AvailabilityState.WaitingList,
      expectedMessage: 'Warteliste ist geöffnet',
    },
    {
      name: 'Negative phantom: subscribers exceed cap and waiting-list exceeds cap clamps to 0',
      input: counter({
        max_subscribers: 10,
        subscribers: 15,
        max_waiting_list: 4,
        waiting_list: 9,
      }),
      expectedSlots: 0,
      expectedWaitingList: true,
      expectedState: AvailabilityState.FullyBooked,
      expectedMessage: 'Ausgebucht',
    },
  ]

  for (const c of cases) {
    it(c.name, () => {
      const av = convertToEventAvailability(c.input)
      expect(av.availableSlots).toBe(c.expectedSlots)
      expect(av.isWaitingList).toBe(c.expectedWaitingList)
      expect(av.message).toBe(c.expectedMessage)
      expect(availabilityState(av)).toBe(c.expectedState)
    })
  }
})

describe('availabilityState — sentinel + phase decode (the one canonical read site)', () => {
  const cases: Array<{
    name: string
    slots: number
    waiting: boolean
    expected: AvailabilityState
  }> = [
    {
      name: 'sentinel -1 ⇒ Unlimited regardless of isWaitingList (well-formed input)',
      slots: -1,
      waiting: false,
      expected: AvailabilityState.Unlimited,
    },
    {
      name: 'subscriber phase, slots remaining ⇒ Subscribing',
      slots: 5,
      waiting: false,
      expected: AvailabilityState.Subscribing,
    },
    {
      name: 'subscriber phase, exactly one slot ⇒ Subscribing',
      slots: 1,
      waiting: false,
      expected: AvailabilityState.Subscribing,
    },
    {
      name: 'waiting-list phase, slots remaining ⇒ WaitingList',
      slots: 3,
      waiting: true,
      expected: AvailabilityState.WaitingList,
    },
    {
      name: 'waiting-list phase, exactly one slot ⇒ WaitingList',
      slots: 1,
      waiting: true,
      expected: AvailabilityState.WaitingList,
    },
    {
      name: 'waiting-list phase, zero slots ⇒ FullyBooked',
      slots: 0,
      waiting: true,
      expected: AvailabilityState.FullyBooked,
    },
    {
      name: 'subscriber phase, zero slots ⇒ FullyBooked (unreachable in producer but defensive)',
      slots: 0,
      waiting: false,
      expected: AvailabilityState.FullyBooked,
    },
  ]

  for (const c of cases) {
    it(c.name, () => {
      expect(availabilityState({ availableSlots: c.slots, isWaitingList: c.waiting })).toBe(
        c.expected,
      )
    })
  }
})

describe('calculateAvailabilityMessage — message derives through the state predicate', () => {
  const cases: Array<{ slots: number; waiting: boolean; expected: string }> = [
    { slots: -1, waiting: false, expected: 'Freie Plätze verfügbar' },
    { slots: 5, waiting: false, expected: 'Noch 5 freie Plätze' },
    { slots: 1, waiting: false, expected: 'Noch 1 freier Platz' },
    { slots: 3, waiting: true, expected: 'Warteliste ist geöffnet' },
    { slots: 1, waiting: true, expected: 'Warteliste ist geöffnet' },
    { slots: 0, waiting: true, expected: 'Ausgebucht' },
    { slots: 0, waiting: false, expected: 'Ausgebucht' },
  ]

  for (const { slots, waiting, expected } of cases) {
    it(`slots=${slots}, isWaitingList=${waiting} ⇒ "${expected}"`, () => {
      expect(calculateAvailabilityMessage({ availableSlots: slots, isWaitingList: waiting })).toBe(
        expected,
      )
    })
  }
})

describe('canSubscribe — "is booking open" predicate', () => {
  const cases: Array<{ name: string; slots: number; waiting: boolean; expected: boolean }> = [
    { name: 'Unlimited ⇒ true', slots: -1, waiting: false, expected: true },
    { name: 'Subscribing with many slots ⇒ true', slots: 5, waiting: false, expected: true },
    { name: 'Subscribing with one slot ⇒ true', slots: 1, waiting: false, expected: true },
    { name: 'WaitingList open ⇒ false', slots: 3, waiting: true, expected: false },
    { name: 'WaitingList with one slot ⇒ false', slots: 1, waiting: true, expected: false },
    { name: 'FullyBooked (waiting full) ⇒ false', slots: 0, waiting: true, expected: false },
    {
      name: 'FullyBooked (defensive, subscriber zero) ⇒ false',
      slots: 0,
      waiting: false,
      expected: false,
    },
  ]

  for (const { name, slots, waiting, expected } of cases) {
    it(name, () => {
      expect(canSubscribe({ availableSlots: slots, isWaitingList: waiting })).toBe(expected)
    })
  }
})

describe('-1 contract — the sentinel is pinned to exactly two sites', () => {
  const moduleSource = readFileSync(resolve(process.cwd(), 'src/api/events.ts'), 'utf8')

  it('Unlimited never produces a "Noch N" or "Ausgebucht" message', () => {
    expect(calculateAvailabilityMessage({ availableSlots: -1, isWaitingList: false })).toBe(
      'Freie Plätze verfügbar',
    )
    expect(calculateAvailabilityMessage({ availableSlots: -1, isWaitingList: true })).toBe(
      'Freie Plätze verfügbar',
    )
  })

  it('availabilityState reads === -1 (the canonical decode site)', () => {
    expect(availabilityState.toString()).toContain('=== -1')
  })

  it('calculateAvailabilityMessage never compares === -1 — it delegates to availabilityState', () => {
    const fnSource = extractFunctionSource(moduleSource, 'calculateAvailabilityMessage')
    expect(fnSource).not.toContain('=== -1')
  })

  it('canSubscribe never compares === -1 — it delegates to availabilityState', () => {
    const fnSource = extractFunctionSource(moduleSource, 'canSubscribe')
    expect(fnSource).not.toContain('=== -1')
  })
})

function extractFunctionSource(source: string, name: string): string {
  const start = source.indexOf(`function ${name}`)
  if (start === -1) throw new Error(`function ${name} not found in source`)
  let depth = 0
  let bodyStart = -1
  for (let i = start; i < source.length; i++) {
    if (source[i] === '{') {
      if (bodyStart === -1) bodyStart = i
      depth++
    } else if (source[i] === '}') {
      depth--
      if (depth === 0) return source.slice(start, i + 1)
    }
  }
  throw new Error(`unterminated function ${name}`)
}

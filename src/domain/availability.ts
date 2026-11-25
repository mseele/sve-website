import type { EventAvailability, RawEventCounter } from '@/types'

/**
 * Four-state phase machine derived from {@link EventAvailability}. Tests pin
 * every transition; consumer sites must branch on this enum rather than
 * re-decoding the `-1` / `0` sentinels themselves, so a future sentinel change
 * (e.g. to `Infinity` or a `kind: 'unlimited'` discriminated field) either
 * moves every site together or fails a test.
 *
 * Pure domain module: no fetch, no browser APIs, no Rollbar — the browser
 * `<script>` bundles import it as a runtime value, so it must stay
 * dependency-free (see `tests/architecture/browser-imports.test.ts`).
 */
export enum AvailabilityState {
  /** Subscriber phase, no capacity limit (`max_subscribers === -1`). Sentinel `-1`. */
  Unlimited = 'unlimited',
  /** Subscriber phase, slots remaining. */
  Subscribing = 'subscribing',
  /** Subscribers full; waiting-list phase open. */
  WaitingList = 'waitingList',
  /** Subscribers full and waiting-list full. Terminal. */
  FullyBooked = 'fullyBooked',
}

/**
 * Canonical decode of the {@link EventAvailability} sentinel + phase switch
 * into a single {@link AvailabilityState}. This is the ONLY function that
 * should read `availableSlots === -1` or `availableSlots === 0`; everywhere
 * else derives through this predicate or {@link canSubscribe}.
 */
export function availabilityState(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): AvailabilityState {
  if (av.availableSlots === -1) {
    return AvailabilityState.Unlimited
  }
  if (av.isWaitingList) {
    return av.availableSlots > 0 ? AvailabilityState.WaitingList : AvailabilityState.FullyBooked
  }
  return av.availableSlots > 0 ? AvailabilityState.Subscribing : AvailabilityState.FullyBooked
}

/**
 * Whether the booking form is open for this event — `true` for the
 * `Unlimited` and `Subscribing` phases, `false` once the waiting-list or
 * fully-booked phases begin. Captures the "is booking open" question the
 * `Event.astro` consumer used to re-derive inline from two enum values; goes
 * through {@link availabilityState} so it never reads the sentinel directly.
 */
export function canSubscribe(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): boolean {
  const state = availabilityState(av)
  return state === AvailabilityState.Unlimited || state === AvailabilityState.Subscribing
}

/** Single writer of the `-1` sentinel; see {@link EventAvailability}. */
export function convertToEventAvailability(counter: RawEventCounter): EventAvailability {
  const noLimit = counter.max_subscribers === -1
  const noMoreSubscriptions = counter.subscribers >= counter.max_subscribers
  const noMoreWaitingList = counter.waiting_list >= counter.max_waiting_list

  const availableSlots = noLimit
    ? -1
    : noMoreSubscriptions
      ? noMoreWaitingList
        ? 0
        : Math.max(0, counter.max_waiting_list - counter.waiting_list)
      : Math.max(0, counter.max_subscribers - counter.subscribers)

  const isWaitingList = !noLimit && noMoreSubscriptions

  return {
    availableSlots,
    isWaitingList,
    message: calculateAvailabilityMessage({ availableSlots, isWaitingList }),
  }
}

export function calculateAvailabilityMessage(
  av: Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>,
): string {
  switch (availabilityState(av)) {
    case AvailabilityState.Unlimited:
      return 'Freie Plätze verfügbar'
    case AvailabilityState.WaitingList:
      return 'Warteliste ist geöffnet'
    case AvailabilityState.Subscribing:
      return av.availableSlots === 1
        ? 'Noch 1 freier Platz'
        : `Noch ${av.availableSlots} freie Plätze`
    case AvailabilityState.FullyBooked:
      return 'Ausgebucht'
  }
}

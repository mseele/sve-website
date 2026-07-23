# CONTEXT — SV Eutingen Website

Single-context repo. Domain terms resolved by the engineering skills live here; cross-cutting decisions that are hard to reverse + surprising + real trade-off live in `docs/adr/`.

## Booking availability

### `EventAvailability`

Derived client-side from a backend `RawEventCounter`. Encodes a four-state booking phase machine through the pair (`availableSlots`, `isWaitingList`):

- **`Unlimited`** — event has no capacity limit (`max_subscribers === -1`).
- **`Subscribing`** — subscriber phase open, slots remaining.
- **`WaitingList`** — subscribers full, waiting-list phase open.
- **`FullyBooked`** — subscribers and waiting-list both full. Terminal.

The field `availableSlots` is a **phase-switched** quantity: it counts whichever kind of slot is currently bookable — subscriber slots in the `Subscribing` / `Unlimited` phases, waiting-list slots in the `WaitingList` phase, and `0` in `FullyBooked`. It is _not_ two independent quantities; the two phases are mutually exclusive (the booking flow depletes subscribers first, then flips to the waiting list). Splitting it into `remainingSubscriberSlots` + `remainingWaitingListSlots` was considered and rejected — see ADR-0001.

**`-1` sentinel** is a real domain concept ("Unlimited"), not a leaked implementation detail. Decode it only through `availabilityState(av)` in `src/api/events.ts`; never compare `availableSlots === -1` or `=== 0` at consumer sites.

### `RawEventCounter`

Raw counter payload from the backend. `max_subscribers === -1` signals an unlimited event; all other fields are non-negative integers. Producer transform `convertToEventAvailability(counter) → EventAvailability` is the single writer of the sentinel.

### Producer / reader contract for the sentinel

| Site                           | Role                                                                 | Location                             |
| ------------------------------ | -------------------------------------------------------------------- | ------------------------------------ |
| `convertToEventAvailability`   | **Write** the sentinel                                               | `src/api/events.ts`                  |
| `availabilityState`            | **Canonical read** of the sentinel + phase                           | `src/api/events.ts`                  |
| `canSubscribe`                 | Derivative of `availabilityState` — "is booking open"                | `src/api/events.ts`                  |
| `calculateAvailabilityMessage` | Derivative — delegates to `availabilityState`, no raw sentinel param | `src/api/events.ts`                  |
| `<script>` in `Event.astro`    | Consumer; branches on `availabilityState(av)` / `canSubscribe(av)`   | `src/components/blocks/Event.astro`  |
| `<script>` in `Events.astro`   | Consumer; branches on `availabilityState(av)`                        | `src/components/blocks/Events.astro` |

A future sentinel refactor (e.g. to `Infinity` or a `kind: 'unlimited'` discriminated field) must move all sites together — `tests/api/events.test.ts` pins the contract, including a negative test asserting no exported function besides `availabilityState` reads `=== -1`.

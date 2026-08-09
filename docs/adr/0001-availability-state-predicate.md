# ADR-0001: Keep `availableSlots` as one phase-switched field; export an `availabilityState` predicate in `src/api/events.ts`

Date: 2026-07-23
Status: Accepted
Resolves: Issue #400 (decisions B1 and B2-i)
Touches: `src/types.ts`, `src/api/events.ts`, `src/components/blocks/Event.astro`, `src/components/blocks/Events.astro`, `tests/api/events.test.ts`, `CONTEXT.md`

## Context

`EventAvailability.availableSlots` carries two domain jobs depending on `isWaitingList`:

- when `isWaitingList === false` — remaining **subscriber** slots (or `-1` for an unlimited event),
- when `isWaitingList === true` — remaining **waiting-list** slots (always `>= 0`).

Issue #400 asked us to decide between (a) keeping the overloaded field, named + documented, or (b) splitting it into `remainingSubscriberSlots` + `remainingWaitingListSlots`.

The `-1` contract spans four sites:

1. `convertToEventAvailability` (write) — `src/api/events.ts`,
2. `calculateAvailabilityMessage` (read) — `src/api/events.ts`,
3. the `<script>` in `Event.astro` (read `=== -1`) — not exported TS, unreachable by unit tests,
4. the `<script>` in `Events.astro` (read `=== 0`) — not exported TS, unreachable by unit tests.

Sites 3 and 4 re-decode the sentinel independently of the producer, with no test seam. Issue #400 asked us to decide between (i) extracting the consumer decoders into exported pure predicates with tests, and (ii) leaving the decoders in the `.astro` scripts and accepting a test gap.

## Decisions

1. **B1 — keep `availableSlots` as one phase-switched field, documented in the type.**
2. **B2-i — extract the sentinel + phase decode into exported pure predicates.** `availabilityState(av): AvailabilityState` is the canonical decode; `canSubscribe(av): boolean` wraps it for the "is booking open" question (`Unlimited` or `Subscribing`). Both `.astro` consumer sites call these predicates; they never read `-1`/`0` directly. `calculateAvailabilityMessage` accepts the same `Pick<EventAvailability, 'availableSlots' | 'isWaitingList'>` shape (not raw `number` params) and delegates to `availabilityState` internally, so the sentinel never appears as a bare parameter at any consumer-facing seam.

### Placement: `AvailabilityState` + `availabilityState` in `src/api/events.ts`, not `src/types.ts`

This is the surprising half of the decision. The natural home for a shared type-and-value is `src/types.ts`, but here it would silently increase the browser bundle:

- `src/types.ts` imports `z` from `zod` at the top (the `phoneNumberObject` / `personObject` schemas are runtime values). Importing a runtime _value_ (enum) from `@/types` into the browser `<script>` bundles in `Event.astro` / `Events.astro` would pull the `zod` dependency into the client bundle for two script tags.
- `src/api/events` is _already_ in the browser bundle (the `<script>` tags import `bookEvent`, `loadEventsAvailability` from it). Colocating `AvailabilityState` + `availabilityState` there adds zero bytes to the client.

Trade-off: a future reader looking for "the shape of availability" must read `src/types.ts` (interface + phase-switch doc) **and** `src/api/events.ts` (predicate + enum). The placement is by bundle side-effect, not by conceptual ownership.

## Reversibility

B1 is reversible — a future split (or rename) is a local refactor now that the consumer sites go through the predicate and `tests/api/events.test.ts` pins every transition.

B2-i is reversible in code (move the enum, update imports) but the bundle-size regression is _invisible_ — there is no test that fails when `zod` quietly lands in the client bundle. Reverse this decision only after a deliberate bundle-size audit.

## Consequences

- The `-1` contract has exactly one writer (`convertToEventAvailability`) and one canonical reader (`availabilityState`); both are unit-tested. The two `.astro` sites no longer read the sentinel directly.
- A future sentinel refactor (e.g. to `Infinity` or a `kind: 'unlimited'` discriminated field) either moves all four sites together or fails a test.
- `AvailabilityState` is deliberately _not_ in `src/types.ts`. Document this in `CONTEXT.md` and reference this ADR, so the placement is a deliberate choice rather than an accident.

## Alternatives considered

- **B1-split:** `remainingSubscriberSlots` + `remainingWaitingListSlots`. Rejected — the two phases are mutually exclusive; exposing two fields would advertise two independent quantities where one is always `0` whenever the other is non-zero. Misleading to consumers and harder to keep consistent across the four contract sites.
- **B2-ii:** leave the decoders inline in the `.astro` scripts, accept the test gap. Rejected — the four-site `-1` contract is the kind of implicit coupling that silently breaks during a sentinel refactor. Symmetry across the sites only survives if the decode is in one place.

## Open questions

- If `src/types.ts` ever drops its `zod` import (e.g. schemas move elsewhere), revisit colocating `AvailabilityState` back into `@/types` for conceptual ownership.

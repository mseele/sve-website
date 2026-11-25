import { z } from 'astro/zod'

/**
 * Runtime Zod contract for Contentful person / phone-number sub-objects.
 *
 * Lives here (not in `src/types.ts`) so the schema construction stays out of
 * the type-only module — importing a runtime value from `@/types` would drag
 * `zod` into any browser bundle that imports it. The plain `Person` /
 * `PhoneNumber` interfaces in `src/types.ts` mirror these shapes.
 *
 * Deliberately omits the `id` field the Contentful loader emits on phone
 * numbers, so a surplus `id` is silently stripped during validation — pinned
 * by `tests/api/contentful.test.ts`.
 */
export const phoneNumberObject = z.object({
  formatted: z.string(),
  raw: z.string(),
})

export const personObject = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  email: z.string().optional(),
  mobile: phoneNumberObject.optional(),
  phone: phoneNumberObject.optional(),
})

/**
 * Zod contract for the domain object produced by `loadTeams` (`src/api/contentful.ts`).
 *
 * Lives outside `src/content.config.ts` so the contract test can import the
 * schema without dragging in the `astro:content` / `astro:env/server` runtime —
 * those modules are server-only and throw under the happy-dom test environment.
 *
 * `src/content.config.ts` re-uses this factory to keep a single source of
 * truth between production collection validation and the schema contract tests
 * under `tests/content-schemas.test.ts`.
 */
export const teamSchema = () =>
  z.object({
    id: z.string(),
    name: z.string(),
    league: z.string().optional(),
    category: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      isYouthGroup: z.boolean(),
      sortOrder: z.number(),
    }),
    sortOrder: z.number(),
    coach: personObject.optional(),
    contact: personObject.optional(),
    teamID: z.string().optional(),
  })

/**
 * Zod contract for the domain object produced by `loadSponsors`
 * (`src/api/contentful.ts`). See {@link teamSchema} for the rationale of
 * living outside `src/content.config.ts`.
 */
export const sponsorSchema = () =>
  z.object({
    name: z.string(),
    groupBy: z.string(),
  })

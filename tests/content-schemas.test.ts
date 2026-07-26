import { describe, expect, it } from 'vitest'
import { sponsorSchema, teamSchema } from '@/content-schemas'
import teamFixture from './fixtures/contentful/team.json'
import sponsorFixture from './fixtures/contentful/sponsor.json'

// Pin the schemas against the canonical fixtures under `tests/fixtures/contentful/`.
// Two halves per content type:
//  - parse-succeed: the happy-path fixture validates.
//  - parse-fail: a mutated copy (missing required field, wrong type) must be rejected.

describe('teamSchema — Contentful team contract', () => {
  it('parses the happy-path team fixture', () => {
    const parsed = teamSchema().parse(teamFixture)
    expect(parsed).toEqual(teamFixture)
  })

  it('accepts a team with all optional fields omitted (league, coach, contact, teamID)', () => {
    const minimal = {
      id: 'team-2',
      name: 'Herren II',
      category: {
        id: 'cat-1',
        name: 'Herren',
        description: 'Seniorenmannschaften',
        isYouthGroup: false,
        sortOrder: 1,
      },
      sortOrder: 1.2,
    }
    expect(() => teamSchema().parse(minimal)).not.toThrow()
  })

  describe('rejects mutated fixtures (parse-fail)', () => {
    it('rejects a missing required `id`', () => {
      const bad = structuredClone(teamFixture)
      delete (bad as Partial<typeof teamFixture>).id
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a missing required `name`', () => {
      const bad = structuredClone(teamFixture)
      delete (bad as Partial<typeof teamFixture>).name
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a missing required `category`', () => {
      const bad = structuredClone(teamFixture)
      delete (bad as Partial<typeof teamFixture>).category
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects when `category` is missing a required sub-field (`sortOrder`)', () => {
      const bad = structuredClone(teamFixture)
      delete (bad.category as { sortOrder?: unknown }).sortOrder
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a wrong type for `sortOrder` (string instead of number)', () => {
      const bad = structuredClone(teamFixture)
      ;(bad as { sortOrder: unknown }).sortOrder = '1.1'
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a wrong type for `category.isYouthGroup` (string instead of boolean)', () => {
      const bad = structuredClone(teamFixture)
      ;(bad.category as { isYouthGroup: unknown }).isYouthGroup = 'no'
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a malformed `coach.mobile` (missing `raw`)', () => {
      const bad = structuredClone(teamFixture)
      const coach = bad.coach!
      delete (coach.mobile as { raw?: unknown }).raw
      expect(() => teamSchema().parse(bad)).toThrow()
    })

    it('rejects a wrong type for `coach.mobile.formatted` (number instead of string)', () => {
      const bad = structuredClone(teamFixture)
      ;(bad.coach!.mobile as { formatted: unknown }).formatted = 42
      expect(() => teamSchema().parse(bad)).toThrow()
    })
  })
})

describe('sponsorSchema — Contentful sponsor contract', () => {
  it('parses the happy-path sponsor fixture', () => {
    const parsed = sponsorSchema().parse(sponsorFixture)
    expect(parsed).toEqual(sponsorFixture)
  })

  describe('rejects mutated fixtures (parse-fail)', () => {
    it('rejects a missing required `name`', () => {
      const bad = structuredClone(sponsorFixture)
      delete (bad as Partial<typeof sponsorFixture>).name
      expect(() => sponsorSchema().parse(bad)).toThrow()
    })

    it('rejects a missing required `groupBy`', () => {
      const bad = structuredClone(sponsorFixture)
      delete (bad as Partial<typeof sponsorFixture>).groupBy
      expect(() => sponsorSchema().parse(bad)).toThrow()
    })

    it('rejects a wrong type for `groupBy` (number instead of string)', () => {
      const bad = structuredClone(sponsorFixture)
      ;(bad as { groupBy: unknown }).groupBy = 42
      expect(() => sponsorSchema().parse(bad)).toThrow()
    })
  })
})

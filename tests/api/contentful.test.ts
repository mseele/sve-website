import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// ─── Module mocks (hoisted) ───────────────────────────────────────────
//
// `src/api/contentful.ts` builds the Contentful client once at module-import
// time, reading `import.meta.env.DEV` and three server-only tokens from
// `astro:env/server`. The hoisted mocks below let the test layer:
//   1. capture the `createClient` configuration per branch (DEV vs delivery),
//   2. stub the getEntries response to feed raw entry fixtures, and
//   3. satisfy the server-only guard on `astro:env/server` under happy-dom.

vi.mock('contentful', () => ({
  createClient: vi.fn(),
}))

vi.mock('astro:env/server', () => ({
  CONTENTFUL_SPACE_ID: 'space-id',
  CONTENTFUL_DELIVERY_TOKEN: 'delivery-token',
  CONTENTFUL_PREVIEW_TOKEN: 'preview-token',
}))

import { createClient } from 'contentful'
import teamFixture from '../fixtures/contentful/team.json'
import sponsorFixture from '../fixtures/contentful/sponsor.json'

// ─── Raw Contentful entry fixtures ────────────────────────────────────
//
// Shape matches what the Contentful JS SDK returns from `getEntries` after
// `include: 2` link resolution. The domain object the loader produces must
// deep-equal the matching JSON in `tests/fixtures/contentful/` for every
// field the schema contract pins (see the note on `coach.mobile.id` below —
// the loader emits `id` on phone numbers; ` phoneNumberObject` deliberately
// omits it, so the schema-contract fixture has no `id` and Zod's default
// strip behaviour discards the loader surplus silently).

const rawTeamEntry = {
  sys: { id: 'team-1' },
  fields: {
    name: 'Herren I',
    league: 'Bezirksliga',
    category: {
      sys: { id: 'cat-1' },
      fields: {
        name: 'Herren',
        description: 'Seniorenmannschaften',
        isYouthGroup: false,
        sortOrder: 1,
      },
    },
    sortOrder: 1,
    coach: {
      sys: { id: 'person-1' },
      fields: {
        name: 'Max Mustermann',
        position: {
          sys: { id: 'position-trainer' },
          fields: { name: 'Trainer' },
        },
        email: 'max@example.org',
        mobile: {
          sys: { id: 'phone-coach-mobile' },
          fields: { formatted: '+49 176 12345678', raw: '+4917612345678' },
        },
        phone: {
          sys: { id: 'phone-coach-fixed' },
          fields: { formatted: '+49 7459 1204', raw: '+4974591204' },
        },
      },
    },
    contact: {
      sys: { id: 'person-2' },
      fields: {
        name: 'Anna Schmidt',
        position: {
          sys: { id: 'position-contact' },
          fields: { name: 'Kontakt' },
        },
        email: 'anna@example.org',
      },
    },
    teamID: 'team-id-12345',
  },
}

const rawSponsorEntry = {
  sys: { id: 'sponsor-1' },
  fields: {
    name: 'Coca Cola GmbH',
    groupBy: 'Hauptsponsor',
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────

type AnyClient = ReturnType<typeof createClient>

/**
 * Install a stub Contentful client whose `getEntries` resolves with `items`.
 * The mock is shared across all `await import('@/api/contentful')` calls,
 * so each test re-installs a fresh stub via this helper.
 */
const installClient = (items: unknown[]) => {
  const getEntries = vi.fn().mockResolvedValue({ items, total: items.length })
  vi.mocked(createClient).mockReturnValue({ getEntries } as unknown as AnyClient)
  return getEntries
}

const reimportContentful = async () => {
  vi.resetModules()
  return await import('@/api/contentful')
}

// ─── Test lifecycle ────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

// ─── Tests ────────────────────────────────────────────────────────────

describe('loadTeams — getEntries shape and field mapping', () => {
  it('calls getEntries with { content_type: "team", include: 2 }', async () => {
    const getEntries = installClient([rawTeamEntry])
    const { loadTeams } = await reimportContentful()
    await loadTeams()
    expect(getEntries).toHaveBeenCalledTimes(1)
    expect(getEntries).toHaveBeenCalledWith({ content_type: 'team', include: 2 })
  })

  it('maps a raw team entry to the canonical team domain shape pinned by the fixture', async () => {
    installClient([rawTeamEntry])
    const { loadTeams } = await reimportContentful()
    const teams = await loadTeams()
    expect(teams).toHaveLength(1)
    // The fixture is the schema-validated shape (coach.mobile.id is silently
    // stripped by `phoneNumberObject`); the loader output also includes
    // `id` on phone numbers, so we assert the schema-pinned fields against
    // the fixture and the loader-only surplus (`coach.mobile.id`) separately.
    const [team] = teams
    expect(team.id).toBe(teamFixture.id)
    expect(team.name).toBe(teamFixture.name)
    expect(team.league).toBe(teamFixture.league)
    expect(team.category).toEqual(teamFixture.category)
    expect(team.sortOrder).toBe(teamFixture.sortOrder)
    expect(team.teamID).toBe(teamFixture.teamID)
    expect(team.coach!.id).toBe(teamFixture.coach!.id)
    expect(team.coach!.name).toBe(teamFixture.coach!.name)
    expect(team.coach!.position).toBe(teamFixture.coach!.position)
    expect(team.coach!.email).toBe(teamFixture.coach!.email)
    // Loader surplus that the schema strips — pin explicitly so the contract
    // mismatch (loader emits `id`, schema drops it) is visible in the test layer.
    expect(team.coach!.mobile).toEqual({
      id: 'phone-coach-mobile',
      formatted: teamFixture.coach!.mobile!.formatted,
      raw: teamFixture.coach!.mobile!.raw,
    })
    expect(team.coach!.phone).toEqual({
      id: 'phone-coach-fixed',
      formatted: teamFixture.coach!.phone!.formatted,
      raw: teamFixture.coach!.phone!.raw,
    })
    expect(team.contact!.id).toBe(teamFixture.contact!.id)
    expect(team.contact!.position).toBe(teamFixture.contact!.position)
    expect(team.contact!.email).toBe(teamFixture.contact!.email)
  })

  it('computes team sortOrder as `${category.sortOrder}.${team.sortOrder}`', async () => {
    installClient([
      {
        sys: { id: 'team-x' },
        fields: {
          name: 'U17',
          category: {
            sys: { id: 'cat-youth' },
            fields: { name: 'Jugend', description: 'd', isYouthGroup: true, sortOrder: 3 },
          },
          sortOrder: 7,
        },
      },
    ])
    const { loadTeams } = await reimportContentful()
    const teams = await loadTeams()
    expect(teams[0].sortOrder).toBe(3.7)
  })

  it('reads `position` from the linked position entry name (mapCategory, mapPerson)', async () => {
    installClient([rawTeamEntry])
    const { loadTeams } = await reimportContentful()
    const teams = await loadTeams()
    expect(teams[0].category).toEqual({
      id: 'cat-1',
      name: 'Herren',
      description: 'Seniorenmannschaften',
      isYouthGroup: false,
      sortOrder: 1,
    })
    expect(teams[0].coach!.position).toBe('Trainer')
    expect(teams[0].contact!.position).toBe('Kontakt')
  })

  it('omits coach / contact when the links are absent on the raw entry', async () => {
    installClient([
      {
        sys: { id: 'team-bare' },
        fields: {
          name: 'Bare Team',
          category: {
            sys: { id: 'cat-bare' },
            fields: { name: 'Bare', description: 'd', isYouthGroup: false, sortOrder: 0 },
          },
          sortOrder: 0,
        },
      },
    ])
    const { loadTeams } = await reimportContentful()
    const teams = await loadTeams()
    expect(teams[0].coach).toBeUndefined()
    expect(teams[0].contact).toBeUndefined()
    expect(teams[0].league).toBeUndefined()
    expect(teams[0].teamID).toBeUndefined()
  })
})

describe('loadSponsors — getEntries shape and groupBy mapping', () => {
  it('calls getEntries with { content_type: "sponsor" }', async () => {
    const getEntries = installClient([rawSponsorEntry])
    const { loadSponsors } = await reimportContentful()
    await loadSponsors()
    expect(getEntries).toHaveBeenCalledTimes(1)
    expect(getEntries).toHaveBeenCalledWith({ content_type: 'sponsor' })
  })

  it('maps a raw sponsor entry (groupBy present) to the canonical sponsor shape', async () => {
    installClient([rawSponsorEntry])
    const { loadSponsors } = await reimportContentful()
    const sponsors = await loadSponsors()
    expect(sponsors).toHaveLength(1)
    expect(sponsors[0]).toEqual({ id: 'sponsor-1', ...sponsorFixture })
  })

  it('falls back `groupBy` to `name` when the raw groupBy is empty', async () => {
    installClient([
      {
        sys: { id: 'sponsor-2' },
        fields: { name: 'Audi AG', groupBy: '' },
      },
    ])
    const { loadSponsors } = await reimportContentful()
    const sponsors = await loadSponsors()
    expect(sponsors[0]).toEqual({ id: 'sponsor-2', name: 'Audi AG', groupBy: 'Audi AG' })
  })

  it('falls back `groupBy` to `name` when the raw groupBy is missing', async () => {
    installClient([
      {
        sys: { id: 'sponsor-3' },
        fields: { name: 'Audi AG' },
      },
    ])
    const { loadSponsors } = await reimportContentful()
    const sponsors = await loadSponsors()
    expect(sponsors[0].groupBy).toBe('Audi AG')
  })
})

describe('createClient — DEV / delivery branch via vi.stubEnv', () => {
  // NOTE: vi.stubEnv is widened to `boolean` for `DEV`/`PROD`/`SSR`, and the
  // ternary `import.meta.env.DEV ? preview : delivery` flips on actual
  // boolean truthiness — passing string 'false' would still be truthy.

  it('uses the PREVIEW token + preview host when DEV is truthy', async () => {
    vi.stubEnv('DEV', true)
    installClient([])
    await reimportContentful()
    expect(createClient).toHaveBeenCalledWith({
      space: 'space-id',
      accessToken: 'preview-token',
      host: 'preview.contentful.com',
    })
  })

  it('uses the DELIVERY token + cdn host when DEV is falsy', async () => {
    vi.stubEnv('DEV', false)
    installClient([])
    await reimportContentful()
    expect(createClient).toHaveBeenCalledWith({
      space: 'space-id',
      accessToken: 'delivery-token',
      host: 'cdn.contentful.com',
    })
  })
})

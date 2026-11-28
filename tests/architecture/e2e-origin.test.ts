import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// The e2e build inlines its BACKEND_API origin into the mocked site, and
// the Playwright route mock must intercept the same origin — otherwise
// backend submits escape the mock (the failure mode of the first CI run).
// scripts/build-e2e.ts owns the value; this guards the sync.
const mockedOrigin = (path: string) =>
  readFileSync(resolve(process.cwd(), path), 'utf8').match(/'(https?:\/\/[^']+)'/)?.[1]

describe('e2e backend origin contract', () => {
  it('build and route mock declare the same hardcoded origin', () => {
    const build = mockedOrigin('scripts/build-e2e.ts')
    const setup = mockedOrigin('tests/e2e/setup.ts')

    expect(
      build,
      'scripts/build-e2e.ts must declare a quoted http origin for the mocked backend',
    ).toBeTruthy()
    expect(
      setup,
      'tests/e2e/setup.ts must declare the same origin as scripts/build-e2e.ts',
    ).toBe(build)
  })
})

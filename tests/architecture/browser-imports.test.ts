import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Modules that ship to the browser: the runtime-value domain modules, the
// booking adapter, and every component whose <script> bundle imports them.
// For .astro entries only the <script> sections are part of the client
// bundle — the frontmatter is compiled away server-side.
const browserEntryModules = [
  'src/domain/events.ts',
  'src/domain/availability.ts',
  'src/client/event-booking.ts',
  'src/components/blocks/Event.astro',
  'src/components/blocks/Events.astro',
  'src/components/blocks/PreBooking.astro',
]

// Imports that would drag server-only code (or Zod itself) into the client
// bundle. Covers both the bare specifier ('zod') and the Astro re-export
// ('astro/zod').
const forbiddenSources = ['zod', 'astro/zod', '@/content-schemas', '@/api/events-server']

interface ImportStatement {
  source: string
  typeOnly: boolean
  sideEffect: boolean
}

function readModule(path: string): string {
  return readFileSync(resolve(process.cwd(), path), 'utf8')
}

/** For .astro files, only the <script> sections ship to the browser. */
function browserRelevantSource(path: string, moduleSource: string): string {
  if (!path.endsWith('.astro')) {
    return moduleSource
  }
  const sections = moduleSource.match(/<script[^>]*>[\s\S]*?<\/script>/g) ?? []
  return sections.join('\n')
}

function importsFrom(source: string): ImportStatement[] {
  const imports: ImportStatement[] = []

  const fromPattern = /import\s+(type\s+)?([^;]+?)\s+from\s+['"]([^'"]+)['"]/g
  let match: RegExpExecArray | null
  while ((match = fromPattern.exec(source)) !== null) {
    const typeKeyword = match[1] !== undefined
    const bindings = match[2].trim()
    const everyBindingIsType = bindings
      .replace(/^\{|\}$/g, '')
      .split(',')
      .map((binding) => binding.trim())
      .every((binding) => binding.startsWith('type ') || binding.length === 0)

    imports.push({
      source: match[3],
      typeOnly: typeKeyword || everyBindingIsType,
      sideEffect: false,
    })
  }

  // Bare side-effect imports (`import 'zod'`) carry no bindings but still
  // pull the module into the bundle.
  const sideEffectPattern = /import\s+['"]([^'"]+)['"]/g
  while ((match = sideEffectPattern.exec(source)) !== null) {
    imports.push({ source: match[1], typeOnly: false, sideEffect: true })
  }

  return imports
}

function isForbidden(source: string): boolean {
  return forbiddenSources.includes(source) || source.startsWith('zod/')
}

/**
 * Resolves `@/` aliases and relative specifiers to a file under `src/`.
 * Returns null for external modules ('date-fns', 'astro:env/client', ...).
 */
function resolveModule(specifier: string, fromPath: string): string | null {
  let basePath: string | null = null
  if (specifier.startsWith('@/')) {
    basePath = `src/${specifier.slice(2)}`
  } else if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const dir = fromPath.slice(0, fromPath.lastIndexOf('/'))
    basePath = resolve(process.cwd(), dir, specifier).slice(process.cwd().length + 1)
  } else {
    return null
  }

  for (const candidate of [`${basePath}.ts`, `${basePath}.astro`, `${basePath}/index.ts`]) {
    try {
      readFileSync(resolve(process.cwd(), candidate))
      return candidate
    } catch {
      // try the next extension
    }
  }
  return null
}

interface ClosureViolation {
  entry: string
  importer: string
  source: string
}

/**
 * Walks the runtime import graph (type-only imports are erased at compile
 * time, so they are excluded) reachable from a browser entry module and
 * reports every forbidden import — direct OR transitive. This is the test
 * seam that keeps Zod out of the client bundle even when it is reintroduced
 * through an intermediary module, where a direct-import check would stay
 * green while the chunk regresses.
 */
function forbiddenImportsInClosure(entry: string): ClosureViolation[] {
  const violations: ClosureViolation[] = []
  const visited = new Set<string>()
  const queue: string[] = [entry]

  while (queue.length > 0) {
    const path = queue.shift()!
    if (visited.has(path)) {
      continue
    }
    visited.add(path)

    const source = browserRelevantSource(path, readModule(path))
    for (const { source: specifier, typeOnly } of importsFrom(source)) {
      if (!typeOnly && isForbidden(specifier)) {
        violations.push({ entry, importer: path, source: specifier })
      }
      if (typeOnly) {
        continue
      }
      const resolved = resolveModule(specifier, path)
      if (resolved && !visited.has(resolved)) {
        queue.push(resolved)
      }
    }
  }

  return violations
}

describe('browser-facing module imports', () => {
  it('keeps src/types.ts free of runtime imports', () => {
    const runtimeImports = importsFrom(readModule('src/types.ts')).filter(
      (importStatement) => !importStatement.typeOnly,
    )

    expect(runtimeImports).toEqual([])
  })

  it.each(browserEntryModules)('imports src/types.ts type-only in %s', (path) => {
    const typesImports = importsFrom(readModule(path)).filter(
      (importStatement) => importStatement.source === '@/types',
    )

    for (const importStatement of typesImports) {
      expect(importStatement.typeOnly).toBe(true)
    }
  })

  it.each(browserEntryModules)(
    'keeps %s free of direct Zod and server event loader imports',
    (path) => {
      const imports = importsFrom(readModule(path)).filter(
        (importStatement) => !importStatement.typeOnly,
      )

      expect(imports.filter((importStatement) => isForbidden(importStatement.source))).toEqual([])
    },
  )

  it('keeps the availability domain free of browser adapters', () => {
    const imports = importsFrom(readModule('src/domain/availability.ts'))
      .filter((importStatement) => !importStatement.typeOnly)
      .map((importStatement) => importStatement.source)

    expect(imports).not.toContain('@/client/rollbar')
    expect(imports).not.toContain('@/api/events-server')
    expect(imports).toEqual([])
  })

  it('keeps Zod and server-only loaders out of the transitive browser bundle graph', () => {
    const violations = browserEntryModules.flatMap((entry) => forbiddenImportsInClosure(entry))

    expect(violations).toEqual([])
  })
})

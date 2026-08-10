import { execSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { readdirSync, statSync } from 'node:fs'
import { basename, join, relative, sep } from 'node:path'
import { SITE } from '@/config.mjs'

const ROLLBAR_UPLOAD_URL = 'https://api.rollbar.com/api/1/sourcemap'

export type FetchFn = (input: string, init?: RequestInit) => Promise<Response>
export type ReadFileFn = (path: string) => Promise<BlobPart>

export interface UploadParams {
  accessToken: string
  version: string
  minifiedUrl: string
  sourceMapPath: string
}

export interface UploadDeps {
  fetchImpl: FetchFn
  readFileImpl?: ReadFileFn
}

/**
 * Resolve the build's git SHA. Priority: `GIT_SHA` env (set by the build
 * command), then Netlify's `COMMIT_REF`, then `git rev-parse HEAD`. Returned
 * raw — both this `version` and the client `code_version` payload read the
 * same `GIT_SHA`, so an occurrence and its source map always share a key.
 * A SHA-1 git SHA / Netlify `COMMIT_REF` is 40 chars (Rollbar's documented
 * `code_version` max); a longer value would need truncation on both sides.
 */
export function getGitSha(env: NodeJS.ProcessEnv = process.env): string {
  const fromEnv = env.GIT_SHA || env.COMMIT_REF
  if (fromEnv) return fromEnv
  return execSync('git rev-parse HEAD').toString().trim()
}

/** Recursively collect every `*.js.map` path under `distDir`. */
export function findSourceMaps(distDir: string): string[] {
  const results: string[] = []
  function walk(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        walk(full)
        continue
      }
      if (entry.endsWith('.js.map')) results.push(full)
    }
  }
  walk(distDir)
  return results
}

/**
 * Build the `minified_url` Rollbar matches stack-trace frames against: the
 * shipped `.js` URL without schema, e.g. `//www.sv-eutingen.de/_astro/x.js`.
 * Derived from the `.js.map` path by stripping the trailing `.map`.
 */
export function minifiedUrl(
  mapPath: string,
  distDir: string,
  host: string,
  basePath: string,
): string {
  const relativePath = relative(distDir, mapPath).split(sep).join('/')
  const minifiedPath = relativePath.replace(/\.map$/, '')
  const prefix = basePath === '/' ? '' : basePath.replace(/\/$/, '')
  return `//${host}${prefix}/${minifiedPath}`
}

export async function uploadSourceMap(params: UploadParams, deps: UploadDeps): Promise<boolean> {
  const blob = new Blob([await (deps.readFileImpl ?? readFile)(params.sourceMapPath)])
  const form = new FormData()
  form.append('access_token', params.accessToken)
  form.append('version', params.version)
  form.append('minified_url', params.minifiedUrl)
  form.append('source_map', blob, basename(params.sourceMapPath))

  const response = await deps.fetchImpl(ROLLBAR_UPLOAD_URL, { method: 'POST', body: form })
  if (!response.ok) {
    const body = await response.text().catch(() => '<no body>')
    console.error(
      `Rollbar source map upload failed (${response.status}) for ${params.minifiedUrl}: ${body}`,
    )
    return false
  }
  return true
}

/** Orchestrator: importable + testable; called by `main()` only when run as entry. */
export async function runUpload(
  distDir: string,
  env: NodeJS.ProcessEnv = process.env,
  deps: UploadDeps,
): Promise<{ uploaded: number; skipped: boolean }> {
  const accessToken = env.ROLLBAR_POST_SERVER_ITEM_TOKEN
  const gitSha = getGitSha(env)
  const maps = findSourceMaps(distDir)
  const subdomain = env.SUBDOMAIN

  if (!accessToken) {
    console.warn('ROLLBAR_POST_SERVER_ITEM_TOKEN not set — skipping Rollbar source map upload.')
    return { uploaded: 0, skipped: true }
  }
  if (maps.length === 0) {
    console.warn(`No .js.map files found under ${distDir} — skipping source map upload.`)
    return { uploaded: 0, skipped: true }
  }
  if (!subdomain) {
    console.error('SUBDOMAIN not set — cannot construct minified_url for source map upload.')
    return { uploaded: 0, skipped: true }
  }

  const host = `${subdomain}.sv-eutingen.de`
  let uploaded = 0
  for (const mapPath of maps) {
    const ok = await uploadSourceMap(
      {
        accessToken,
        version: gitSha,
        minifiedUrl: minifiedUrl(mapPath, distDir, host, SITE.basePathname),
        sourceMapPath: mapPath,
      },
      deps,
    )
    if (ok) uploaded++
  }
  console.log(`Uploaded ${uploaded}/${maps.length} source maps to Rollbar (version ${gitSha}).`)
  return { uploaded, skipped: false }
}

async function main(): Promise<void> {
  const distDir = join(process.cwd(), 'dist')
  const result = await runUpload(distDir, process.env, { fetchImpl: fetch })
  // A skipped run (missing token / no maps) is not a build failure; an upload
  // attempt that completed but uploaded zero maps is surfaced as a warning
  // above, not an error exit.
  if (!result.skipped && result.uploaded === 0) process.exitCode = 1
}

const isEntry = typeof Bun !== 'undefined' && (import.meta as { main?: boolean }).main === true
if (isEntry) {
  await main()
}

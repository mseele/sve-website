import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

vi.mock('node:child_process', () => {
  const execSync = vi.fn()
  return { default: { execSync }, execSync }
})

const mockedExecSync = vi.mocked(execSync)

const { getGitSha, findSourceMaps, minifiedUrl, uploadSourceMap, runUpload } =
  await import('../../scripts/upload-sourcemaps')

interface TmpDir {
  path: string
  cleanup: () => void
}

function makeTmpDir(): TmpDir {
  const path = mkdtempSync(join(tmpdir(), 'sve-sourcemap-'))
  return { path, cleanup: () => rmSync(path, { recursive: true, force: true }) }
}

describe('getGitSha', () => {
  const originalGitSha = process.env.GIT_SHA
  const originalCommitRef = process.env.COMMIT_REF

  afterEach(() => {
    if (originalGitSha === undefined) delete process.env.GIT_SHA
    else process.env.GIT_SHA = originalGitSha
    if (originalCommitRef === undefined) delete process.env.COMMIT_REF
    else process.env.COMMIT_REF = originalCommitRef
    mockedExecSync.mockReset()
  })

  it('prefers GIT_SHA env', () => {
    process.env.GIT_SHA = 'envsha123'
    delete process.env.COMMIT_REF
    expect(getGitSha()).toBe('envsha123')
    expect(mockedExecSync).not.toHaveBeenCalled()
  })

  it('falls back to COMMIT_REF when GIT_SHA missing', () => {
    delete process.env.GIT_SHA
    process.env.COMMIT_REF = 'commitref456'
    expect(getGitSha()).toBe('commitref456')
    expect(mockedExecSync).not.toHaveBeenCalled()
  })

  it('falls back to git rev-parse HEAD when both env vars missing', () => {
    delete process.env.GIT_SHA
    delete process.env.COMMIT_REF
    mockedExecSync.mockReturnValue(Buffer.from('abcdef0000000000000000000000000000000000\n'))
    expect(getGitSha()).toBe('abcdef0000000000000000000000000000000000')
    expect(mockedExecSync).toHaveBeenCalledWith('git rev-parse HEAD')
  })

  it('returns the env value raw (no truncation), matching the client code_version', () => {
    process.env.GIT_SHA = 'raw-version-string'
    delete process.env.COMMIT_REF
    expect(getGitSha()).toBe('raw-version-string')
  })
})

describe('findSourceMaps', () => {
  let dir: TmpDir

  beforeEach(() => {
    dir = makeTmpDir()
  })

  afterEach(() => {
    dir.cleanup()
  })

  it('collects only .js.map files recursively', () => {
    mkdirSync(join(dir.path, '_astro'))
    mkdirSync(join(dir.path, 'deep', 'nested'), { recursive: true })
    writeFileSync(join(dir.path, '_astro', 'Event.js.map'), '{}')
    writeFileSync(join(dir.path, '_astro', 'Event.js'), 'code')
    writeFileSync(join(dir.path, '_astro', 'styles.css.map'), '{}')
    writeFileSync(join(dir.path, 'deep', 'nested', 'Chunk.js.map'), '{}')
    writeFileSync(join(dir.path, 'index.html'), '<html></html>')

    const maps = findSourceMaps(dir.path).map((p) => p.replace(dir.path + '/', ''))

    expect(maps.sort()).toEqual(['_astro/Event.js.map', 'deep/nested/Chunk.js.map'])
  })

  it('returns empty array when no maps exist', () => {
    writeFileSync(join(dir.path, 'index.html'), '<html></html>')
    expect(findSourceMaps(dir.path)).toEqual([])
  })
})

describe('minifiedUrl', () => {
  const distDir = '/project/dist'
  const host = 'www.sv-eutingen.de'

  it('builds a schema-less URL for a flat _astro chunk at root base', () => {
    expect(minifiedUrl('/project/dist/_astro/Event-abc.js.map', distDir, host, '/')).toBe(
      '//www.sv-eutingen.de/_astro/Event-abc.js',
    )
  })

  it('honours a non-root base path', () => {
    expect(minifiedUrl('/project/dist/_astro/x.js.map', distDir, host, '/sub')).toBe(
      '//www.sv-eutingen.de/sub/_astro/x.js',
    )
  })
})

describe('uploadSourceMap', () => {
  it('POSTs a multipart form with token, version, minified_url and source_map', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"err":0}', { status: 200 }))
    const readFileImpl = vi.fn(async () => Buffer.from('{"version":3,"sources":[]}'))

    const ok = await uploadSourceMap(
      {
        accessToken: 'tok',
        version: 'sha1',
        minifiedUrl: '//www.sv-eutingen.de/_astro/x.js',
        sourceMapPath: '/dist/_astro/x.js.map',
      },
      { fetchImpl, readFileImpl },
    )

    expect(ok).toBe(true)
    expect(fetchImpl).toHaveBeenCalledOnce()
    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    const [, init] = call
    expect(init.method).toBe('POST')
    const form = init.body as FormData
    expect(form.get('access_token')).toBe('tok')
    expect(form.get('version')).toBe('sha1')
    expect(form.get('minified_url')).toBe('//www.sv-eutingen.de/_astro/x.js')
    const blob = form.get('source_map') as Blob
    expect(blob).toBeInstanceOf(Blob)
    expect(await blob.text()).toBe('{"version":3,"sources":[]}')
    expect(readFileImpl).toHaveBeenCalledWith('/dist/_astro/x.js.map')
  })

  it('returns false and logs on non-ok response', async () => {
    const fetchImpl = vi.fn(async () => new Response('boom', { status: 400 }))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ok = await uploadSourceMap(
      {
        accessToken: 'tok',
        version: 'sha1',
        minifiedUrl: '//www.sv-eutingen.de/_astro/x.js',
        sourceMapPath: '/dist/_astro/x.js.map',
      },
      { fetchImpl, readFileImpl: async () => Buffer.from('{}') },
    )

    expect(ok).toBe(false)
    errorSpy.mockRestore()
  })
})

describe('runUpload', () => {
  let dir: TmpDir
  const originalSubdomain = process.env.SUBDOMAIN

  beforeEach(() => {
    dir = makeTmpDir()
    mkdirSync(join(dir.path, '_astro'))
    writeFileSync(join(dir.path, '_astro', 'A.js.map'), '{}')
    writeFileSync(join(dir.path, '_astro', 'B.js.map'), '{}')
  })

  afterEach(() => {
    dir.cleanup()
    if (originalSubdomain === undefined) delete process.env.SUBDOMAIN
    else process.env.SUBDOMAIN = originalSubdomain
  })

  it('skips gracefully when ROLLBAR_POST_SERVER_ITEM_TOKEN is missing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchImpl = vi.fn()
    const result = await runUpload(dir.path, { GIT_SHA: 'sha', SUBDOMAIN: 'www' }, { fetchImpl })
    expect(result).toEqual({ uploaded: 0, skipped: true })
    expect(fetchImpl).not.toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('ROLLBAR_POST_SERVER_ITEM_TOKEN not set'),
    )
    warnSpy.mockRestore()
  })

  it('skips when no .js.map files are present', async () => {
    const empty = makeTmpDir()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchImpl = vi.fn()
    const result = await runUpload(
      empty.path,
      { ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok', GIT_SHA: 'sha', SUBDOMAIN: 'www' },
      { fetchImpl },
    )
    expect(result).toEqual({ uploaded: 0, skipped: true })
    expect(fetchImpl).not.toHaveBeenCalled()
    empty.cleanup()
    warnSpy.mockRestore()
  })

  it('skips when SUBDOMAIN is missing', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetchImpl = vi.fn()
    const result = await runUpload(
      dir.path,
      { ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok', GIT_SHA: 'sha' },
      { fetchImpl },
    )
    expect(result).toEqual({ uploaded: 0, skipped: true })
    expect(fetchImpl).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('uploads every map and returns the count', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"err":0}', { status: 200 }))
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const result = await runUpload(
      dir.path,
      { ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok', GIT_SHA: 'sha', SUBDOMAIN: 'www' },
      { fetchImpl },
    )

    expect(result).toEqual({ uploaded: 2, skipped: false })
    expect(fetchImpl).toHaveBeenCalledTimes(2)
    const urls = fetchImpl.mock.calls.map((call) => {
      const init = (call as unknown as [string, RequestInit])[1]
      return init.body as FormData
    })
    expect(urls[0].get('version')).toBe('sha')
    expect(urls.map((f) => f.get('minified_url')).sort()).toEqual([
      '//www.sv-eutingen.de/_astro/A.js',
      '//www.sv-eutingen.de/_astro/B.js',
    ])
    logSpy.mockRestore()
  })
})

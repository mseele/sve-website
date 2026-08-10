import { afterEach, describe, expect, it, vi } from 'vitest'
import { execSync } from 'node:child_process'

vi.mock('node:child_process', () => {
  const execSync = vi.fn()
  return { default: { execSync }, execSync }
})

const mockedExecSync = vi.mocked(execSync)

const { getGitSha, resolveEnvironment, notifyDeploy, runNotify } =
  await import('../../scripts/notify-rollbar-deploy')

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
})

describe('resolveEnvironment', () => {
  it('returns staging when PREVIEW is true', () => {
    expect(resolveEnvironment('true')).toBe('staging')
  })

  it('returns production when PREVIEW is false', () => {
    expect(resolveEnvironment('false')).toBe('production')
  })

  it('returns production when PREVIEW is undefined', () => {
    expect(resolveEnvironment(undefined)).toBe('production')
  })

  it('returns production for any non-true value', () => {
    expect(resolveEnvironment('')).toBe('production')
    expect(resolveEnvironment('0')).toBe('production')
    expect(resolveEnvironment('yes')).toBe('production')
  })
})

describe('notifyDeploy', () => {
  it('POSTs deploy data to Rollbar as form-urlencoded', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"data":{"id":123}}', { status: 200 }))

    const ok = await notifyDeploy(
      {
        accessToken: 'tok',
        environment: 'production',
        revision: 'abc123',
      },
      { fetchImpl },
    )

    expect(ok).toBe(true)
    expect(fetchImpl).toHaveBeenCalledOnce()
    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(call[0]).toBe('https://api.rollbar.com/api/1/deploy/')
    const [, init] = call
    expect(init.method).toBe('POST')
    expect(init.headers).toEqual({ 'Content-Type': 'application/x-www-form-urlencoded' })
    const body = init.body as string
    const params = new URLSearchParams(body)
    expect(params.get('access_token')).toBe('tok')
    expect(params.get('environment')).toBe('production')
    expect(params.get('revision')).toBe('abc123')
    expect(params.get('local_username')).toBeNull()
  })

  it('includes local_username when provided', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"data":{"id":123}}', { status: 200 }))

    const ok = await notifyDeploy(
      {
        accessToken: 'tok',
        environment: 'staging',
        revision: 'abc123',
        localUsername: 'mseele',
      },
      { fetchImpl },
    )

    expect(ok).toBe(true)
    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    const [, init] = call
    const body = init.body as string
    const params = new URLSearchParams(body)
    expect(params.get('local_username')).toBe('mseele')
  })

  it('returns false and logs on non-ok response', async () => {
    const fetchImpl = vi.fn(async () => new Response('invalid token', { status: 401 }))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const ok = await notifyDeploy(
      { accessToken: 'bad', environment: 'production', revision: 'abc' },
      { fetchImpl },
    )

    expect(ok).toBe(false)
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Rollbar deploy notification failed (401)'),
    )
    errorSpy.mockRestore()
  })
})

describe('runNotify', () => {
  it('skips gracefully when ROLLBAR_POST_SERVER_ITEM_TOKEN is missing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchImpl = vi.fn()

    const result = await runNotify({ GIT_SHA: 'sha', PREVIEW: 'false' }, { fetchImpl })

    expect(result).toEqual({ notified: false, skipped: true })
    expect(fetchImpl).not.toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('ROLLBAR_POST_SERVER_ITEM_TOKEN not set'),
    )
    warnSpy.mockRestore()
  })

  it('notifies Rollbar and returns notified: true on success', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"data":{"id":123}}', { status: 200 }))
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const result = await runNotify(
      {
        ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok',
        GIT_SHA: 'sha1',
        PREVIEW: 'false',
      },
      { fetchImpl },
    )

    expect(result).toEqual({ notified: true, skipped: false })
    expect(fetchImpl).toHaveBeenCalledOnce()
    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    const [, init] = call
    const params = new URLSearchParams(init.body as string)
    expect(params.get('environment')).toBe('production')
    expect(params.get('revision')).toBe('sha1')
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Notified Rollbar of deploy: sha1 to production'),
    )
    logSpy.mockRestore()
  })

  it('sends staging environment when PREVIEW is true', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"data":{"id":123}}', { status: 200 }))

    await runNotify(
      {
        ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok',
        GIT_SHA: 'sha1',
        PREVIEW: 'true',
      },
      { fetchImpl },
    )

    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    const [, init] = call
    const params = new URLSearchParams(init.body as string)
    expect(params.get('environment')).toBe('staging')
  })

  it('returns notified: false on API failure', async () => {
    const fetchImpl = vi.fn(async () => new Response('error', { status: 500 }))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await runNotify(
      { ROLLBAR_POST_SERVER_ITEM_TOKEN: 'tok', GIT_SHA: 'sha', PREVIEW: 'false' },
      { fetchImpl },
    )

    expect(result).toEqual({ notified: false, skipped: false })
    errorSpy.mockRestore()
  })
})

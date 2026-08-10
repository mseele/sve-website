import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockRollbarError = vi.fn()
const MockRollbar = vi.fn(function () {
  return { error: mockRollbarError }
})

vi.mock('rollbar', () => ({ default: MockRollbar }))
vi.mock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined, GIT_SHA: undefined }))

describe('reportError', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('always calls console.error with the error argument', async () => {
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined, GIT_SHA: undefined }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(consoleErrorSpy).toHaveBeenCalledWith('test error')
  })

  it('does not call Rollbar.error when token is not set', async () => {
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined, GIT_SHA: undefined }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(mockRollbarError).not.toHaveBeenCalled()
  })

  it('calls Rollbar.error when token is set', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(mockRollbarError).toHaveBeenCalledWith('test error', undefined)
  })

  it('passes Error instances directly to Rollbar', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    const { reportError } = await import('@/client/rollbar')

    const err = new Error('test error object')
    reportError(err)

    expect(mockRollbarError).toHaveBeenCalledWith(err, undefined)
    expect(consoleErrorSpy).toHaveBeenCalledWith(err)
  })

  it('passes context as custom data to Rollbar', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    const { reportError } = await import('@/client/rollbar')

    const err = new Error('booking failed')
    reportError(err, { component: 'PreBooking', eventId: 'abc123', availability: 'FullyBooked' })

    expect(mockRollbarError).toHaveBeenCalledWith(err, {
      custom: { component: 'PreBooking', eventId: 'abc123', availability: 'FullyBooked' },
    })
  })

  it('passes context with custom data for string errors', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    const { reportError } = await import('@/client/rollbar')

    reportError('something went wrong', { query: 'parseEventAvailability sessionStorage' })

    expect(mockRollbarError).toHaveBeenCalledWith('something went wrong', {
      custom: { query: 'parseEventAvailability sessionStorage' },
    })
  })

  it('does not pass custom data when context is omitted', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    const { reportError } = await import('@/client/rollbar')

    reportError(new Error('simple error'))

    expect(mockRollbarError).toHaveBeenCalledWith(expect.any(Error), undefined)
  })

  it('creates Rollbar with source map + code_version config when token is set', async () => {
    MockRollbar.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: 'abc1234',
    }))
    await import('@/client/rollbar')

    expect(MockRollbar).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: 'test-token',
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: expect.objectContaining({
          client: {
            javascript: {
              source_map_enabled: true,
              code_version: 'abc1234',
              guess_uncaught_frames: true,
            },
          },
        }),
      }),
    )
  })

  it('omits code_version (undefined) when GIT_SHA is missing', async () => {
    MockRollbar.mockClear()
    vi.doMock('astro:env/client', () => ({
      ROLLBAR_ACCESS_TOKEN: 'test-token',
      GIT_SHA: undefined,
    }))
    await import('@/client/rollbar')

    const calls = MockRollbar.mock.calls as unknown as Array<
      [
        {
          payload: {
            client: { javascript: { code_version?: string; source_map_enabled?: boolean } }
          }
        },
      ]
    >
    const config = calls[0][0]
    expect(config.payload.client.javascript.code_version).toBeUndefined()
    expect(config.payload.client.javascript.source_map_enabled).toBe(true)
  })

  it('does not create Rollbar when token is missing', async () => {
    MockRollbar.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined, GIT_SHA: undefined }))
    await import('@/client/rollbar')

    expect(MockRollbar).not.toHaveBeenCalled()
  })
})

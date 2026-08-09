import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockRollbarError = vi.fn()
const MockRollbar = vi.fn(function () {
  return { error: mockRollbarError }
})

vi.mock('rollbar', () => ({ default: MockRollbar }))
vi.mock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined }))

describe('reportError', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('always calls console.error with the same arguments', async () => {
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(consoleErrorSpy).toHaveBeenCalledWith('test error')
  })

  it('does not call Rollbar.error when token is not set', async () => {
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(mockRollbarError).not.toHaveBeenCalled()
  })

  it('calls Rollbar.error when token is set', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: 'test-token' }))
    const { reportError } = await import('@/client/rollbar')

    reportError('test error')

    expect(mockRollbarError).toHaveBeenCalledWith('test error')
  })

  it('passes Error instances directly to Rollbar', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: 'test-token' }))
    const { reportError } = await import('@/client/rollbar')

    const err = new Error('test error object')
    reportError(err)

    expect(mockRollbarError).toHaveBeenCalledWith(err)
    expect(consoleErrorSpy).toHaveBeenCalledWith(err)
  })

  it('handles multiple arguments by joining non-Error args', async () => {
    mockRollbarError.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: 'test-token' }))
    const { reportError } = await import('@/client/rollbar')

    reportError('msg', 'extra')

    expect(consoleErrorSpy).toHaveBeenCalledWith('msg', 'extra')
    expect(mockRollbarError).toHaveBeenCalledWith('msg extra')
  })

  it('creates Rollbar with correct config when token is set', async () => {
    MockRollbar.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: 'test-token' }))
    await import('@/client/rollbar')

    expect(MockRollbar).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: 'test-token',
        captureUncaught: true,
        captureUnhandledRejections: true,
      }),
    )
  })

  it('does not create Rollbar when token is missing', async () => {
    MockRollbar.mockClear()
    vi.doMock('astro:env/client', () => ({ ROLLBAR_ACCESS_TOKEN: undefined }))
    await import('@/client/rollbar')

    expect(MockRollbar).not.toHaveBeenCalled()
  })
})

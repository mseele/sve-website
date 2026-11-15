import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'
import { onUnhandledFrame } from './mocks/on-unhandled-frame'

beforeAll(() => server.listen({ onUnhandledFrame }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

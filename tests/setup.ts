import { afterAll, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterAll(() => server.close())

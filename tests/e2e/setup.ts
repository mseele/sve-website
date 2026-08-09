import { test as base, type Page } from '@playwright/test'
import {
  bookingSuccessResponse,
  rawCounterFixture,
  rawEventsFixture,
} from '../mocks/handlers/events'
import { formsSuccessResponse } from '../mocks/handlers/forms'

const BACKEND_API = process.env.BACKEND_API || 'http://backend.test'

const hcaptchaInitScript = `
  class HCaptchaMock extends HTMLElement {
    execute() {}
    executeAsync() {
      return Promise.resolve({ response: 'test-token', key: 'test-ekey' })
    }
    reset() {}
    close() {}
  }
  customElements.define('h-captcha', HCaptchaMock)
  const originalDefine = customElements.define.bind(customElements)
  customElements.define = function(name, constructor, options) {
    if (name === 'h-captcha') return
    return originalDefine(name, constructor, options)
  }
  window.hcaptcha = {
    render: () => 'hcaptcha-mock-id',
    getResponse: () => 'test-token',
    getRespKey: () => 'test-ekey',
    execute: () => Promise.resolve({ response: 'test-token', key: 'test-ekey' }),
    reset: () => {},
    close: () => {},
  }
`

const e2eCounterFixture = {
  ...rawCounterFixture,
  id: 'evt-2',
}

const e2eCounterAfterBookingFixture = {
  ...e2eCounterFixture,
  subscribers: e2eCounterFixture.subscribers + 1,
}

interface BackendFixture {
  booking: { body: Record<string, unknown>; token: string }[]
  membership: { body: Record<string, unknown>; token: string }[]
  news: { body: Record<string, unknown>; subscribe: boolean }[]
}

export const test = base.extend<{ backend: BackendFixture }>({
  backend: async ({ page }, use) => {
    const backend: BackendFixture = {
      booking: [],
      membership: [],
      news: [],
    }

    await page.addInitScript(hcaptchaInitScript)

    await page.route('**/*', async (route, request) => {
      const url = new URL(request.url())
      if (url.origin !== new URL(BACKEND_API).origin) {
        return route.continue()
      }

      const pathname = url.pathname
      if (pathname === '/events') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(rawEventsFixture),
        })
      }
      if (pathname === '/events/counter') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([e2eCounterFixture]),
        })
      }
      if (pathname === '/events/booking') {
        const body = (await request.postDataJSON()) as Record<string, unknown>
        backend.booking.push({ body, token: String(body.token ?? '') })
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ...bookingSuccessResponse,
            counter: [e2eCounterAfterBookingFixture],
          }),
        })
      }
      if (pathname === '/membership/application') {
        const body = (await request.postDataJSON()) as Record<string, unknown>
        backend.membership.push({ body, token: String(body.token ?? '') })
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      }
      if (pathname === '/news/subscribe') {
        const body = (await request.postDataJSON()) as Record<string, unknown>
        backend.news.push({ body, subscribe: true })
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(formsSuccessResponse),
        })
      }
      if (pathname === '/news/unsubscribe') {
        const body = (await request.postDataJSON()) as Record<string, unknown>
        backend.news.push({ body, subscribe: false })
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(formsSuccessResponse),
        })
      }
      if (pathname === '/contact/message') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(formsSuccessResponse),
        })
      }

      return route.continue()
    })

    await use(backend)
  },
})

export const expect = test.expect

export async function assertNotification(page: Page, title: string, message: string) {
  const notification = page.locator('#notification-popup')
  await expect(notification).toHaveAttribute('open', '')
  await expect(notification.locator('#title')).toHaveText(title)
  await expect(notification.locator('#message')).toHaveText(message)
}

export const VALID_IBAN = 'DE89 3704 0044 0532 0130 00'
export const TEST_EMAIL = 'test@example.com'

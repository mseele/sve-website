import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { manageSubscription, sendContactMessage } from '@/api/forms'
import { server } from '../mocks/server'
import {
  CONTACT_MESSAGE_URL,
  NEWS_SUBSCRIBE_URL,
  NEWS_UNSUBSCRIBE_URL,
} from '../mocks/handlers/forms'

describe('sendContactMessage — mutating POST contact route', () => {
  it('asserts request shape: URL, POST, Content-Type application/json, body shape {type, to, name, email, phone, message, token}', async () => {
    let capturedMethod: string | undefined = undefined
    let capturedContentType: string | null = null
    let capturedUrl: string | undefined = undefined
    let capturedBody: any = undefined
    server.use(
      http.post(CONTACT_MESSAGE_URL, async ({ request }) => {
        capturedMethod = request.method
        capturedContentType = request.headers.get('Content-Type')
        capturedUrl = request.url
        capturedBody = await request.json()
        return HttpResponse.json({ success: true, message: 'sent' })
      }),
    )

    const response = await sendContactMessage(
      'vorstand@sv-eutingen.de',
      '  Max Mustermann  ',
      '  max@example.org  ',
      ' 0176 1234567 ',
      '  Hallo Welt  ',
      'captcha-token',
    )

    expect(response.ok).toBe(true)
    expect(capturedMethod).toBe('POST')
    expect(new URL(capturedUrl!).pathname).toBe('/api/contact/message')
    expect(capturedContentType).toBe('application/json')
    expect(capturedBody).toEqual({
      type: 'General',
      to: 'vorstand@sv-eutingen.de',
      name: 'Max Mustermann',
      email: 'max@example.org',
      phone: '0176 1234567',
      message: 'Hallo Welt',
      token: 'captcha-token',
    })
  })

  it('omits phone (sets it undefined) when the caller passes `undefined`', async () => {
    let capturedBody: any
    server.use(
      http.post(CONTACT_MESSAGE_URL, async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json({ success: true })
      }),
    )

    await sendContactMessage('recip', 'Max', 'max@example.org', undefined, 'msg', 'tok')

    expect(capturedBody).toEqual({
      type: 'General',
      to: 'recip',
      name: 'Max',
      email: 'max@example.org',
      phone: undefined,
      message: 'msg',
      token: 'tok',
    })
  })

  it('returns the raw 2xx Response (caller proceeds with response.ok)', async () => {
    server.use(http.post(CONTACT_MESSAGE_URL, () => HttpResponse.json({ success: true })))

    const response = await sendContactMessage('to', 'n', 'e', undefined, 'm', 't')
    expect(response.ok).toBe(true)
    expect(response.status).toBe(200)
  })

  it('failure path: returns the raw non-2xx Response without throwing', async () => {
    server.use(
      http.post(CONTACT_MESSAGE_URL, () =>
        HttpResponse.json({ message: 'invalid' }, { status: 422 }),
      ),
    )

    const response = await sendContactMessage('to', 'n', 'e', undefined, 'm', 't')
    expect(response.ok).toBe(false)
    expect(response.status).toBe(422)
  })

  it('failure path: 500 also surfaces as raw Response', async () => {
    server.use(http.post(CONTACT_MESSAGE_URL, () => HttpResponse.json({}, { status: 500 })))
    const response = await sendContactMessage('to', 'n', 'e', undefined, 'm', 't')
    expect(response.ok).toBe(false)
    expect(response.status).toBe(500)
  })
})

describe('manageSubscription — mutating POST news route', () => {
  it('asserts request shape for subscribe=true: URL, POST, Content-Type, body {email, types, token}', async () => {
    let capturedMethod: string | undefined = undefined
    let capturedContentType: string | null = null
    let capturedUrl: string | undefined = undefined
    let capturedBody: any = undefined
    server.use(
      http.post(NEWS_SUBSCRIBE_URL, async ({ request }) => {
        capturedMethod = request.method
        capturedContentType = request.headers.get('Content-Type')
        capturedUrl = request.url
        capturedBody = await request.json()
        return HttpResponse.json({ success: true })
      }),
    )

    const response = await manageSubscription(
      true,
      'subscriber@example.org',
      true,
      false,
      true,
      'token-7',
    )

    expect(response.ok).toBe(true)
    expect(capturedMethod).toBe('POST')
    expect(capturedContentType).toBe('application/json')
    expect(new URL(capturedUrl!).pathname).toBe('/api/news/subscribe')
    expect(capturedBody).toEqual({
      email: 'subscriber@example.org',
      types: ['General', 'Events'],
      token: 'token-7',
    })
  })

  it('asserts request shape for subscribe=false: POST /news/unsubscribe', async () => {
    let capturedUrl: string | undefined = undefined
    let capturedBody: any
    server.use(
      http.post(NEWS_UNSUBSCRIBE_URL, async ({ request }) => {
        capturedUrl = request.url
        capturedBody = await request.json()
        return HttpResponse.json({ success: true })
      }),
    )

    const response = await manageSubscription(
      false,
      'unsub@example.org',
      true,
      true,
      true,
      'token-9',
    )

    expect(response.ok).toBe(true)
    expect(new URL(capturedUrl!).pathname).toBe('/api/news/unsubscribe')
    expect(capturedBody).toEqual({
      email: 'unsub@example.org',
      types: ['General', 'Fitness', 'Events'],
      token: 'token-9',
    })
  })

  it('emits an empty `types` array when no category is selected', async () => {
    let capturedBody: any
    server.use(
      http.post(NEWS_SUBSCRIBE_URL, async ({ request }) => {
        capturedBody = await request.json()
        return HttpResponse.json({ success: true })
      }),
    )

    await manageSubscription(true, 'e@example.org', false, false, false, 'tok')
    expect(capturedBody).toEqual({ email: 'e@example.org', types: [], token: 'tok' })
  })

  it('returns the raw 2xx Response', async () => {
    server.use(http.post(NEWS_SUBSCRIBE_URL, () => HttpResponse.json({ success: true })))
    const response = await manageSubscription(true, 'e', true, false, false, 'tok')
    expect(response.ok).toBe(true)
    expect(response.status).toBe(200)
  })

  it('failure path: returns the raw 4xx Response without throwing (subscribe path)', async () => {
    server.use(
      http.post(NEWS_SUBSCRIBE_URL, () => HttpResponse.json({ message: 'bad' }, { status: 400 })),
    )
    const response = await manageSubscription(true, 'e', true, false, false, 'tok')
    expect(response.ok).toBe(false)
    expect(response.status).toBe(400)
  })

  it('failure path: returns the raw 5xx Response without throwing (unsubscribe path)', async () => {
    server.use(http.post(NEWS_UNSUBSCRIBE_URL, () => HttpResponse.json({}, { status: 503 })))
    const response = await manageSubscription(false, 'e', true, false, false, 'tok')
    expect(response.ok).toBe(false)
    expect(response.status).toBe(503)
  })
})

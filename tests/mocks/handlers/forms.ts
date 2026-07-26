import { http, HttpResponse } from 'msw'
import { BACKEND_API } from '../backend'

export const CONTACT_MESSAGE_URL = `${BACKEND_API}/contact/message`
export const NEWS_SUBSCRIBE_URL = `${BACKEND_API}/news/subscribe`
export const NEWS_UNSUBSCRIBE_URL = `${BACKEND_API}/news/unsubscribe`

export const formsSuccessResponse = { success: true, message: 'OK' }

export const formsHandlers = [
  http.post(`${CONTACT_MESSAGE_URL}`, () => HttpResponse.json(formsSuccessResponse)),
  http.post(`${NEWS_SUBSCRIBE_URL}`, () => HttpResponse.json(formsSuccessResponse)),
  http.post(`${NEWS_UNSUBSCRIBE_URL}`, () => HttpResponse.json(formsSuccessResponse)),
]

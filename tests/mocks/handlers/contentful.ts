import { http, HttpResponse } from 'msw'

const emptyEntries = () => HttpResponse.json({ items: [], total: 0, skip: 0, limit: 100 })

export const contentfulHandlers = [
  http.get(
    'https://cdn.contentful.com/spaces/:spaceId/environments/:environmentId/entries',
    emptyEntries,
  ),
  http.get(
    'https://preview.contentful.com/spaces/:spaceId/environments/:environmentId/entries',
    emptyEntries,
  ),
  http.get('https://cdn.contentful.com/spaces/:spaceId/entries', emptyEntries),
  http.get('https://preview.contentful.com/spaces/:spaceId/entries', emptyEntries),
]

export const telemetryHandlers = [
  http.post(
    'https://telemetry.astro.build/api/v1/record',
    () => new HttpResponse(null, { status: 200 }),
  ),
  http.get('https://api.fontsource.org/v1/fonts', () => HttpResponse.json([])),
]

process.env.BACKEND_API = 'http://backend.test'
process.env.PREVIEW = 'false'
process.env.CAPTCHA_SITE_KEY =
  process.env.CAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'
process.env.CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'test-space'
process.env.CONTENTFUL_DELIVERY_TOKEN =
  process.env.CONTENTFUL_DELIVERY_TOKEN || 'test-delivery-token'
process.env.CONTENTFUL_PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN || 'test-preview-token'
process.env.SUBDOMAIN = process.env.SUBDOMAIN || 'test'

const { build } = await import('astro')
const { e2eServer } = await import('../tests/mocks/e2e-server')

e2eServer.listen({ onUnhandledRequest: 'error' })

try {
  await build({})
} finally {
  e2eServer.close()
}

export {}

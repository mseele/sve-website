let BACKEND_API: string

try {
  const env = await import('astro:env/client')
  BACKEND_API = env.BACKEND_API
} catch {
  BACKEND_API = process.env.BACKEND_API || 'http://backend.test'
}

export { BACKEND_API }

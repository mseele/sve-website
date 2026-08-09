import { serve } from 'bun'
import { statSync } from 'fs'
import { extname, join } from 'path'

const port = Number(process.env.PORT || 4321)

const contentTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
}

function isFile(path: string): boolean {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

function resolveFile(pathname: string): string | undefined {
  const staticFile = join('dist', pathname)
  if (isFile(staticFile)) return staticFile

  if (pathname.endsWith('/')) {
    const indexPath = join('dist', pathname, 'index.html')
    if (isFile(indexPath)) return indexPath
    return undefined
  }

  const nestedIndex = join('dist', `${pathname}/index.html`)
  if (isFile(nestedIndex)) return nestedIndex

  const flatHtml = join('dist', `${pathname}.html`)
  if (isFile(flatHtml)) return flatHtml

  return undefined
}

serve({
  port,
  fetch(request) {
    const url = new URL(request.url)
    const pathname = url.pathname

    const filePath = pathname === '/' ? join('dist', 'index.html') : resolveFile(pathname)

    if (filePath) {
      const file = Bun.file(filePath)
      const ext = extname(filePath)
      const contentType = contentTypes[ext] || file.type || 'application/octet-stream'
      return new Response(file, {
        headers: { 'Content-Type': contentType },
      })
    }

    console.log('[E2E PREVIEW] 404', pathname)
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`E2E preview server running at http://localhost:${port}`)

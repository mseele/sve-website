import { defineConfig, sharpImageService, envField } from 'astro/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import { SITE } from './src/config.mjs'
import netlify from '@astrojs/netlify'

const { SUBDOMAIN } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site:
    import.meta.env.MODE === `production`
      ? `https://${SUBDOMAIN}.sv-eutingen.de/`
      : `http://localhost:4321/`,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  adapter: netlify(),
  integrations: [
    tailwind(),
    icon({
      iconDir: 'src/assets/icons'
    }),
    sitemap(),
    robotsTxt()
  ],
  image: {
    service: sharpImageService()
  },
  experimental: {
    contentLayer: true,
    env: {
      schema: {
        SUBDOMAIN: envField.string({ context: 'server', access: 'public' }),
        BACKEND_API: envField.string({ context: 'client', access: 'public' })
      }
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})

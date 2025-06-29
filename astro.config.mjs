import { defineConfig, sharpImageService, envField } from 'astro/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import { SITE } from './src/config.mjs'
import netlify from '@astrojs/netlify'
import pagefind from 'astro-pagefind'
import tailwindcss from '@tailwindcss/vite'

const { SUBDOMAIN, PREVIEW } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD ? `https://${SUBDOMAIN}.sv-eutingen.de/` : `http://localhost:4321/`,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  adapter: netlify(),
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
    }),
    sitemap(),
    robotsTxt({
      policy: PREVIEW === 'true' ? [{ userAgent: '*', disallow: '/' }] : undefined,
    }),
    pagefind(),
  ],
  image: {
    service: sharpImageService(),
  },
  env: {
    schema: {
      SUBDOMAIN: envField.string({ context: 'server', access: 'public' }),
      BACKEND_API: envField.string({ context: 'client', access: 'public' }),
      PREVIEW: envField.boolean({ context: 'client', access: 'public' }),
      CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
      CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'public' }),
      CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'public' }),
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [tailwindcss()],
  },
})

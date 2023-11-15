import { defineConfig, sharpImageService } from 'astro/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'

import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'

import { SITE } from './src/config.mjs'

const { SUBDOMAIN } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: `https://${SUBDOMAIN}.sv-eutingen.de/`,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  output: 'static',

  integrations: [tailwind(), sitemap(), robotsTxt()],

  image: {
    service: sharpImageService()
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})

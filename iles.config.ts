import { defineConfig } from 'iles'
import images, { hdPreset } from '@islands/images'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  siteUrl: 'https://www.sv-eutingen.de',
  modules: [
    images(
      {
        full: hdPreset({
          widths: [400, 800, 1200, 1800, 2400, 3000],
          sizes: '100vw',
          formats: {
            // avif: { quality: 75 },
            webp: { quality: 75 },
            jpg: { quality: 75 },
          },
        }),
        card: hdPreset({
          widths: [200, 400, 800, 1200, 1800],
          sizes: '(min-width: 1536px) 30vw, (min-width: 1024px) 50vw, 100vw',
          formats: {
            // avif: { quality: 55 },
            webp: { quality: 55 },
            jpg: { quality: 55 },
          },
        }),
      },
      { cacheDir: '_cache' }
    ),
  ],
  vite: {
    plugins: [svgLoader()],
  },
})

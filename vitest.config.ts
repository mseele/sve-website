import { getViteConfig } from 'astro/config'
import { defineConfig } from 'vitest/config'

export default defineConfig(
  getViteConfig({
    test: {
      environment: 'happy-dom',
      env: { TZ: 'UTC' },
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.ts'],
    },
  }),
)

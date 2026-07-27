// Ambient declarations for `.astro` modules used by Container API render tests.
//
// `tsc --noEmit` (run by `bun run check`) lacks the Astro Vite plugin, so
// importing `.astro` files from `.ts` test modules raises TS2307. This file
// declares a permissive ambient module for every `.astro` import under test
// typed as an Astro component factory, matching the parameter shape expected
// by `experimental_AstroContainer.renderToString`. The Astro Vite plugin
// emits the real factory at runtime under vitest.
//
// The file is a global script (no top-level import/export) so the
// `declare module` is treated as a true ambient declaration, not a module
// augmentation. Type-only imports are pulled in via a triple-slash
// reference instead.

/// <reference types="astro" />

declare module '*.astro' {
  const Component: import('astro').AstroComponentFactory
  export default Component
}

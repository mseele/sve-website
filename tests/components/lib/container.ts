// @vitest-environment node
// Shared harness for Container API render tests.
//
// Vitest's default `happy-dom` environment stubs `.astro` module imports to a
// browser-only errored shell ("Astro components cannot be used in the
// browser"). Per-file `@vitest-environment node` lets the Astro Vite plugin
// emit the SSR component factory instead.
//
// `Astro.site` is left `undefined` by `experimental_AstroContainer.create()`
// (the container config defaults elide `site`). Components whose frontmatter
// computes a canonical URL via `new URL(path, Astro.site)` throw under the
// container; components that pull in `Layout` mock
// `@/components/common/MetaTags.astro` against `./MetaTagsStub.astro` to
// stay off that unhappy path while keeping the test about the markup.
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { load as cheerioLoad, type CheerioAPI } from 'cheerio'

let containerPromise: Promise<AstroContainer> | undefined

export async function getContainer(): Promise<AstroContainer> {
  if (!containerPromise) containerPromise = AstroContainer.create()
  return containerPromise
}

export async function render(
  Component: Parameters<AstroContainer['renderToString']>[0],
  options?: Parameters<AstroContainer['renderToString']>[1],
): Promise<{ html: string; $: CheerioAPI }> {
  const container = await getContainer()
  const html = await container.renderToString(Component, options)
  return { html, $: cheerioLoad(html) }
}

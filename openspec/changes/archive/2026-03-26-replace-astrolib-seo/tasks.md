## 1. Dependency Management

- [x] 1.1 Remove `@astrolib/seo` from package.json dependencies
- [x] 1.2 Add `astro-seo` to package.json dependencies (version ^1.1.0)
- [x] 1.3 Run dependency install (bun install / npm install)

## 2. MetaTags Component Update

- [x] 2.1 Update import statement: change `@astrolib/seo` to `astro-seo` and rename `AstroSeo` to `SEO`
- [x] 2.2 Remove manual `<link data-pagefind-meta="url[href]" rel="canonical" href={canonical} />` line
- [x] 2.3 Remove the TODO comment about canonical bug
- [x] 2.4 Replace `<AstroSeo>` component with `<SEO>`
- [x] 2.5 Restructure `openGraph` prop to use nested `.basic` and `.optional` objects per astro-seo API
- [x] 2.6 Verify image handling: keep `getImage()` processing, pass `image.toString()` in `images` array inside `optional`
- [x] 2.7 Update types if necessary (MetaSEO interface may need adjustment for astro-seo compatibility)

## 3. Build Verification

- [x] 3.1 Run `bun run build` to ensure production build succeeds
- [x] 3.2 Run `bun run check` to verify TypeScript and Astro checks pass
- [x] 3.3 Start dev server and review MetaTags output on multiple pages (homepage, article, event pages)
- [x] 3.4 Verify canonical tag appears exactly once (no duplicates)
- [x] 3.5 Verify Open Graph tags include: og:title, og:type, og:url, og:image, og:locale
- [x] 3.6 Confirm charset meta tag is present and first in head

## 4. SEO Testing

- [x] 4.1 Use browser DevTools to inspect generated HTML and verify proper tag structure
- [x] 4.2 Test with Facebook Sharing Debugger or similar to validate Open Graph (skipped - requires external validation)
- [x] 4.3 Test with Twitter Card Validator (if Twitter cards desired in future) (skipped - optional)
- [x] 4.4 Run Lighthouse SEO audit to confirm no regressions (skipped - Lighthouse not available)

## 5. Optional Enhancements (Future Work)

- [ ] 5.1 Add Twitter Card support (optional, out of scope for this migration)
- [ ] 5.2 Consider structured data / JSON-LD integration
- [ ] 5.3 Explore astro-seo's `extend` prop for any custom meta tags

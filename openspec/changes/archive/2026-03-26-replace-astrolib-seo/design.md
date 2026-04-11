## Context

Current state: SV Eutingen website uses `@astrolib/seo` (v1.0.0-beta.8) for SEO metadata generation in the `MetaTags.astro` component. The library is effectively abandoned (no releases, 10 open issues, critical canonical URL bug). The codebase contains a manual canonical link workaround with a TODO comment referencing the unfixed issue.

Proposed change: Replace `@astrolib/seo` with `astro-seo` (v1.1.0) which is actively maintained, production-tested (8.7k dependents), and provides the required features plus extras (Twitter Cards, structured data support, better Open Graph handling).

Key constraint: The `MetaTags` prop interface (`MetaSEO` type) must remain unchanged to avoid breaking all page components that consume it.

## Goals / Non-Goals

**Goals:**

- Swap dependency with zero breaking changes to existing page components
- Eliminate manual canonical workaround
- Gain access to additional SEO features (Twitter Cards, better Open Graph validation, structured data)
- Improve maintainability (actively maintained library with good documentation)

**Non-Goals:**

- Implement Twitter Card support (deferred to future enhancement)
- Add structured data / JSON-LD (not in current scope)
- Redesign MetaTags API (must maintain backward compatibility)
- Change SEO strategy or content approach

## Decisions

### Decision 1: Use `astro-seo` over alternatives

**Choice**: `astro-seo` (jonasmerlin/astro-seo) over `@astrolib/seo` (unmaintained) or custom implementation.

**Rationale**:

- Active maintenance: 31 releases, most recent Jan 2026
- Large adoption: 62k weekly downloads, 8.7k dependent repos
- Feature-complete for basic SEO needs (title, description, canonical, Open Graph)
- Clean Astro integration, written in Astro itself
- Low open issue count (2) indicates stability
- MIT license matches project

**Alternatives considered**:

- **Continue with @astrolib/seo**: Rejected due to abandoned state and critical bugs
- **Build custom solution**: Would need to reimplement many features (Open Graph tags, Twitter Cards, validation, etc.) - not justified given existing library
- **@astrojs/seo** (official): No such package exists in Astro ecosystem

### Decision 2: Preserve MetaTags component wrapper

**Choice**: Keep the existing `MetaTags.astro` wrapper component rather than replacing all usages with direct `astro-seo` imports.

**Rationale**:

- Encapsulates change to single file
- Maintains abstraction layer that could accommodate multiple SEO strategies in future
- Preserves site-specific logic (site name, language, trailing slash handling)
- Allows gradual evolution without touching dozens of page files
- Matches existing architectural pattern (wrapper components for third-party integrations)

**Alternatives considered**:

- **Direct replacement everywhere**: Would require updating all page components - too invasive
- **Create new wrapper + deprecate old**: Not necessary since wrapper API stays the same

### Decision 3: Remove manual canonical link

**Choice**: Delete the manually-rendered canonical `<link>` tag and rely on astro-seo's built-in canonical handling.

**Rationale**:

- astro-seo correctly handles canonical URL generation using Astro's URL APIs
- Eliminates duplicate canonical tags (SEO best practice: only one per page)
- Removes the workaround code and TODO comment
- astro-seo supports explicit canonical prop if needed

**Risks**: Must verify astro-seo's canonical behavior matches the current custom logic, especially regarding trailing slash handling. The design assumes they produce equivalent output.

### Decision 4: Simplify image handling

**Choice**: Pass image URL string to astro-seo instead of pre-processing with `getImage()` and URL construction.

**Rationale**:

- astro-seo expects a string URL for og:image
- Current code uses `getImage()` to generate optimized image, but the SEO component doesn't need that - it just needs the URL
- The image optimization can be handled by the page's image components separately
- Reduces complexity in MetaTags

**Trade-off**: We lose Open Graph image optimization (width/height) if we don't pre-process. However, the MetaTags component currently specifies 1200×628 in `getImage()` which is Open Graph's recommended size. We should either:

- Keep the `getImage()` call to ensure proper image dimensions for social sharing, OR
- Document that pages should provide already-optimized images

Preferred: **Keep the image processing** because it ensures correct OG image dimensions. The difference is we can pass `.src.toString()` directly to astro-seo instead of the current object structure.

Actually, re-evaluating: The spec says "image URL strings", but we can still do the `getImage()` processing - that's internal implementation. The key is we don't need to build a `new URL()` wrapper. So we'll keep optimizing the image but pass the string URL directly.

## Risks / Trade-offs

### Risk: astro-seo canonical differs from current implementation

**Impact**: SEO impact if canonical URLs change subtly
**Likelihood**: Medium
**Mitigation**: Compare output before/after in staging environment. Test various trailing slash scenarios, path-only canonical, explicit canonical overrides.

### Risk: astro-seo lacks a feature we rely on

**Impact**: Broken SEO functionality
**Likelihood**: Low (already audited features)
**Mitigation**: Review astro-seo's feature set against current usage. Tests will catch missing functionality. Fallback: Use `extend` prop to add custom tags.

### Risk: New dependency introduces vulnerabilities

**Impact**: Security exposure
**Likelihood**: Low (popular package with 28 contributors)
**Mitigation**: Review package's dependencies, monitor `npm audit` in CI, update regularly.

### Risk: Migration breaks in production

**Impact**: SEO ranking impact, broken social sharing
**Likelihood**: Low (small change)
**Mitigation**:

- Test locally with `astro build` and preview
- Deploy to staging first
- Verify metadata with Google Rich Results Test and social sharing debuggers
- Have rollback plan: revert package.json and MetaTags.astro changes

## Migration Plan

1. **Local development**
   - Update `package.json`: remove `@astrolib/seo`, add `astro-seo`
   - Run `bun install` (or appropriate package manager)
   - Update `src/components/common/MetaTags.astro`:
     - Change import: `import { SEO } from 'astro-seo'`
     - Remove manual `<link rel="canonical">`
     - Replace `<AstroSeo>` with `<SEO>`
     - Convert `openGraph` prop from flat object to nested structure:
       ````diff
                       openGraph={{
                       -   url: canonical,
                       -   title: ogTitle,
                       -   description: description,
                       -   type: ogType,
                       -   locale: ogLocale,
                       +   basic: {
                       +     title: ogTitle,
                       +     type: ogType,
                       -   images: [...]   // move to optional
                       +     url: canonical,
                       +   },
                       +   optional: {
                       +     description: description,
                       +     locale: ogLocale,
                       -   locale: ogLocale,  // remove from here
                       +     images: [...]
                       +   }
                       }}
                       ```
       ````
     - Keep image processing logic, pass string URL: `images: image ? [{ url: image.toString(), alt: ogTitle }] : undefined`
   - Update types if needed (should be compatible)
   - Run `bun run check` and `bun run build` locally
   - Verify no TypeScript errors

2. **Testing**
   - Start dev server, inspect multiple page types
   - Use browser DevTools to verify:
     - Canonical tag appears once (from SEO component)
     - Open Graph tags present with correct structure
     - No duplicate/missing tags
   - Social debugger test: Use Facebook Sharing Debugger or Twitter Card Validator on staging
   - Lighthouse/SEO audit

3. **Staging deployment**
   - Deploy to Netlify preview or staging environment
   - Repeat verification with external tools
   - Check Google Search Console (if connected) for crawl errors

4. **Production rollout**
   - Merge PR
   - Deploy to production
   - Monitor for 24-48h: Check analytics, crawl stats, any error reports
   - If issues discovered: hotfix rollback (revert changes)

**Rollback**:

- Git revert of the PR
- Temporary repin `@astrolib/seo` and restore MetaTags.astro

## Open Questions

- Should we also add Twitter Card support as part of this change? (Not currently used, but astro-seo supports it)
- Should we enable `removeTrailingSlashForRoot` in astro-seo? Site uses `trailingSlash: false` - might be worth enabling for consistency.
- Do we need to configure any astro-seo options (e.g., `titleDefault`, `languageAlternates`)?

Recommendation: Keep scope minimal - only swap the library. Enhancements can follow later as separate changes.

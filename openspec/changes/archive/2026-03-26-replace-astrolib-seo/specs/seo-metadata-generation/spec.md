## ADDED Requirements

### Requirement: SEO metadata uses astro-seo component

The MetaTags component SHALL render SEO metadata using the `SEO` component from the `astro-seo` package.

#### Scenario: Successful rendering with basic metadata

- **WHEN** a page provides title and description via MetaTags props
- **THEN** system renders appropriate `<title>` and `<meta name="description">` tags using the SEO component

#### Scenario: Open Graph support

- **WHEN** a page provides ogTitle, ogType, ogLocale, and image props
- **THEN** system renders complete Open Graph tags including og:title, og:type, og:locale, and og:image with proper attributes

### Requirement: Canonical URL automatically handled

The MetaTags component SHALL NOT manually render a canonical `<link>` tag. The `astro-seo` component SHALL generate the canonical URL automatically based on the current page URL and site configuration.

#### Scenario: Canonical derived from current URL

- **WHEN** no explicit canonical prop is provided
- **THEN** the SEO component uses `Astro.url.href` as the canonical URL

#### Scenario: Explicit canonical supported

- **WHEN** an explicit canonical prop is provided to MetaTags
- **THEN** the SEO component uses that value for the canonical URL

### Requirement: Backward-compatible prop interface

The MetaTags component SHALL maintain its existing `Props` interface (extending `MetaSEO`) to ensure no breaking changes for consuming pages.

#### Scenario: Existing page props work unchanged

- **WHEN** a page uses MetaTags with existing props (title, description, image, noindex, nofollow, canonical, ogTitle, ogType, ogLocale)
- **THEN** the page renders correctly with all SEO tags

### Requirement: Image handling simplified

The MetaTags component SHALL pass image URLs as strings to astro-seo, without requiring manual `getImage()` processing or URL construction.

#### Scenario: Image URL passed directly

- **WHEN** an image is provided via the image prop
- **THEN** the SEO component receives a string URL (the component may internally handle image optimization, but the prop is a simple URL)

### Requirement: UTF-8 charset default

The MetaTags component SHALL include `<meta charset="UTF-8">` as the first meta tag in the head.

#### Scenario: Charset declaration present

- **WHEN** any page is rendered
- **THEN** the charset meta tag appears before all other head content

### Requirement: Title template customization

The MetaTags component SHALL support customizing the title format via a `dontUseTitleTemplate` flag. When false (default), titles SHALL follow the pattern: `%s — ${SITE.name}`.

#### Scenario: Default title template

- **WHEN** dontUseTitleTemplate is false or undefined and page title is "Home"
- **THEN** the rendered title is "Home — SV Eutingen 1947 e.V."

#### Scenario: No title template

- **WHEN** dontUseTitleTemplate is true and page title is "Home"
- **THEN** the rendered title is "Home"

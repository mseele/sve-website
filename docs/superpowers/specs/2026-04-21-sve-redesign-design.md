# SV Eutingen Website — Complete Redesign Specification

**Date:** 2026-04-21
**Direction:** Clean & Premium Sports Club
**Priority:** Mobile First
**Scope:** All pages, all components

---

## 1. Design Principles

1. **Mobile first** — every component designed for small screens, then enhanced for desktop
2. **Clean & premium** — editorial typography, generous whitespace, minimal decoration
3. **Consistent** — same spacing, color, typography, and component patterns across all pages
4. **Purposeful animation** — scroll-triggered fades, hover lifts, smooth transitions. Respect `prefers-reduced-motion`
5. **Accessible** — WCAG 2.1 AA contrast, keyboard navigation, semantic HTML, proper labels

---

## 2. Color System

### Light Mode

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `primary` | `#C41E3A` | `bg-primary` | CTAs, active nav links, accent headings, links |
| `primary-dark` | `#991B3A` | custom | Hover for primary buttons |
| `primary-light` | `#FFF1F2` | `bg-primary-light` | Subtle primary backgrounds, badges |
| `secondary` | `#047404` | `bg-secondary` | Success states, fitness sections, confirmations |
| `secondary-light` | `#F0FDF4` | custom | Subtle secondary backgrounds |
| `accent` | `#D7BD5E` | `bg-accent` | Gold from logo — badges, highlights, special callouts |
| `background` | `#FAFAF9` | `bg-background` | Page background |
| `surface` | `#FFFFFF` | `bg-surface` | Cards, elevated elements |
| `surface-elevated` | `#F5F5F4` | custom | Hover states, secondary cards, code blocks |
| `text-primary` | `#1C1917` | `text-primary-text` | Headings, main text |
| `text-secondary` | `#57534E` | `text-secondary-text` | Body text, descriptions |
| `text-muted` | `#A8A29E` | `text-muted-text` | Captions, labels, metadata |
| `border` | `#E7E5E4` | `border-border` | Card borders, dividers |
| `border-subtle` | `#F5F5F4` | custom | Subtle separators |

### Dark Mode

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `primary` | `#EF4444` | `dark:bg-primary` | CTAs, active states — brighter for contrast |
| `primary-dark` | `#DC2626` | custom | Hover for primary buttons |
| `primary-light` | `#450A0A` | custom | Subtle primary backgrounds |
| `secondary` | `#22C55E` | `dark:bg-secondary` | Success states |
| `secondary-light` | `#052E16` | custom | Subtle secondary backgrounds |
| `accent` | `#E8D68C` | custom | Gold accents |
| `background` | `#1C1917` | `dark:bg-background` | Page background |
| `surface` | `#292524` | `dark:bg-surface` | Cards, elevated elements |
| `surface-elevated` | `#44403C` | custom | Hover states, secondary cards |
| `text-primary` | `#FAFAF9` | custom | Headings, main text |
| `text-secondary` | `#A8A29E` | custom | Body text, descriptions |
| `text-muted` | `#78716C` | custom | Captions, labels, metadata |
| `border` | `#44403C` | custom | Card borders, dividers |
| `border-subtle` | `#57534E` | custom | Subtle separators |

### Tailwind v4 Theme Configuration

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Primary — Red (#C41E3A) */
  --color-primary: #C41E3A;
  --color-primary-dark: #991B3A;
  --color-primary-light: #FFF1F2;

  /* Secondary — Green (#047404) */
  --color-secondary: #047404;

  /* Accent — Gold from logo (#D7BD5E) */
  --color-accent: #D7BD5E;

  /* Neutrals — Warm stone palette */
  --color-background: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F5F5F4;
  --color-border: #E7E5E4;
  --color-border-subtle: #F5F5F4;

  /* Semantic text colors */
  --color-text-primary: #1C1917;
  --color-text-secondary: #57534E;
  --color-text-muted: #A8A29E;

  /* Kept for compatibility */
  --color-dark: #1C1917;
  --color-darker: #292524;

  --font-sans:
    var(--font-dm-sans), 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
    '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif';
  --font-serif: 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif';
  --font-mono:
    'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"',
    '"Courier New"', 'monospace';
}
```

### Dark Mode Override Strategy

In Tailwind v4 with `@custom-variant dark`, dark mode colors are overridden using utility classes in the HTML or component templates. Since Tailwind v4 doesn't support per-color dark variants in `@theme`, we use a combination approach:

**1. Global overrides in `global.css`:**

```css
@layer base {
  .dark {
    --color-primary: #EF4444;
    --color-primary-dark: #DC2626;
    --color-primary-light: #450A0A;
    --color-secondary: #22C55E;
    --color-accent: #E8D68C;
    --color-background: #1C1917;
    --color-surface: #292524;
    --color-surface-elevated: #44403C;
    --color-border: #44403C;
    --color-border-subtle: #57534E;
    --color-text-primary: #FAFAF9;
    --color-text-secondary: #A8A29E;
    --color-text-muted: #78716C;
  }
}
```

**2. Component-level dark mode:** Use `dark:` prefix with Tailwind's built-in color classes for cases not covered by CSS custom properties (e.g., `dark:bg-stone-800`, `dark:text-white`, `dark:border-stone-700`).

When both approaches could apply, prefer the CSS custom property (e.g., `bg-primary`) over the explicit Tailwind class (e.g., `bg-red-600`) — this ensures dark mode automatically picks up the override.

---

## 3. Typography System

**Font Family:** DM Sans (already configured as `--font-dm-sans`)

### Scale

| Level | Mobile | Tablet (md) | Desktop (lg) | Weight | Tracking | Line Height | Class |
|-------|--------|------------|-------------|--------|----------|-------------|-------|
| Display | 40px | 56px | 72px | 700 | -0.02em | 1.1 | `text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight` |
| H1 | 32px | 40px | 48px | 700 | -0.01em | 1.2 | `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` |
| H2 | 28px | 36px | 40px | 600 | -0.01em | 1.2 | `text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight` |
| H3 | 22px | 24px | 28px | 600 | 0 | 1.3 | `text-xl md:text-2xl lg:text-3xl font-semibold` |
| H4 | 18px | 18px | 20px | 600 | 0 | 1.4 | `text-lg lg:text-xl font-semibold` |
| Body | 16px | 16px | 17px | 400 | 0 | 1.7 | `text-base lg:text-[17px] leading-relaxed` |
| Body Large | 18px | 18px | 20px | 400 | 0 | 1.6 | `text-lg lg:text-xl leading-relaxed` |
| Label | 12px | 12px | 13px | 600 | 0.05em | 1.4 | `text-xs md:text-[13px] font-semibold uppercase tracking-widest` |
| Caption | 12px | 12px | 13px | 500 | 0 | 1.5 | `text-xs md:text-[13px] font-medium` |

### Section Header Pattern

Every section heading uses this consistent structure:

```astro
<div class="mb-10 md:mb-16 text-center">
  <span class="text-xs md:text-[13px] font-semibold uppercase tracking-widest text-primary">Label</span>
  <h2 class="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-white">Heading</h2>
  <p class="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">Description text that provides context for this section.</p>
</div>
```

Left-aligned variant (for detail pages):

```astro
<div class="mb-10 md:mb-16">
  <span class="text-xs md:text-[13px] font-semibold uppercase tracking-widest text-primary">Label</span>
  <h2 class="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">Heading</h2>
  <p class="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl">Description text.</p>
</div>
```

---

## 4. Spacing System

### Section Spacing

All page sections use consistent vertical padding:

```
py-16 md:py-24 lg:py-32
```

Exception: Hero sections use `pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24`.

### Container

```
mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
```

Wider than current `max-w-6xl` for a more modern, spacious feel.

### Grid Gaps

```
gap-6 md:gap-8 lg:gap-10
```

### Content Max Widths

- Prose text blocks: `max-w-2xl` (672px)
- Section descriptions: `max-w-2xl mx-auto` when centered
- Contact forms: `max-w-lg` (512px)
- Detail page content: `max-w-3xl` (768px)

---

## 5. Border Radius Scale

| Name | Value | Usage |
|------|-------|-------|
| `rounded-xl` | 12px | Buttons, inputs, small cards |
| `rounded-2xl` | 16px | Cards, content containers, image containers |
| `rounded-3xl` | 24px | Hero sections, modals, major sections |
| `rounded-full` | 9999px | Pills, badges, avatars, circular buttons |

---

## 6. Component Specifications

### 6.1 Navigation (AppHeader)

**Fixed header with backdrop blur:**

```
fixed top-0 inset-x-0 z-50 h-16 md:h-20
bg-white/80 dark:bg-stone-900/80 backdrop-blur-md
border-b border-stone-200/80 dark:border-stone-700/80
transition-all duration-300
```

**Layout:**
- Logo (icon + "SV Eutingen" text) — left
- Top links (Teamsport, Events, Fitness) — center, hidden on mobile
- Actions (search icon, theme toggle, hamburger) — right

**Mobile menu:**
- Full overlay with `bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl`
- Animated slide-down entrance
- All 7 nav links listed vertically
- Theme toggle and external links at bottom
- Close on link click or backdrop tap

**Active state:** Current page link gets `text-primary` color and a subtle `border-b-2 border-primary` indicator.

**Scroll behavior:** Header gains a stronger `bg-white dark:bg-stone-900` background and shadow on scroll (via Intersection Observer on a sentinel element, not scroll event).

### 6.2 Hero Section (HeroSection)

**Structure (Desktop):** Two-column layout. Text left (55%), image right (45%).

**Structure (Mobile):** Stacked — text on top, image below.

```
min-h-[70vh] md:min-h-[80vh]
relative overflow-hidden
```

**Text column:**
```
pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24
```

- Small label: `text-xs md:text-[13px] font-semibold uppercase tracking-widest text-primary`
- Heading: Display size, `text-stone-900 dark:text-white`
- Description: `text-lg text-stone-600 dark:text-stone-400 max-w-md`
- CTAs: flex row, gap-4, primary + secondary buttons

**Image column:**
- `rounded-2xl overflow-hidden` on image container
- No `scale-105` hover on hero images (too distracting at this size)

**Background accent:** Subtle gradient from primary-light, visible on mobile only:
```
bg-gradient-to-b from-primary-light via-transparent to-transparent
opacity-50 md:hidden
```

### 6.3 Cards (Card, BlogItem, NewsItem)

**Base card style:**

```
bg-white dark:bg-stone-800
border border-stone-200 dark:border-stone-700
rounded-2xl
overflow-hidden
transition-all duration-300
hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-stone-900/50
```

**Card content padding:**
```
p-5 md:p-6
```

**Card image:**
- Container: `overflow-hidden rounded-t-2xl` (if image is at top)
- Image: `w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105`
- Mobile image height: `h-48` (192px)
- Desktop image height: `h-56` (224px)

**Card with description:**

```
<div class="group flex flex-col h-full [card-classes]">
  <div class="overflow-hidden rounded-t-2xl">
    <Picture class="h-48 md:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
  </div>
  <div class="flex flex-col grow p-5 md:p-6">
    <h3 class="text-xl md:text-2xl font-semibold text-stone-900 dark:text-white">{title}</h3>
    <p class="mt-2 grow text-stone-600 dark:text-stone-400">{description}</p>
    <a class="mt-6 text-primary dark:text-red-400 font-medium hover:underline">Mehr erfahren →</a>
  </div>
</div>
```

**NewsItem variant (horizontal on desktop):**

```
responsive: flex-col sm:flex-row
gap-6 sm:gap-8
image: sm:w-2/5
content: sm:w-3/5
```

**Card link wrapper:** `cursor-pointer` on all clickable cards.

### 6.4 Buttons (Button)

**Primary:**

```
inline-flex items-center justify-center
h-11 md:h-12
px-6 md:px-8
rounded-full
bg-primary text-white
font-semibold text-sm md:text-base
transition-all duration-200
hover:bg-primary-dark hover:scale-[1.02]
active:scale-[0.98]
disabled:opacity-60 disabled:cursor-default disabled:hover:scale-100
```

**Secondary:**

```
inline-flex items-center justify-center
h-11 md:h-12
px-6 md:px-8
rounded-full
border-2 border-stone-300 dark:border-stone-600
text-stone-900 dark:text-white
font-semibold text-sm md:text-base
transition-all duration-200
hover:border-primary hover:text-primary dark:hover:text-primary
active:scale-[0.98]
```

**Ghost (link-style button):**

```
inline-flex items-center gap-1
text-primary dark:text-red-400
font-medium
transition-colors duration-200
hover:underline
```

### 6.5 Forms (Input, Select, Textarea, Checkbox, Switch)

**Input wrapper:**

```
relative space-y-2
has-disabled:pointer-events-none has-disabled:opacity-50
```

**Label:**

```
block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5
```

**Input/Select/Textarea base:**

```
h-11 w-full rounded-xl
border-2 border-stone-200 dark:border-stone-700
bg-white dark:bg-stone-800
px-4 text-sm text-stone-900 dark:text-white
placeholder:text-stone-400
shadow-sm
transition-all duration-200
focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
invalid:border-red-500 invalid:text-red-500 invalid:focus:ring-red-500/20
disabled:opacity-50 disabled:cursor-default
```

**Select:** Same as input but with custom dropdown arrow (SVG chevron).

**Textarea:** Same as input but `min-h-[120px] py-3`.

**Checkbox:** Keep current custom checkbox design but update colors to use new palette.

**Switch:** Keep current switch design but update colors.

**Submit button:** Uses primary Button component with loading spinner overlay.

### 6.6 Footer (AppFooter)

```
border-t border-stone-200 dark:border-stone-800
bg-stone-50 dark:bg-stone-900
py-12 md:py-16
```

- Centered layout
- Logo + "#mehralseinverein" tagline
- Navigation links in horizontal flex row with `gap-4 md:gap-8`
- Social icons row
- Copyright text

### 6.7 Section Background Variants

Pages that use the HeaderSection component or similar sections need consistent background treatments:

| Variant | Light Mode | Dark Mode | Usage |
|---------|-----------|-----------|-------|
| Default | `bg-background` | `bg-background` | Most pages |
| Alternate | `bg-stone-50` | `bg-surface` | Alternating sections |
| Accent | `bg-primary-light` | `bg-primary-light` | Highlighted sections, CTAs |

**Gradient backgrounds (decorative, header sections only):**

Replace the current blur-blob approach with subtle gradient accents:
- Red variant: `bg-gradient-to-b from-primary-light/50 via-background to-background`
- Green variant: `bg-gradient-to-b from-secondary-light/50 via-background to-background`
- Neutral variant: `bg-gradient-to-b from-stone-100 via-background to-background`

### 6.8 Contact Cards

```
bg-white dark:bg-stone-800
border border-stone-200 dark:border-stone-700
rounded-3xl
overflow-hidden
```

Two-column layout on desktop (`lg:flex-row lg:divide-x`), stacked on mobile.

**Contact methods list:**

```
flex items-center gap-4 py-4
border-b border-stone-100 dark:border-stone-700 last:border-b-0
```

Icon box: `flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-700`

### 6.9 FAQ / Accordion

```
border-y border-stone-200 dark:border-stone-700
```

Question button:
```
flex w-full items-center justify-between py-5 text-left text-stone-900 dark:text-white
```

Answer container:
```
overflow-hidden transition-all duration-300
max-h-0 (closed) / max-h-[scrollHeight]px (open)
```

Chevron icon: `transition-transform duration-300 rotate-0 (closed) / rotate-180 (open)`

### 6.10 Badge / Tag Pills

```
inline-flex items-center
rounded-full px-3 py-1
text-xs md:text-sm font-medium
```

| Variant | Light | Dark |
|---------|-------|------|
| Primary | `bg-primary-light text-primary-dark` | `bg-primary/20 text-primary` |
| Success | `bg-secondary-light text-secondary-dark` | `bg-secondary/20 text-secondary` |
| Outlined | `border border-stone-300 text-stone-700 dark:border-stone-600 dark:text-stone-300` | |

### 6.11 Image Gallery / Carousel

- `rounded-2xl overflow-hidden` on all images
- Carousel with snap scrolling (keep existing behavior)
- Navigation dots: `h-2 w-2 rounded-full bg-stone-300 dark:bg-stone-600` active: `bg-primary dark:bg-primary`
- Arrow navigation buttons: `rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm h-10 w-10 flex items-center justify-center`

### 6.12 Notification Toast

Keep current dialog-based approach but update styling:

```
rounded-2xl
border border-stone-200 dark:border-stone-700
bg-white dark:bg-stone-800
shadow-lg
p-4 pr-12
```

Slide-in animation from bottom-right.

### 6.13 Info Rows / Detail Lists

Used in Vereinsportrait, Event detail, Kontakt:

```
div.flex.items-start gap-4 py-4 border-b border-stone-100 dark:border-stone-700 last:border-b-0
```

Icon box: `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-stone-200 dark:border-stone-700`

Text content: `min-w-0`
- Title: `text-lg font-semibold text-stone-700 dark:text-white`
- Description: `text-stone-500 dark:text-stone-400`

---

## 7. Animation System

### 7.1 Scroll-Triggered Fade-In

Add a simple Intersection Observer-based animation system (no library needed).

**New file:** `src/client/animations.ts`

```typescript
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el)
  })
}
```

**CSS classes in `global.css`:**

```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}

[data-animate].animate-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-animate="fade"] {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Stagger children:** Parent with `data-animate-stagger` applies increasing delays to children:

```css
[data-animate-stagger] > :nth-child(1) { transition-delay: 0ms; }
[data-animate-stagger] > :nth-child(2) { transition-delay: 100ms; }
[data-animate-stagger] > :nth-child(3) { transition-delay: 200ms; }
/* up to 6 */
```

### 7.2 Hover Animations

| Element | Property | From | To | Duration | Easing |
|---------|----------|------|----|----------|--------|
| Cards | `transform`, `box-shadow` | default, no shadow | `translateY(-4px)`, `shadow-lg` | 300ms | ease-out |
| Cards image | `transform` | `scale(1)` | `scale(1.05)` | 500ms | ease-out |
| Buttons (primary) | `transform`, `background` | default | `scale(1.02)`, darker bg | 200ms | ease-out |
| Buttons (secondary) | `border-color`, `color` | default | `border-primary`, `text-primary` | 200ms | ease-out |
| Links | `color` | `text-stone-600` | `text-primary` | 200ms | ease-out |
| Nav links | `color` | `text-stone-600` | `text-primary` | 200ms | ease-out |

### 7.3 Page Load Animation

```css
body {
  animation: fadeInBody 400ms ease-out;
}

@keyframes fadeInBody {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 7.4 Mobile Menu Animation

Replace current checkbox-hack with a proper JS-driven approach:

- Menu toggle button toggles `data-menu-open` attribute on `<html>`
- Overlay: `opacity-0 → opacity-100`, `transition-opacity duration-300`
- Menu panel: `translate-x-full → translate-x-0`, `transition-transform duration-300 ease-out`
- Body scroll lock: `overflow-hidden` on body when open

---

## 8. Page-by-Page Specifications

### 8.1 Homepage (`index.astro`)

**Sections (top to bottom):**

1. **Hero** — `min-h-[70vh] md:min-h-[80vh]`
   - Small label: "SV EUTINGEN 1947" in uppercase red
   - Large heading: "SV Eutingen"
   - Description text
   - Two CTAs: "Aktuelles" (primary) + "Mach mit" (secondary)
   - Random sport image on right (desktop) / below text (mobile)
   - Subtle red gradient accent visible on mobile only

2. **News** — `py-16 md:py-24 lg:py-32`
   - Section header (centered): "AKTUELLES" label, heading, description
   - Social media icons in a horizontal pill bar
   - 3 NewsItem cards (stacked on mobile, horizontal on tablet+)

3. **Der SVE** — `py-16 md:py-24 lg:py-32`
   - Section header (centered): heading "Der SVE #mehralseinverein", description
   - YouTube video embed: `rounded-2xl overflow-hidden`

4. **Mach mit** — `py-16 md:py-24 lg:py-32 bg-stone-50 dark:bg-surface`
   - Section header (centered): "MACH MIT" label, heading, description
   - 6 BlogItem cards in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
   - Each card: image, title, description, "Mach mit →" link with red text

5. **Footer** (AppFooter)

### 8.2 Teamsport (`teamsport.astro`)

1. **HeaderSection** — Red gradient background
   - "TEAMSPORT" label, "Teamsport" heading, description
   - Category filter pills: horizontal `flex flex-wrap justify-center gap-3`
   - Pill style: `rounded-full border-2 border-stone-200 dark:border-stone-700 px-4 py-1.5 text-sm font-medium hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer`

2. **Team Groups** — `py-16 md:py-24 lg:py-32` per group
   - Section header (left-aligned): group name
   - Teams grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
   - Card: team name, league, trainer, contact

### 8.3 Fitness (`fitness/index.astro`)

1. **HeaderSection** — Green gradient background
   - "FITNESS" label, "Fitness" heading, description

2. **Events Grid** — `py-16 md:py-24 lg:py-32`
   - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
   - Each card: image, title, availability badge (color-coded), short description, "Mehr erfahren" link
   - Availability badge variants:
     - Available: `bg-secondary-light text-secondary-dark dark:bg-secondary/20 dark:text-secondary`
     - Waiting list: `bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`
     - Full: `bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400`
     - Loading: `bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400`

3. **Newsletter Card** — Centered, max-w-lg

4. **FAQs** — Accordion

### 8.4 Events (`events/index.astro`)

Same structure as Fitness but with red accent and no green gradient.

### 8.5 Event Detail (`events/[id].astro`, `fitness/[id].astro`)

1. **HeroSection** — Event image, name, short description, two CTAs

2. **Description** — `py-10 md:py-16`
   - "BESCHREIBUNG" label, "Beschreibung" heading
   - HTML content via `set:html`

3. **Details** — `py-10 md:py-16`
   - "DETAILS" label, "Details" heading
   - Info rows with icon boxes

4. **Dates** — `py-10 md:py-16`
   - "TERMINE" label, "Termine" heading
   - Two-column date list with calendar icons

5. **Booking Form** — Hidden by default, shown via JS
   - Card: `bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-3xl`
   - Two-column layout on desktop
   - All form inputs in 2-column grid on desktop

### 8.6 Vereinsportrait (`vereinsportrait.astro`)

1. **HeroSection** — Club image

2. **Infos** — `py-10 md:py-16`
   - "INFORMATIONEN" label, "Infos zum Verein" heading
   - Description text
   - Info rows (address, bank, email, membership, child protection, FSJ)

3. **Leitbild** — `py-10 md:py-16`
   - "UNSER LEITBILD" label, "Unser Leitbild" heading
   - Prose content in a highlighted card:
     ```
     relative rounded-3xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-6 lg:p-12
     ```
   - Subtle gold gradient accent behind card:
     ```
     absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/10 opacity-50 blur-xl
     ```

4. **Heimspiel** — `py-10 md:py-16`
   - Video description with CTA button

### 8.7 Gaststätte (`gaststaette.astro`)

1. **HeroSection** — Restaurant image

2. **Infos** — `py-10 md:py-16`
   - Description with link to website

3. **Image Gallery** — `py-10 md:py-16`
   - Carousel with rounded corners

### 8.8 Partnerschaft (`partnerschaft.astro`)

1. **HeroSection** — Partnership image

2. **Info** — `py-10 md:py-16`
   - Description + contact info row

3. **Bandenwerbung** — `py-10 md:py-16`
   - Two-column: image left, text + CTA right
   - Subtle gradient accent behind image

4. **Partner List** — `py-10 md:py-16`
   - "UNSERE PARTNER" label, heading, description
   - Alphabetical groups with letter headings
   - Partner cards: minimal cards with just name, `bg-surface border border-stone-200 dark:border-stone-700 rounded-2xl p-5 md:p-6`

### 8.9 Mitgliedschaft (`mitgliedschaft.astro`)

1. **HeaderSection** — "Mitglied werden" heading

2. **Membership Card** — `py-10 md:py-16`
   - Large card with rounded-3xl
   - Multi-step form with back/next navigation
   - Step 1: Membership type selection (checkboxes with prices) + download alternative
   - Step 2: Personal data form
   - Step 3: Payment + SEPA mandate
   - Step 4: Summary review
   - Success state with video

3. **Donation Info** — `py-10 md:py-16`
   - Bank detail rows (same info-row pattern)

### 8.10 Kontakt (`kontakt.astro`)

1. **HeaderSection** — "Kontakt" heading

2. **Category Select** — `py-10 md:py-16`
   - Dropdown to choose contact topic
   - Select input with label

3. **Contact Cards** — One per category, hidden by default
   - Two-column layout on desktop (`lg:flex-row lg:divide-x`)
   - Left: Contact info (name, methods with icons)
   - Right: Contact form
   - Card: `rounded-3xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800`

### 8.11 Termine (`termine.astro`)

1. **HeaderSection** — "Termine" heading

2. **Appointments** — `py-10 md:py-16`
   - Centered, max-w-3xl
   - Each appointment as a card with:
     - Date + time in muted text
     - Title in semibold
     - Optional description
     - Optional "Details" link pill

3. **Empty State** — Nothing component
   - Two-column: image left, text right

4. **FAQs** — Calendar subscription info

### 8.12 Historie (`historie.astro`)

1. **HeroSection** — Historical image

2. **Intro** — `py-10 md:py-16`
   - "WURZELN FÜR DIE ZUKUNFT" label, "Wurzeln für die Zukunft" heading
   - Description text

3. **Timeline** — Centered timeline
   - Vertical line: `absolute inset-x-0 left-1/2 w-px bg-stone-200 dark:bg-stone-700`
   - Cards: `max-w-3xl mx-auto` stacked
   - Each card: image (if available), date, content
   - Desktop: alternating left/right alignment (optional, can stay stacked for simplicity)
   - Connection dots on timeline line

### 8.13 Newsletter (`newsletter.astro`)

1. **HeaderSection** — "Newsletter" heading

2. **Newsletter Card** — Centered form
   - `max-w-lg mx-auto`
   - Card: `rounded-3xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800`
   - "Bleib auf dem Laufenden" heading
   - Email input
   - Category toggles (general, fitness, events) — only if no topic specified
   - Submit button
   - Privacy notice

### 8.14 404 Page

- Centered content, large "404" display heading
- Short message: "Seite nicht gefunden"
- CTA back to homepage

### 8.15 Impressum & Datenschutz

- Prose content with proper typography
- Max-width container for readability

---

## 9. Mobile Menu Redesign

Replace current checkbox-based mobile menu with a proper JS-driven approach.

### 9.1 Implementation

**New approach:** Remove the `<input type="checkbox" id="toggle_nav">` hack. Add `data-menu-open` attribute to `<html>` element to toggle state.

**Trigger button:** Hamburger icon (three `<div>` lines), transforms to X via JS:

```typescript
// In AppHeader's <script>
const toggle = document.querySelector('[data-menu-toggle]')
const html = document.documentElement

toggle?.addEventListener('click', () => {
  html.toggleAttribute('data-menu-open')
})

// Close on link click or backdrop click
document.querySelectorAll('[data-menu-link]').forEach((link) => {
  link.addEventListener('click', () => {
    html.removeAttribute('data-menu-open')
  })
})
```

**CSS in `<style>`:**

```css
@reference "../../styles/global.css";

/* Prevent scroll when menu is open */
[data-menu-open] {
  overflow: hidden;
}

/* Hamburger → X animation */
[data-menu-toggle] #line1 {
  @apply transition duration-300;
}
[data-menu-toggle] #line2 {
  @apply transition duration-300;
}

[data-menu-open] [data-menu-toggle] #line1 {
  @apply translate-y-[6px] rotate-45;
}
[data-menu-open] [data-menu-toggle] #line2 {
  @apply -translate-y-2 -rotate-45;
}

/* Overlay */
[data-menu-overlay] {
  @apply fixed inset-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl
         opacity-0 pointer-events-none transition-opacity duration-300;
}
[data-menu-open] [data-menu-overlay] {
  @apply opacity-100 pointer-events-auto;
}

/* Menu panel */
[data-menu-panel] {
  @apply invisible absolute top-full left-0 z-50 w-full
         translate-y-1 scale-95 opacity-0
         transition-all duration-300;
}
[data-menu-open] [data-menu-panel] {
  @apply visible scale-100 opacity-100;
}
```

### 9.2 Menu HTML Structure

```astro
<nav class="fixed top-0 inset-x-0 z-50 ...">
  <Container>
    <div class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <a href="/" ...>...</a>

      <!-- Desktop links (hidden on mobile) -->
      <div class="hidden lg:flex ...">...</div>

      <!-- Actions: search, theme, hamburger -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <!-- Theme toggle -->
        <!-- Mobile menu toggle -->
        <button data-menu-toggle aria-label="Menu" class="lg:hidden p-3">
          <div id="line1" class="h-0.5 w-5 rounded bg-stone-900 dark:bg-stone-100"></div>
          <div id="line2" class="mt-1.5 h-0.5 w-5 rounded bg-stone-900 dark:bg-stone-100"></div>
        </button>
      </div>
    </div>
  </Container>

  <!-- Overlay -->
  <div data-menu-overlay></div>

  <!-- Menu panel -->
  <div data-menu-panel class="...">
    <Container>
      <!-- Nav links -->
      <!-- Theme toggle + social links -->
    </Container>
  </div>
</nav>
```

### 9.3 Desktop Nav

Same links visible on `lg:` breakpoint. Fixed position, backdrop-blur background. Active link gets `text-primary border-b-2 border-primary`.

---

## 10. Implementation Notes

### 10.1 Global CSS Changes

The `global.css` needs significant updates:

1. Replace current color definitions with new token system
2. Add animation CSS classes (`[data-animate]`, `.animate-visible`)
3. Add smooth scroll behavior
4. Remove old blur-blob gradient patterns (replace with subtle gradient accents)
5. Keep dark mode variant override approach
6. Add `prefers-reduced-motion` media query

### 10.2 Component Changes

Most components need updates. Key changes:

- **AppHeader:** Complete rewrite for fixed + blur + new mobile menu
- **HeroSection:** Redesign for two-column layout, new heading hierarchy
- **Card/BlogItem/NewsItem:** Unified card style, new borders, hover effects
- **Button:** Rewrite to pill shape with new styles
- **Input/Select/Textarea:** Unified form styling
- **HeaderSection:** Add label pattern, update spacing
- **Container:** Change from `max-w-6xl` to `max-w-7xl`

### 10.3 New Files

- `src/client/animations.ts` — Intersection Observer scroll animations
- Update `src/components/common/BasicScripts.astro` to call `initScrollAnimations()`

### 10.4 Responsive Strategy

- All components designed mobile-first
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Grid patterns:
  - 1 col → md:2 col → lg:3 col (card grids)
  - 1 col → md:2 col (contact cards)
  - 1 col → lg:2 col (detail pages)

### 10.5 Accessibility Checklist

- All interactive elements have `cursor-pointer`
- Focus states visible on all focusable elements
- `prefers-reduced-motion` respected (disable animations)
- All images have `alt` text
- All form inputs have associated labels
- Color is never the only indicator (add text labels)
- Contrast ratios meet WCAG 2.1 AA:
  - Normal text: 4.5:1 minimum
  - Large text (24px+): 3:1 minimum
  - Interactive elements: 3:1 minimum

---

## 11. What Stays the Same

- **Technology stack:** Astro, TypeScript, Tailwind CSS v4
- **Content structure:** CMS data, content collections, API calls
- **Dark mode:** Kept and improved with new color tokens
- **Image handling:** Themed images (light/dark), Picture component
- **Page routing:** All URLs remain the same
- **SEO/structured data:** No changes
- **Form handling:** Same API endpoints, captcha, validation logic
- **Search:** Pagefind integration stays
- **Font:** DM Sans (already in use)

---

## 12. Files to Modify

| File | Change Type |
|------|------------|
| `src/styles/global.css` | Major update — new colors, animations, utilities |
| `src/layouts/Layout.astro` | Minor — update body classes |
| `src/components/common/AppHeader.astro` | Rewrite — fixed nav, new mobile menu |
| `src/components/common/AppFooter.astro` | Restyle — new colors, spacing |
| `src/components/common/Container.astro` | Change `max-w-6xl` → `max-w-7xl` |
| `src/components/common/Card.astro` | Restyle — new borders, hover |
| `src/components/common/Faq.astro` | Restyle — new colors, animation |
| `src/components/common/Faqs.astro` | Restyle — spacing, typography |
| `src/components/common/ImageCarousel.astro` | Restyle — new navigation, dots |
| `src/components/common/ImageDialog.astro` | Restyle — new padding, close button |
| `src/components/common/ImageGallery.astro` | No change (wrapper) |
| `src/components/common/MetaTags.astro` | No change |
| `src/components/common/Notification.astro` | Restyle — new card style |
| `src/components/common/Prose.astro` | Update typography classes |
| `src/components/common/Search.astro` | Restyle — new colors, borders |
| `src/components/blocks/HeroSection.astro` | Rewrite — new layout |
| `src/components/blocks/Blog.astro` | Restyle — spacing, grid |
| `src/components/blocks/BlogItem.astro` | Restyle — new card design |
| `src/components/blocks/News.astro` | Restyle — new layout |
| `src/components/blocks/NewsItem.astro` | Restyle — new card design |
| `src/components/blocks/HeaderSection.astro` | Restyle — add label, new gradient |
| `src/components/blocks/Event.astro` | Restyle — update all sections |
| `src/components/blocks/Teams.astro` | Restyle — new card grid |
| `src/components/blocks/ContactCard.astro` | Restyle — new card layout |
| `src/components/blocks/NewsletterCard.astro` | Restyle — new form styling |
| `src/components/blocks/PreBooking.astro` | Restyle — update loading state |
| `src/components/blocks/HistoryItem.astro` | Restyle — update card |
| `src/components/blocks/Nothing.astro` | Restyle — update layout |
| `src/components/controls/Button.astro` | Rewrite — pill buttons |
| `src/components/controls/Input.astro` | Restyle — new form styling |
| `src/components/controls/Select.astro` | Restyle — new form styling |
| `src/components/controls/Textarea.astro` | Restyle — new form styling |
| `src/components/controls/Checkbox.astro` | Restyle — new checkbox colors |
| `src/components/controls/Switch.astro` | Restyle — new switch colors |
| `src/components/controls/SubmitButton.astro` | Restyle — update spinner |
| `src/components/controls/ButtonSwitch.astro` | Restyle — update toggle |
| `src/pages/index.astro` | Restyle — new section structure |
| `src/pages/teamsport.astro` | Restyle — update layout |
| `src/pages/fitness/index.astro` | Restyle — update layout |
| `src/pages/events/index.astro` | Restyle — update layout |
| `src/pages/fitness/[id].astro` | Restyle — inherited from Event |
| `src/pages/events/[id].astro` | Restyle — inherited from Event |
| `src/pages/vereinsportrait.astro` | Restyle — update sections |
| `src/pages/gaststaette.astro` | Restyle — update sections |
| `src/pages/partnerschaft.astro` | Restyle — update sections |
| `src/pages/mitgliedschaft.astro` | Restyle — update form styling |
| `src/pages/kontakt.astro` | Restyle — update layout |
| `src/pages/termine.astro` | Restyle — update cards |
| `src/pages/historie.astro` | Restyle — update timeline |
| `src/pages/newsletter.astro` | Restyle — update layout |
| `src/pages/404.astro` | Restyle — update styling |
| `src/pages/impressum.astro` | Minor — typography |
| `src/pages/datenschutz.astro` | Minor — typography |
| `src/client/animations.ts` | New — scroll animation system |

---

## 13. Execution Order

The redesign should be executed in this order to minimize breakage:

1. **Global foundation** — `global.css` color tokens, typography, animation system
2. **Layout components** — Container, Layout, AppHeader (incl. mobile menu), AppFooter
3. **Base components** — Button, Input, Select, Textarea, Checkbox, Switch, SubmitButton, Prose
4. **Block components** — Card, HeroSection, HeaderSection, BlogItem, NewsItem
5. **Pages** — Homepage first, then each page in order of complexity
6. **Animation integration** — Add scroll animations, verify `prefers-reduced-motion`
7. **Polish** — Dark mode pass, accessibility audit, responsive testing
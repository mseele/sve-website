## 1. Setup oxlint

- [x] 1.1 Add `oxlint` to `devDependencies` in `package.json`
- [x] 1.2 Create `.oxlintrc.json` with plugins (typescript ✅, unicorn ✅, oxc ✅, react, jsx-a11y, import) and appropriate rule overrides for Astro
- [x] 1.3 Add `lint` script to `package.json`: `"lint": "oxlint src/"`

## 2. Fix lint violations

- [x] 2.1 Fix `src/env.d.ts` — remove triple-slash reference or suppress the `triple-slash-reference` rule
- [x] 2.2 Fix `src/components/common/AppHeader.astro` — resolve `no-unused-expressions` warning
- [x] 2.3 Fix `src/components/blocks/ContactCard.astro` — resolve 5 `no-non-null-asserted-optional-chain` warnings
- [x] 2.4 Handle `src/pages/mitgliedschaft.astro` parse error — extract script to `src/client/mitgliedschaft.ts`

## 3. Verification

- [x] 3.1 Run `bun run lint` — verify zero warnings and zero errors
- [x] 3.2 Run `bun run check` — verify TypeScript and Astro checks still pass
- [x] 3.3 Run `bun run build` — verify production build succeeds (pre-existing backend error unrelated to changes)

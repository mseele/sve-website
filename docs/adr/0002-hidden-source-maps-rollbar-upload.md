# ADR-0002: Hidden source maps + Rollbar upload for production debugging

Date: 2026-08-09
Status: Accepted
Resolves: Issue #414
Touches: `astro.config.mjs`, `src/client/rollbar.ts`, `scripts/upload-sourcemaps.ts`, `netlify.toml`, `README.md`, `AGENTS.md`, `tests/client/rollbar.test.ts`, `tests/scripts/upload-sourcemaps.test.ts`

## Context

Issue #414 asks for production Rollbar stack traces that resolve to original `.ts` / `.astro` filenames and line numbers instead of minified chunk references like `(index-CxY1Ab2.js:1:4567)`.

Three things must line up for Rollbar to de-minify a frame:

1. The browser SDK reports `payload.client.javascript.code_version` so Rollbar can pin an occurrence to a specific deploy.
2. A `.js.map` exists for each shipped minified chunk and is associated with that `code_version`.
3. The map must not be publicly fetchable (it contains the original source).

There are two ways to give Rollbar the maps: (a) leave a `//# sourceMappingURL=` comment on the shipped JS and let Rollbar fetch it on demand, or (b) upload the maps to Rollbar's `/api/1/sourcemap` endpoint keyed by `minified_url` + `version` and ship no comment.

## Decisions

1. **Generate hidden source maps.** `vite.build.sourcemap: "hidden"` emits `.js.map` files into `dist/_astro/` but does not append `//# sourceMappingURL=` to the shipped JS, so the browser never references them.
2. **Delete the maps from `dist/` after upload, before Netlify publishes.** `vite.build.sourcemap: "hidden"` only suppresses the `sourceMappingURL` comment — it does not stop Netlify (which publishes everything under `publish = "dist/"`) from serving a guessable `_astro/*.js.map`. The build command therefore runs `find dist -name '*.js.map' -delete` as the final step. The deletion runs regardless of whether the upload had a token, so token-less PR-preview builds never expose source either. The maps are uploaded to Rollbar first, so deletion only drops the local copy after Rollbar has it.
3. **`code_version` = git SHA, resolved at build time.** A single `getGitSha()` resolution (`GIT_SHA` env → Netlify `COMMIT_REF` → `git rev-parse HEAD`) feeds both the client `code_version` payload and the upload `version` field, so an occurrence and its map are guaranteed to share the same key. The value is returned raw on both sides (no unilateral truncation) so the keys can never diverge; a SHA-1 git SHA / Netlify `COMMIT_REF` is 40 chars, fitting Rollbar's documented `code_version` max. The build command exports `GIT_SHA` once so the Astro build (client payload) and the post-build upload script read the same value.
4. **Upload maps to Rollbar from the build, not by URL fetch.** `scripts/upload-sourcemaps.ts` walks `dist/` for `*.js.map`, computes a schema-less `minified_url` (`//<host>/_astro/<chunk>.js`, derived from `SUBDOMAIN` + `SITE.basePathname` to match the deployed frame URL), and `POST`s each map to Rollbar with `access_token = ROLLBAR_POST_SERVER_ITEM_TOKEN` (the `post_server_item` token) and `version = gitSha`. The upload is a no-op (exit 0) when the token is unset, so local / PR builds without the token still succeed.

### Placement: `GIT_SHA` as an Astro public client env field

`code_version` is read in the browser by `src/client/rollbar.ts`, so the SHA must reach the client bundle. Declared as `envField.string({ context: 'client', access: 'public', optional: true })` and populated from `process.env.GIT_SHA` at build time — the same `astro:env/client` seam the existing `ROLLBAR_ACCESS_TOKEN` and `PREVIEW` already use. It is optional so local dev (no `GIT_SHA`) still builds and `code_version` is simply `undefined`, which Rollbar ignores.

## Reversibility

- Disabling source maps is a one-line revert in `astro.config.mjs`.
- The upload step is isolated in its own script and only invoked by the Netlify build command; removing the `&& bun run scripts/upload-sourcemaps.ts` suffix reverts the build pipeline with no other side effects.
- The client `code_version` / `source_map_enabled` payload fields are additive; removing them reverts Rollbar to minified frames with no error.

## Consequences

- Production `/dist` no longer references its maps and no longer contains them after the build command finishes: the upload ships their contents to Rollbar, then `find … -delete` removes the local copies before Netlify deploys. A reviewer seeing `dist/_astro/*.js.map` on disk _during_ the build (before the final step) should expect them to be deleted — see this ADR before "cleaning up" or relying on them.
- `code_version` is only populated in builds that set `GIT_SHA` (Netlify builds via `COMMIT_REF`; local builds via `git rev-parse HEAD` when run through the Netlify command, but raw `bun run build` without `GIT_SHA` omits it). Local dev unaffected and local maps are preserved (no token ⇒ upload no-op, and the deletion step only runs in the Netlify command, not in `bun run build`).
- Two secrets now live in the Netlify env for this feature: `ROLLBAR_ACCESS_TOKEN` (client `post_client_item`, already present from #411) and `ROLLBAR_POST_SERVER_ITEM_TOKEN` (build-only `post_server_item`). Only the latter is new; it must never be exposed to the client bundle.

## Alternatives considered

- **`sourceMappingURL` + on-demand Rollbar fetch (Vite `sourcemap: true`, not hidden).** Rejected — exposes the maps (and original source) publicly on the origin, and Rollbar's first-occurrence race: the map is not yet downloaded when the first errors arrive, so the earliest occurrences stay minified. The upload method is recommended by Rollbar for production.
- **A separate CLI / GitHub Action to upload maps.** Rejected — the Netlify build already produces `dist/` and `COMMIT_REF`, so running the upload as the final build step keeps the deploy and the maps in the same job and the same `code_version`.
- **Injecting `code_version` via Vite `define`.** Rejected in favour of the `astro:env/client` seam already used by `rollbar.ts`, to keep a single env-typing path and avoid a literal `import.meta.env.GIT_SHA` replacement that bypasses Astro's validation.

## Open questions

- The final `find dist -name '*.js.map' -delete` keeps maps out of the published `dist/` for the standard Netlify pipeline. If a future deploy path ever bypasses this command (e.g. a manual `netlify deploy --dir=dist` from a dev machine where the maps were not deleted), the maps would ship. A belt-and-braces alternative is a `netlify.toml` `_headers`/`_redirects` rule returning 404 for `/_astro/*.js.map`; revisit if deploys start bypassing the documented build command.

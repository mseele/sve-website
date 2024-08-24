/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUBDOMAIN: string
  readonly PUBLIC_BACKEND_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

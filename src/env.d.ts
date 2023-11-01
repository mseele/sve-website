/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUBDOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute base URL for the content API. Defaults to same-origin /api. */
  readonly VITE_API_BASE?: string
  /** MapTiler key for the interactive world map. */
  readonly VITE_MAPTILER_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

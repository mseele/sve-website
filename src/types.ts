export interface MetaSEO {
  title?: string
  description?: string
  image?: string

  canonical?: string
  noindex?: boolean
  nofollow?: boolean

  ogTitle?: string
  ogType?: string
  ogLocale?: string
}

export interface ThemedImage {
  light: ImageMetadata
  dark: ImageMetadata
  alt: string
}

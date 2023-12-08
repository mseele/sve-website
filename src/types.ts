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

export interface Team {
  key: string
  team: string
  league: string
  coach?: Coach
  contact: Contact
  teamID?: string
}

export interface Coach extends PersonalData {
  title?: string
}

export interface Contact extends PersonalData {
  title: string
}

export interface PersonalData {
  name: string
  email?: string
  mobile?: PhoneNumber
  phone?: PhoneNumber
}

export interface PhoneNumber {
  formatted: string
  raw: string
}

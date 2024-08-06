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

export interface Sponsor {
  name: string
  url?: string
  groupBy: string
}

export interface Faq {
  question: string
  answer: string
}

// Raw item from the server
export interface RawAppointment {
  id?: string
  sort_index: number
  title?: string
  link?: string
  description?: string
  start_date?: string
  end_date?: string
  start_date_time?: string
  end_date_time?: string
}

export interface Appointment {
  date: string
  time: string
  title: string
  description?: string
  link?: string
}

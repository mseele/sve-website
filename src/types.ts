import type { ImageMetadata } from 'astro'

export interface MetaSEO {
  title?: string
  description?: string
  image?: ImageMetadata

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

// Raw item from the server
export interface RawEvent {
  id: string
  type: EventType
  name: string
  sort_index: number
  short_description: string
  description: string
  image: string
  light: boolean
  dates: string[]
  custom_date?: string | null
  duration_in_minutes: number
  max_subscribers: number
  max_waiting_list: number
  price_member: number
  price_non_member: number
  cost_per_date?: number | null
  location: string
  booking_template: string
  payment_account: string
  alt_booking_button_text?: string | null
  alt_email_address?: string | null
  external_operator: boolean
}

export interface Event {
  id: string
  name: string
  image: ImageMetadata
  shortDescription: string
  description: string
  location: string
  dates: string[]
  duration: string
  priceMember: string
  priceNonMember: string
  altBookingButtonText?: string
  externalOperator: boolean
}

export enum EventType {
  Fitness = 'Fitness',
  Events = 'Events',
}

// Raw item from the server
export interface RawEventCounter {
  id: string
  max_subscribers: number
  subscribers: number
  waiting_list: number
  max_waiting_list: number
}

export interface EventAvailability {
  availableSlots: number
  isWaitingList: boolean
  message: string
}

export interface Booking {
  event_id: string
  first_name: string
  last_name: string
  street: string
  city: string
  email: string
  phone?: string
  member?: boolean
  updates?: boolean
  comments?: string
}

export interface BookingResponse {
  success: boolean
  message: string
  counter: RawEventCounter[]
}

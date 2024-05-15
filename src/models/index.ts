export interface Notification {
  type: NotificationType
  message: string
}

export enum NotificationType {
  Info,
  Error,
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
  custom_date?: string
  duration_in_minutes: number
  max_subscribers: number
  max_waiting_list: number
  price_member: number
  price_non_member: number
  cost_per_date?: number
  location: string
  booking_template: string
  payment_account: string
  alt_booking_button_text?: string
  alt_email_address?: string
  external_operator: boolean
}

export interface Event {
  id: string
  name: string
  image: string
  light: boolean
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

export interface EventCounter {
  id: string
  max_subscribers: number
  subscribers: number
  waiting_list: number
  max_waiting_list: number
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
  counter: EventCounter[]
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

export interface Faq {
  question: string
  answer: string
}

export interface NewsItem {
  title: string
  collapsed: boolean
  text: string
}

export interface Sponsor {
  name: string
  groupBy: string
}

export interface Touch {
  type: TouchType
  text: string
  href: string
}

export enum TouchType {
  Phone,
  Email,
  WhatsApp,
}

export interface Item {
  value: string
  text: string
}

export interface Moment {
  date: string
  text: string
  images?: string[]
}

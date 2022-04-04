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
  sheetId: string
  gid: number
  type: EventType
  name: string
  sortIndex: number
  visible: boolean
  beta: boolean
  shortDescription: string
  description: string
  image: string
  light: boolean
  dates: string[]
  customDate?: string
  durationInMinutes: number
  maxSubscribers: number
  subscribers: number
  costMember: number
  costNonMember: number
  waitingList: number
  maxWaitingList: number
  location: string
  bookingTemplate: string
  waitingTemplate: string
  altBookingButtonText?: string
  altEmailAddress?: string
  externalOperator: boolean
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
  costMember: string
  costNonMember: string
  altBookingButtonText?: string
  externalOperator: boolean
}

export enum EventType {
  Fitness = 'Fitness',
  Events = 'Events',
}

export interface EventCounter {
  id: string
  maxSubscribers: number
  subscribers: number
  waitingList: number
  maxWaitingList: number
}

export interface Booking {
  eventId: string
  firstName: string
  lastName: string
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
  sortIndex: number
  title?: string
  link?: string
  description?: string
  startDate?: string
  endDate?: string
  startDateTime?: string
  endDateTime?: string
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
  url?: string
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

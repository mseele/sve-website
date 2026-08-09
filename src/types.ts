import type { ImageMetadata } from 'astro'
import { z } from 'zod'

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

  structuredData?: string
}

export interface ThemedImage {
  light: ImageMetadata
  dark: ImageMetadata
  alt: string
}

export interface Category {
  id: string
  name: string
  description: string
  sortOrder: number
  isYouthGroup: boolean
}

export interface Team {
  id: string
  name: string
  league: string
  category: Category
  coach?: Person
  contact?: Person
  teamID?: string
}

export const phoneNumberObject = z.object({
  formatted: z.string(),
  raw: z.string(),
})
export type PhoneNumber = z.infer<typeof phoneNumberObject>

export const personObject = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  email: z.string().optional(),
  mobile: phoneNumberObject.optional(),
  phone: phoneNumberObject.optional(),
})
export type Person = z.infer<typeof personObject>

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
  startDateISO?: string
  endDateISO?: string
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
  custom_fields: RawEventCustomField[]
  payment_method: PaymentMethod
}

export interface RawEventCustomField {
  id: string
  name: string
  type: EventCustomFieldType
  min_value?: number | null
  max_value?: number | null
}

export enum EventCustomFieldType {
  Text = 'Text',
  Number = 'Number',
}

export enum PaymentMethod {
  BankTransfer = 'BankTransfer',
  SepaDirectDebit = 'SepaDirectDebit',
}

export interface Event {
  id: string
  name: string
  image: string
  sortIndex: number
  shortDescription: string
  description: string
  location: string
  dates: string[]
  datesDisplay?: string
  duration: string
  priceMember: string
  priceNonMember: string
  altBookingButtonText?: string
  externalOperator: boolean
  customFields: EventCustomField[]
  paymentMethod: PaymentMethod
}

export enum EventType {
  Fitness = 'Fitness',
  Events = 'Events',
}

export interface EventCustomField {
  name: string
  type: EventCustomFieldType
  minValue?: number
  maxValue?: number
}

// Raw item from the server
export interface RawEventCounter {
  id: string
  max_subscribers: number
  subscribers: number
  waiting_list: number
  max_waiting_list: number
}

/**
 * Booking availability for an event, derived from {@link RawEventCounter}.
 *
 * The pair (`availableSlots`, `isWaitingList`) encodes a four-state phase machine;
 * `availableSlots` is a *phase-switched* quantity — it counts whichever kind of
 * slot is currently bookable, never both at once. The booking flow depletes
 * subscriber slots first; only when subscribers are full does the waiting-list
 * phase begin, at which point `availableSlots` switches to counting waiting-list
 * slots. Splitting the field would advertise two independent quantities that
 * are in fact mutually exclusive — so we keep one phase-switched number and
 * document the switch here.
 *
 * Decode the sentinel through `availabilityState(av)` (see `src/api/events.ts`);
 * do not compare `availableSlots` to `-1` or `0` directly at consumer sites.
 */
export interface EventAvailability {
  /**
   * Remaining bookable slots in the CURRENT booking phase.
   *
   * - When `isWaitingList` is `false` (subscriber phase): remaining subscriber
   *   slots, OR the sentinel `-1` meaning the event is **Unlimited**
   *   (`max_subscribers === -1` on the backend — a real domain concept, not a
   *   leaked implementation detail).
   * - When `isWaitingList` is `true` (waiting-list phase, subscribers full):
   *   remaining waiting-list slots (always `>= 0`; the sentinel never appears
   *   in this phase).
   *
   * `0` means the current phase is exhausted — for the waiting-list phase that
   * is the **FullyBooked** state; the subscriber phase never emits `0` (the
   * producer flips to the waiting-list phase instead).
   */
  availableSlots: number
  /**
   * `true` once the subscriber phase is exhausted — `availableSlots` then
   * counts waiting-list slots rather than subscriber slots. Always `false` for
   * Unlimited events.
   */
  isWaitingList: boolean
  /** Pre-formatted German display message derived from the phase + slot count. */
  message: string
}

export interface Booking {
  event_id: string
  first_name: string
  last_name: string
  street: string
  city: string
  email: string
  phone: string
  member?: boolean
  updates?: boolean
  comments?: string
  custom_values: string[]
  iban?: string
}

export interface BookingResponse {
  success: boolean
  message: string
  counter: RawEventCounter[]
  requires_iban?: boolean
}

export interface FamilyMember {
  first_name: string
  last_name: string
  birthday: string
}

export interface MembershipApplication {
  newsletter?: boolean
  membership_type?: string
  gender?: string
  first_name?: string
  last_name?: string
  street?: string
  zipcode?: string
  city?: string
  email?: string
  phone?: string
  birthday?: string
  iban?: string
  account_owner?: string
  family_members?: FamilyMember[]
}

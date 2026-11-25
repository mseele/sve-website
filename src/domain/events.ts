/**
 * Runtime enums for the event domain.
 *
 * Lives outside `src/types.ts` so that modules importing a runtime *value*
 * (enum) do not pull `@/types` — and with it the side-effectful imports —
 * into their bundle. `src/types.ts` is type-only: it imports these enums
 * as types for its own interfaces; consumers needing the runtime values
 * import them from here.
 */
export enum EventType {
  Fitness = 'Fitness',
  Events = 'Events',
}

export enum EventCustomFieldType {
  Text = 'Text',
  Number = 'Number',
}

export enum PaymentMethod {
  BankTransfer = 'BankTransfer',
  SepaDirectDebit = 'SepaDirectDebit',
}

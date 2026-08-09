import { setupServer } from 'msw/node'
import { calendarHandlers } from './handlers/calendar'
import { eventsHandlers } from './handlers/events'
import { formsHandlers } from './handlers/forms'

export const server = setupServer(...calendarHandlers, ...eventsHandlers, ...formsHandlers)

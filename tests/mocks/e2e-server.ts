import { setupServer } from 'msw/node'
import { calendarHandlers } from './handlers/calendar'
import { contentfulHandlers, telemetryHandlers } from './handlers/contentful'
import { eventsHandlers } from './handlers/events'
import { formsHandlers } from './handlers/forms'

export const e2eServer = setupServer(
  ...calendarHandlers,
  ...eventsHandlers,
  ...formsHandlers,
  ...contentfulHandlers,
  ...telemetryHandlers,
)

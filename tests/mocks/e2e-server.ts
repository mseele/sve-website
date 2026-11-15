import { setupServer } from 'msw/node'
import { calendarHandlers } from './handlers/calendar.ts'
import { contentfulHandlers, telemetryHandlers } from './handlers/contentful.ts'
import { eventsHandlers } from './handlers/events.ts'
import { formsHandlers } from './handlers/forms.ts'

export const e2eServer = setupServer(
  ...calendarHandlers,
  ...eventsHandlers,
  ...formsHandlers,
  ...contentfulHandlers,
  ...telemetryHandlers,
)

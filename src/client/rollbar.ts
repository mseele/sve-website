import Rollbar from 'rollbar'
import { GIT_SHA, PREVIEW, ROLLBAR_ACCESS_TOKEN } from 'astro:env/client'

const rollbar = ROLLBAR_ACCESS_TOKEN
  ? new Rollbar({
      accessToken: ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      autoInstrument: true,
      includeItemsInTelemetry: true,
      payload: {
        environment: import.meta.env.PROD ? (PREVIEW ? 'staging' : 'production') : 'development',
        client: {
          javascript: {
            source_map_enabled: true,
            code_version: GIT_SHA,
            guess_uncaught_frames: true,
          },
        },
      },
    })
  : null

export function reportError(...args: unknown[]): void {
  console.error(...args)
  for (const arg of args) {
    if (arg instanceof Error) {
      rollbar?.error(arg)
      return
    }
  }
  rollbar?.error(args.join(' '))
}

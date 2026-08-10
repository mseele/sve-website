import type { ReportErrorContext } from '@/types'
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

export function reportError(error: unknown, context?: ReportErrorContext): void {
  console.error(error)
  if (error instanceof Error) {
    rollbar?.error(error, context ? { custom: context } : undefined)
    return
  }
  rollbar?.error(String(error), context ? { custom: context } : undefined)
}

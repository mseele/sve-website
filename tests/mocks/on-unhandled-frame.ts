import type { SharedOptions } from 'msw'

export const onUnhandledFrame: NonNullable<SharedOptions['onUnhandledFrame']> = async ({
  frame,
}) => {
  const request = (frame.data as { request?: Request }).request
  if (frame.protocol === 'http' && request?.method === 'OPTIONS') return

  throw new Error(await frame.getUnhandledMessage())
}

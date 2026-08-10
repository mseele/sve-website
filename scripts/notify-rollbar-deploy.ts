import { execSync } from 'node:child_process'

const ROLLBAR_DEPLOY_URL = 'https://api.rollbar.com/api/1/deploy/'

export type FetchFn = (input: string, init?: RequestInit) => Promise<Response>

export interface DeployParams {
  accessToken: string
  environment: string
  revision: string
  localUsername?: string
}

export interface NotifyDeps {
  fetchImpl: FetchFn
}

export function getGitSha(env: NodeJS.ProcessEnv = process.env): string {
  const fromEnv = env.GIT_SHA || env.COMMIT_REF
  if (fromEnv) return fromEnv
  return execSync('git rev-parse HEAD').toString().trim()
}

export function resolveEnvironment(preview: string | undefined): string {
  return preview === 'true' ? 'staging' : 'production'
}

export async function notifyDeploy(params: DeployParams, deps: NotifyDeps): Promise<boolean> {
  const form = new URLSearchParams()
  form.append('access_token', params.accessToken)
  form.append('environment', params.environment)
  form.append('revision', params.revision)
  if (params.localUsername) form.append('local_username', params.localUsername)

  const response = await deps.fetchImpl(ROLLBAR_DEPLOY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '<no body>')
    console.error(`Rollbar deploy notification failed (${response.status}): ${body}`)
    return false
  }
  return true
}

export async function runNotify(
  env: NodeJS.ProcessEnv = process.env,
  deps: NotifyDeps,
): Promise<{ notified: boolean; skipped: boolean }> {
  const accessToken = env.ROLLBAR_POST_SERVER_ITEM_TOKEN
  const gitSha = getGitSha(env)
  const environment = resolveEnvironment(env.PREVIEW)

  if (!accessToken) {
    console.warn('ROLLBAR_POST_SERVER_ITEM_TOKEN not set — skipping Rollbar deploy notification.')
    return { notified: false, skipped: true }
  }

  const ok = await notifyDeploy({ accessToken, environment, revision: gitSha }, deps)
  if (ok) {
    console.log(`Notified Rollbar of deploy: ${gitSha} to ${environment}.`)
  }
  return { notified: ok, skipped: false }
}

async function main(): Promise<void> {
  const result = await runNotify(process.env, { fetchImpl: fetch })
  if (!result.skipped && !result.notified) process.exitCode = 1
}

const isEntry = typeof Bun !== 'undefined' && (import.meta as { main?: boolean }).main === true
if (isEntry) {
  await main()
}

import { BACKEND_API } from 'astro:env/client'

export async function manageSubscription(
  subscribe: boolean,
  email: string,
  general: boolean,
  fitness: boolean,
  events: boolean
): Promise<Response> {
  const url = `${BACKEND_API}/news/${subscribe ? 'subscribe' : 'unsubscribe'}`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, types: newsTypes(general, fitness, events) }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function newsTypes(general: boolean, fitness: boolean, events: boolean) {
  const types: string[] = []
  if (general) types.push('General')
  if (fitness) types.push('Fitness')
  if (events) types.push('Events')
  return types
}

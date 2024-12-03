import { BACKEND_API } from 'astro:env/client'

export async function sendContactMessage(
  recipient: string,
  name: string,
  email: string,
  phone: string | undefined,
  message: string,
): Promise<Response> {
  const url = `${BACKEND_API}/contact/message`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'General',
      to: recipient,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      message: message.trim(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function manageSubscription(
  subscribe: boolean,
  email: string,
  general: boolean,
  fitness: boolean,
  events: boolean,
): Promise<Response> {
  const url = `${BACKEND_API}/news/${subscribe ? 'subscribe' : 'unsubscribe'}`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, types: newsTypes(general, fitness, events) }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

function newsTypes(general: boolean, fitness: boolean, events: boolean) {
  const types: string[] = []
  if (general) types.push('General')
  if (fitness) types.push('Fitness')
  if (events) types.push('Events')
  return types
}

export async function membershipApplication(payload: any): Promise<boolean> {
  const response = await fetch(`${BACKEND_API}/membership/application`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.ok
}

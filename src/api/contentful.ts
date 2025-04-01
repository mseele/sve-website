import { createClient } from 'contentful'

const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
})

export async function loadTeams() {
  const entries = await contentfulClient.getEntries({ content_type: 'team', include: 2 })
  return entries.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    league: item.fields.league as undefined | string,
    category: mapCategory(item.fields.category),
    sortOrder: parseFloat(
      `${(item.fields.category as any).fields.sortOrder}.${item.fields.sortOrder}`,
    ),
    coach: mapPerson(item.fields.coach),
    contact: mapPerson(item.fields.contact),
    teamID: item.fields.teamID as undefined | string,
  }))
}

function mapCategory(item: any) {
  if (!item) {
    return undefined
  }
  return {
    id: item.sys.id,
    name: item.fields.name as string,
    description: item.fields.description as string,
    sortOrder: item.fields.sortOrder as number,
  }
}

function mapPerson(item: any) {
  if (!item) {
    return undefined
  }
  return {
    id: item.sys.id,
    name: item.fields.name as string,
    position: item.fields.position.fields.name as string,
    email: item.fields.email as undefined | string,
    mobile: mapPhoneNumber(item.fields.mobile),
    phone: mapPhoneNumber(item.fields.phone),
  }
}

function mapPhoneNumber(item: any) {
  if (!item) {
    return undefined
  }
  return {
    id: item.sys.id,
    formatted: item.fields.formatted as string,
    raw: item.fields.raw as string,
  }
}

export async function loadSponsors() {
  const entries = await contentfulClient.getEntries({ content_type: 'sponsor' })
  return entries.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    groupBy: (item.fields.groupBy as string) || (item.fields.name as string),
  }))
}

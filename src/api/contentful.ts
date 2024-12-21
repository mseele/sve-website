import { createClient } from 'contentful'

const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
})

export async function loadSponsors() {
  const entries = await contentfulClient.getEntries({ content_type: 'sponsor' })
  return entries.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    groupBy: (item.fields.groupBy as string) || (item.fields.name as string),
  }))
}

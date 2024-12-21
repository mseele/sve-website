import { loadSponsors } from '@/api/contentful'
import { loadEvents } from '@/api/events'
import { EventType } from '@/types'
import { glob } from 'astro/loaders'
import { defineCollection, type SchemaContext, z } from 'astro:content'

const sponsoring = defineCollection({
  loader: loadSponsors,
  schema: () =>
    z.object({
      name: z.string(),
      groupBy: z.string(),
    }),
})

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/news' }),
  schema: ({ image }) =>
    z.object({
      date: z.date(),
      title: z.string(),
      imageLight: image(),
      imageDark: image(),
      download: z.string().optional(),
    }),
})

const history = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/history' }),
  schema: ({ image }) =>
    z.object({
      date: z.string(),
      tags: z.string().array().optional(),
      images: z
        .array(
          z.object({
            light: image(),
            dark: image(),
            alt: z.string(),
          }),
        )
        .optional(),
    }),
})

const eventSchema = ({ image }: SchemaContext) =>
  z.object({
    id: z.string(),
    name: z.string(),
    image: image(),
    shortDescription: z.string(),
    description: z.string(),
    location: z.string(),
    dates: z.array(z.string()),
    duration: z.string(),
    priceMember: z.string(),
    priceNonMember: z.string(),
    altBookingButtonText: z.string().optional(),
    externalOperator: z.boolean(),
  })

const fitness = defineCollection({
  loader: async () => await loadEvents(EventType.Fitness),
  schema: eventSchema,
})

const events = defineCollection({
  loader: async () => await loadEvents(EventType.Events),
  schema: eventSchema,
})

export const collections = {
  news,
  history,
  fitness,
  events,
  sponsoring,
}

import { glob } from 'astro/loaders'
import { defineCollection, type SchemaContext } from 'astro:content'
import { z } from 'astro/zod'
import { loadSponsors, loadTeams } from '@/api/contentful'
import { loadEvents } from '@/api/events'
import { EventType } from '@/types'
import { sponsorSchema, teamSchema } from '@/content-schemas'

const teams = defineCollection({
  loader: loadTeams,
  schema: teamSchema,
})

const sponsoring = defineCollection({
  loader: loadSponsors,
  schema: sponsorSchema,
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
    sortIndex: z.number(),
    shortDescription: z.string(),
    description: z.string(),
    location: z.string(),
    dates: z.array(z.string()),
    datesDisplay: z.string().optional(),
    duration: z.string(),
    priceMember: z.string(),
    priceNonMember: z.string(),
    altBookingButtonText: z.string().optional(),
    externalOperator: z.boolean(),
    customFields: z
      .array(
        z.object({
          name: z.string(),
          type: z.enum(['Text', 'Number']),
          minValue: z.number().optional(),
          maxValue: z.number().optional(),
        }),
      )
      .default([]),
    paymentMethod: z.enum(['BankTransfer', 'SepaDirectDebit']),
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
  teams,
}

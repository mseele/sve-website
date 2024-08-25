import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/news' }),
  schema: ({ image }) =>
    z.object({
      date: z.date(),
      title: z.string(),
      imageLight: image(),
      imageDark: image(),
      download: z.string().optional()
    })
})

const historyCollection = defineCollection({
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
            alt: z.string()
          })
        )
        .optional()
    })
})

export const collections = {
  news: newsCollection,
  history: historyCollection
}

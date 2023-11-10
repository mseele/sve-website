import { z, defineCollection } from 'astro:content'

const newsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      date: z.date(),
      title: z.string(),
      imageLight: image(),
      imageDark: image(),
      download: z.string().optional()
    })
})

export const collections = {
  news: newsCollection
}

import { format } from 'date-fns'
// @ts-expect-error: without the index.js suffix, astro fails to compile
import { de } from 'date-fns/locale/index.js'

export function formatDate(date: Date) {
  return format(date, 'd. MMMM yyyy', { locale: de })
}

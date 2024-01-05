import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export function formatDate(date: Date) {
  return format(date, 'd. MMMM yyyy', { locale: de })
}

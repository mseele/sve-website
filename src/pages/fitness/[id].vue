<template>
  <Layout :transparent="true" :light="event.light">
    <EventContent
      :event="event"
      label-updates="Ich möchte über zukünftige Kurse per E-Mail informiert werden"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Kursangebote online sind. Vielen Dank."
      news-type="Fitness"
    >
      <template #bookingHeader>
        Um sich verbindlich für den Kurs anzumelden, trage bitte hier Deine
        Daten ein. Du wirst von uns anschließend per E-Mail über alles Weitere
        informiert.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Kursangebote online sind.
      </template>
    </EventContent>
  </Layout>
</template>

<script lang="ts">
export default definePageComponent({
  async getStaticPaths() {
    const events = await getEvents(EventType.Fitness)
    return events.map((e: Event) => {
      return {
        params: { id: e.id },
        props: { event: e },
      }
    })
  },
})
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { getEvents } from '@/logic/events'
import { Event, EventType } from '@/models'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})

const { frontmatter } = usePage()
frontmatter.title = props.event.name + ' · Fitness'
frontmatter.description = props.event.shortDescription
</script>

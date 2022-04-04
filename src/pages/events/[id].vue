<template>
  <Layout :transparent="true" :light="event.light">
    <EventContent
      :event="event"
      label-updates="Ich möchte über zukünftige Events per E-Mail informiert werden"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
    >
      <template #bookingHeader>
        Um sich verbindlich für das Event anzumelden, trage bitte hier Deine
        Daten ein. Du wirst von uns anschließend per E-Mail über alles Weitere
        informiert.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Events online sind.
      </template>
    </EventContent>
  </Layout>
</template>

<script lang="ts">
export default definePageComponent({
  async getStaticPaths() {
    const events = await getEvents(EventType.Events)
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
frontmatter.title = props.event.name + ' · Events'
frontmatter.description = props.event.shortDescription
</script>

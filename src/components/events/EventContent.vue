<template>
  <div>
    <HeroSection
      :title="event.name"
      :dark="!event.light"
      :image="event.image"
      :primary-button="{ text: 'Mehr Infos', to: '#beschreibung' }"
      :secondary-button="{ text: 'Anmeldung', to: '#anmeldung' }"
      wrap
      dense
    />
    <PageSection id="beschreibung" title="Beschreibung">
      <div v-html="event.description" />
    </PageSection>
    <EventDetails
      :event="event"
      :labelUpdates="labelUpdates"
      :subscribeSuccess="subscribeSuccess"
      :newsType="newsType"
      client:load
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Event } from '@/models'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
  labelUpdates: {
    type: String,
    required: true,
  },
  subscribeSuccess: {
    type: String,
    required: true,
  },
  newsType: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Contact to-title="Um welches Angebot geht es?" :to-items="toItems">
    <template #description>
      Du hast Fragen rund um unsere Fitnesskurse oder zu den Events? Dann nutze
      diese Kanäle um direkt mit den zuständigen Personen bei uns im Verein
      Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen schnellstmöglich.
    </template>
    <template #touches>
      <Touches class="pt-4" title="Fitnessangebot" :touches="fitness" />
      <Touches class="pt-4" title="Eventangebot" :touches="events" />
    </template>
  </Contact>
</template>

<script setup lang="ts">
import { Touch, TouchType } from '@/models'

const toItems = [
  { value: 'fitness@sv-eutingen.de', text: 'Fitness' },
  { value: 'events@sv-eutingen.de', text: 'Event' },
]

const events: Touch[] = [
  {
    type: TouchType.Email,
    text: 'events@sv-eutingen.de',
    href: 'mailto:events@sv-eutingen.de',
  },
]
const fitness: Touch[] = [
  {
    type: TouchType.Email,
    text: 'fitness@sv-eutingen.de',
    href: 'mailto:fitness@sv-eutingen.de',
  },
]
</script>

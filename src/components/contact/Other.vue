<template>
  <Contact :touches="touches">
    <template #description>
      Bei allen anderen Themen und Anliegen in Zusammenhang mit unserem Verein
      kannst Du diese Kanäle nutzen. Wir bearbeiten Dein Anliegen
      schnellstmöglich.
    </template>
    <template #touches>
      <Touches class="pt-4" :touches="touches" />
    </template>
  </Contact>
</template>

<script setup lang="ts">
import { Touch, TouchType } from '@/models'

const touches: Touch[] = [
  {
    type: TouchType.Email,
    text: 'info@sv-eutingen.de',
    href: 'mailto:info@sv-eutingen.de',
  },
]
</script>

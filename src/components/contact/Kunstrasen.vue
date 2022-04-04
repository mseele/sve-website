<template>
  <Contact to="kunstrasen@sv-eutingen.de">
    <template #description>
      Über diese Kanäle kannst Du eine Buchungsanfrage für unseren
      Kunstrasenplatz starten. Unser Ansprechpartner setzt sich dann direkt mit
      Dir in Verbindung und klärt alle Details.
    </template>
    <template #touches>
      <Touches
        class="pt-4"
        title="Ansprechpartner Johannes Seeger"
        :touches="touches"
      />
    </template>
  </Contact>
</template>

<script setup lang="ts">
import { Touch, TouchType } from '@/models'

const touches: Touch[] = [
  {
    type: TouchType.Phone,
    text: '0173 4205370',
    href: 'tel:+491734205370',
  },
  {
    type: TouchType.Email,
    text: 'kunstrasen@sv-eutingen.de',
    href: 'mailto:kunstrasen@sv-eutingen.de',
  },
  {
    type: TouchType.WhatsApp,
    text: 'WhatsApp',
    href: 'https://wa.me/491734205370',
  },
]
</script>

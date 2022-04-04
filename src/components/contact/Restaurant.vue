<template>
  <Contact to="ingo1508@gmx.de">
    <template #description>
      Du hast Fragen oder Buchungswünsche rund um unsere Gaststätte Auszeit?
      Über diese Kanäle kannst Du direkt mit unseren Pächtern in Kontakt treten.
      Wir freuen uns, Dich in der "Auszeit" begrüßen zu dürfen.
    </template>
    <template #touches>
      <Touches class="pt-4" title="Gastwirt Micha Gruidl" :touches="touches" />
    </template>
  </Contact>
</template>

<script setup lang="ts">
import { Touch, TouchType } from '@/models'

const touches: Touch[] = [
  {
    type: TouchType.Phone,
    text: '07459 1204',
    href: 'tel:+4974591204',
  },
  {
    type: TouchType.Email,
    text: 'ingo1508@gmx.de',
    href: 'mailto:ingo1508@gmx.de',
  },
]
</script>

<template>
  <Contact ref="contact" to-title="Um welches Thema geht es?" :to-items="items">
    <template #description>
      Du hast Fragen rund ums Sponsoring oder zur Bandenwerbung? Dann nutze
      diese Kanäle um direkt mit den zuständigen Personen bei uns im Verein
      Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen schnellstmöglich.
    </template>
    <template #touches>
      <header-title dark class="pt-4 text-xl font-medium">
        Partnerschaft
      </header-title>
      <Touches
        class="pt-4"
        title="Vorsitzender Sebastian Lazar"
        :touches="partnerschaft"
      />
      <HeaderTitle dark class="pt-4 text-xl font-medium">
        Bandenwerbung
      </HeaderTitle>
      <Touches
        class="pt-4"
        title="Vorsitzender Sebastian Lazar"
        :touches="partnerschaft"
      />
    </template>
  </Contact>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Touch, TouchType } from '@/models'
import Contact from '@/components/contact/Contact.vue'

const contact = ref<InstanceType<typeof Contact> | null>(null)

onMounted(() => {
  const selection = new URLSearchParams(window.location.search).get('thema')
  switch (selection) {
    case 'partnerschaft':
      nextTick(() => contact.value?.selectToItem(0))
      break
    case 'bande':
      nextTick(() => contact.value?.selectToItem(1))
      break
  }
})

const items = [
  {
    value: 'vorstand@sv-eutingen.de',
    text: 'Partnerschaft',
  },
  {
    value: 'vorstand@sv-eutingen.de',
    text: 'Bandenwerbung',
  },
]

const partnerschaft: Touch[] = [
  {
    type: TouchType.Phone,
    text: '0176 30774678',
    href: 'tel:+4917630774678',
  },
  {
    type: TouchType.Email,
    text: 'vorstand@sv-eutingen.de',
    href: 'mailto:vorstand@sv-eutingen.de',
  },
  {
    type: TouchType.WhatsApp,
    text: 'WhatsApp',
    href: 'https://wa.me/4917630774678',
  },
]
</script>

<template>
  <contact to="kunstrasen@sv-eutingen.de">
    <template #description>
      Über diese Kanäle kannst Du eine Buchungsanfrage für unseren
      Kunstrasenplatz starten. Unser Ansprechpartner setzt sich dann direkt mit
      Dir in Verbindung und klärt alle Details.
    </template>
    <template #touches>
      <touches
        class="pt-4"
        title="Ansprechpartner Johannes Seeger"
        :touches="touches"
      />
    </template>
  </contact>
</template>

<script>
import contact from './contact'
import touches from './touches'

export default {
  components: { contact, touches },
  setup() {
    return {
      touches: [
        {
          type: 'phone',
          text: '0173 4205370',
          href: 'tel:+491734205370',
        },
        {
          type: 'email',
          text: 'kunstrasen@sv-eutingen.de',
          href: 'mailto:kunstrasen@sv-eutingen.de',
        },
        {
          type: 'whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/491734205370',
        },
      ],
    }
  },
}
</script>

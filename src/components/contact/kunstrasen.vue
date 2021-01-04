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
  data() {
    return {
      touches: [
        {
          type: 'phone',
          text: '0157 85834875',
          href: 'tel:+4915785834875',
        },
        {
          type: 'email',
          text: 'kunstrasen@sv-eutingen.de',
          href: 'mailto:kunstrasen@sv-eutingen.de',
        },
        {
          type: 'whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/4915785834875',
        },
      ],
    }
  },
}
</script>

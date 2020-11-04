<template>
  <common type="Kunstrasen" to="kunstrasen@sv-eutingen.de" :touches="touches">
    <div class="pb-4">
      Über diese Kanäle kannst Du eine Buchungsanfrage für unseren
      Kunstrasenplatz starten. Unser Ansprechpartner setzt sich dann direkt mit
      Dir in Verbindung und klärt alle Details.
    </div>
    <h4>Ansprechpartner Johannes Seeger</h4>
  </common>
</template>

<script>
import { mdiPhone, mdiEmail, mdiWhatsapp } from '@mdi/js'
import common from '@/components/contact/Common'

export default {
  components: {
    common,
  },
  data() {
    return {
      touches: [
        {
          icon: mdiPhone,
          text: '0157 85834875',
          href: 'tel:+4915785834875',
        },
        {
          icon: mdiEmail,
          text: 'kunstrasen@sv-eutingen.de',
          href: 'mailto:kunstrasen@sv-eutingen.de',
        },
        {
          icon: mdiWhatsapp,
          text: 'WhatsApp',
          href: 'https://wa.me/4915785834875',
        },
      ],
    }
  },
}
</script>

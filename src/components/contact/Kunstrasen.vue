<template>
  <common
    type="Kunstrasen"
    to="kunstrasen.sveutingen@gmail.com"
    :touches="touches"
  >
    <div class="pb-4">
      Über diese Kanäle kannst Du eine Buchungsanfrage für unseren
      Kunstrasenplatz starten. Unser Ansprechpartner setzt sich dann direkt mit
      Dir in Verbindung und klärt alle Details.
    </div>
    <h4>Ansprechpartner Max Schmollinger</h4>
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
          text: '0176 31345456',
          href: 'tel:+4917631345456',
        },
        {
          icon: mdiEmail,
          text: 'kunstrasen.sveutingen@gmail.com',
          href: 'mailto:kunstrasen.sveutingen@gmail.com',
        },
        {
          icon: mdiWhatsapp,
          text: 'WhatsApp',
          href: 'https://wa.me/4917631345456',
        },
      ],
    }
  },
}
</script>

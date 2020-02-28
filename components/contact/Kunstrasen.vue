<template>
  <common
    type="Kunstrasen"
    to="kunstrasen.sveutingen@gmail.com"
    :touches="touches"
  >
    Du kannst über folgende Kanäle mit uns in Kontakt treten. Wir freuen uns auf
    deine Anfrage bla bla bla<br />
    Organisator der Kunstrasenbuchungen ist Max Schmollinger.
  </common>
</template>

<script>
import common from '~/components/contact/Common'

export default {
  components: {
    common
  },
  data() {
    return {
      touches: [
        {
          icon: 'mdi-phone',
          text: '0176 31345456',
          href: 'tel:+4917631345456'
        },
        {
          icon: 'mdi-email',
          text: 'kunstrasen.sveutingen@gmail.com',
          href: 'mailto:kunstrasen.sveutingen@gmail.com'
        },
        {
          icon: 'mdi-whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/4917631345456'
        }
      ]
    }
  }
}
</script>

<template>
  <common to="ingo1508@gmx.de" :touches="touches">
    <div class="pb-4">
      Du hast Fragen oder Buchungswünsche rund um unsere Gaststätte Auszeit?
      Über diese Kanäle kannst Du direkt mit unseren Pächtern in Kontakt treten.
      Wir freuen uns, Dich in der "Auszeit" begrüßen zu dürfen.
    </div>
    <h4>Gastwirt Micha Gruidl</h4>
  </common>
</template>

<script>
import { mdiPhone, mdiEmail } from '@mdi/js'
import common from '~/components/contact/Common'

export default {
  components: {
    common
  },
  data() {
    return {
      touches: [
        {
          icon: mdiPhone,
          text: '07459 1204',
          href: 'tel:+4974591204'
        },
        {
          icon: mdiEmail,
          text: 'ingo1508@gmx.de',
          href: 'mailto:ingo1508@gmx.de'
        }
      ]
    }
  }
}
</script>

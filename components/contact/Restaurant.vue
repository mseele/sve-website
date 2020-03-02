<template>
  <common to="ingo1508@gmx.de" :touches="touches">
    Du hast Fragen oder Buchungswünsche rund um unsere Gaststätte Auszeit? Über
    diese Kanäle kannst Du direkt mit unseren Pächtern in Kontakt treten. Wir
    freuen uns, Dich in der "Auszeit" begrüßen zu dürfen.
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
          text: '07459 1204',
          href: 'tel:+4974591204'
        },
        {
          icon: 'mdi-email',
          text: 'ingo1508@gmx.de',
          href: 'mailto:ingo1508@gmx.de'
        }
      ]
    }
  }
}
</script>

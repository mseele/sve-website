<template>
  <contact to="ingo1508@gmx.de">
    <template #description>
      Du hast Fragen oder Buchungswünsche rund um unsere Gaststätte Auszeit?
      Über diese Kanäle kannst Du direkt mit unseren Pächtern in Kontakt treten.
      Wir freuen uns, Dich in der "Auszeit" begrüßen zu dürfen.
    </template>
    <template #touches>
      <touches class="pt-4" title="Gastwirt Micha Gruidl" :touches="touches" />
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
          text: '07459 1204',
          href: 'tel:+4974591204',
        },
        {
          type: 'email',
          text: 'ingo1508@gmx.de',
          href: 'mailto:ingo1508@gmx.de',
        },
      ],
    }
  },
}
</script>

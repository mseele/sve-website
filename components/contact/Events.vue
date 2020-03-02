<template>
  <common type="Events" to="events@sv-eutingen.de" :touches="touches">
    Du hast Fragen rund um unser Eventangebot? Dann nutze diese Kanäle um direkt
    mit den zuständigen Personen bei uns im Verein Kontakt aufzunehmen. Wir
    bearbeiten Dein Anliegen schnellstmöglich.
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
          icon: 'mdi-email',
          text: 'events@sv-eutingen.de',
          href: 'mailto:events@sv-eutingen.de'
        }
      ]
    }
  }
}
</script>

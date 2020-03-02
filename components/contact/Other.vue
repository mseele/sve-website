<template>
  <common :touches="touches">
    Bei allen anderen Themen und Anliegen in Zusammenhang mit unserem Verein
    kannst Du diese Kanäle nutzen. Wir bearbeiten Dein Anliegen
    schnellstmöglich.
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
          text: 'info@sv-eutingen.de',
          href: 'mailto:info@sv-eutingen.de'
        }
      ]
    }
  }
}
</script>

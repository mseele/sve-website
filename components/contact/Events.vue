<template>
  <common type="Events" to="events@sv-eutingen.de" :touches="touches">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At
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

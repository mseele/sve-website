<template>
  <common to="ingo1508@gmx.de" :touches="touches">
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

<template>
  <v-row>
    <v-col cols="12" lg="6">
      <h3>Kontakt aufnehmen</h3>
      <p class="pt-6">
        <slot></slot>
      </p>
      <touches :touches="touches"></touches>
    </v-col>
    <v-col cols="12" lg="6">
      <h3>Nachricht senden</h3>
      <send-message :type="type" :to="to" class="pt-6"></send-message>
    </v-col>
  </v-row>
</template>

<script>
import touches from '~/components/common/Touches'
import sendMessage from '~/components/contact/SendMessage'

export default {
  components: {
    touches,
    sendMessage
  },
  props: {
    type: {
      type: String,
      default: 'General'
    },
    to: {
      type: String,
      default: 'info@sv-eutingen.de'
    },
    touches: {
      type: Array,
      default: () => []
    }
  }
}
</script>

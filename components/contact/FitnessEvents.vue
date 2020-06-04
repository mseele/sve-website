<template>
  <v-row>
    <v-col cols="12" lg="6">
      <h3>Kontakt aufnehmen</h3>
      <p class="pt-6">
        Du hast Fragen rund um unsere Fitnesskurse oder zu den Events? Dann
        nutze diese Kanäle um direkt mit den zuständigen Personen bei uns im
        Verein Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen
        schnellstmöglich.
      </p>
      <div class="pt-4">
        <h4>Fitnessangebot</h4>
        <touches :touches="fitness"></touches>
      </div>
      <div class="pt-4">
        <h4>Eventangebot</h4>
        <touches :touches="events"></touches>
      </div>
    </v-col>
    <v-col cols="12" lg="6">
      <h3>Nachricht senden</h3>
      <v-row no-gutters class="pt-6">
        <v-col cols="12">
          <v-select
            v-model="to"
            label="Um welches Angebot geht es?"
            :items="toItems"
            item-text="text"
            item-value="value"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <send-message :to="to"></send-message>
    </v-col>
  </v-row>
</template>

<script>
import { mdiEmail } from '@mdi/js'
import touches from '~/components/common/Touches'
import sendMessage from '~/components/contact/SendMessage'

export default {
  components: {
    touches,
    sendMessage,
  },
  data() {
    return {
      toItems: [
        { value: 'fitness@sv-eutingen.de', text: 'Fitness' },
        { value: 'events@sv-eutingen.de', text: 'Event' },
      ],
      to: 'fitness@sv-eutingen.de',
      events: [
        {
          icon: mdiEmail,
          text: 'events@sv-eutingen.de',
          href: 'mailto:events@sv-eutingen.de',
        },
      ],
      fitness: [
        {
          icon: mdiEmail,
          text: 'fitness@sv-eutingen.de',
          href: 'mailto:fitness@sv-eutingen.de',
        },
      ],
      mdiEmail,
    }
  },
}
</script>

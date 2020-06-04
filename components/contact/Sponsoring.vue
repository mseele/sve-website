<template>
  <v-row>
    <v-col cols="12" lg="6">
      <h3>Kontakt aufnehmen</h3>
      <p class="pt-6">
        Du hast Fragen rund ums Sponsoring oder zur Bandenwerbung? Dann nutze
        diese Kanäle um direkt mit den zuständigen Personen bei uns im Verein
        Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen schnellstmöglich.
      </p>
      <div class="pt-4">
        <h3>Sponsoring</h3>
        <h4 class="pt-4">Vorsitzender Sebastian Lazar</h4>
        <touches :touches="sponsoring"></touches>
      </div>
      <div class="pt-6">
        <h3>Bandenwerbung</h3>
        <h4 class="pt-4">Franz Nesch</h4>
        <touches :touches="bandeFranz"></touches>
        <h4 class="pt-4">Thomas Akermann</h4>
        <touches :touches="bandeThomas"></touches>
      </div>
    </v-col>
    <v-col cols="12" lg="6">
      <h3>Nachricht senden</h3>
      <v-row no-gutters class="pt-6">
        <v-col cols="12">
          <v-select
            v-model="item"
            label="Um welches Thema geht es?"
            :items="items"
            item-text="text"
            item-value="value"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <send-message
        :to="items.value === 'sponsoring' ? emailSponsoring : emailBande"
      ></send-message>
    </v-col>
  </v-row>
</template>

<script>
import { mdiEmail } from '@mdi/js'
import touches from '~/components/common/Touches'
import sendMessage from '~/components/contact/SendMessage'

const emailSponsoring = 'vorstand@sv-eutingen.de'
const emailBande = 'franznesch@kabelbw.de'

export default {
  components: {
    touches,
    sendMessage,
  },
  data() {
    return {
      items: [
        {
          value: 'sponsoring',
          text: 'Sponsoring',
        },
        {
          value: 'bande',
          text: 'Bandenwerbung',
        },
      ],
      item: 'sponsoring',
      sponsoring: [
        {
          icon: mdiEmail,
          text: emailSponsoring,
          href: 'mailto:' + emailSponsoring,
        },
      ],
      bandeFranz: [
        {
          icon: mdiEmail,
          text: emailBande,
          href: 'mailto:' + emailBande,
        },
      ],
      bandeThomas: [
        {
          icon: mdiEmail,
          text: 'tsakermann@kabelbw.de',
          href: 'mailto:tsakermann@kabelbw.de',
        },
      ],
      mdiEmail,
      emailSponsoring,
      emailBande,
    }
  },
  mounted() {
    const selection = this.$route.query.thema
    if (selection) {
      this.item = selection
    }
  },
}
</script>

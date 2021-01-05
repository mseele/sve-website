<template>
  <contact ref="contact" to-title="Um welches Thema geht es?" :to-items="items">
    <template #description>
      Du hast Fragen rund ums Sponsoring oder zur Bandenwerbung? Dann nutze
      diese Kanäle um direkt mit den zuständigen Personen bei uns im Verein
      Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen schnellstmöglich.
    </template>
    <template #touches>
      <header-title dark class="pt-4 text-xl font-medium">
        Sponsoring
      </header-title>
      <touches
        class="pt-4"
        title="Vorsitzender Sebastian Lazar"
        :touches="sponsoring"
      />
      <header-title dark class="pt-4 text-xl font-medium">
        Bandenwerbung
      </header-title>
      <touches class="pt-4" title="Franz Nesch" :touches="bandeFranz" />
      <touches class="pt-4" title="Thomas Akermann" :touches="bandeThomas" />
    </template>
  </contact>
</template>

<script>
import headerTitle from '@/components/controls/headerTitle'
import contact from './contact'
import touches from './touches'

const emailSponsoring = 'vorstand@sv-eutingen.de'
const emailBande = 'franznesch@kabelbw.de'

export default {
  components: { headerTitle, contact, touches },
  data() {
    return {
      items: [
        {
          value: emailSponsoring,
          text: 'Sponsoring',
        },
        {
          value: emailBande,
          text: 'Bandenwerbung',
        },
      ],
      sponsoring: [
        {
          type: 'phone',
          text: '0176 30774678',
          href: 'tel:+4917630774678',
        },
        {
          type: 'email',
          text: emailSponsoring,
          href: 'mailto:' + emailSponsoring,
        },
        {
          type: 'whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/4917630774678',
        },
      ],
      bandeFranz: [
        {
          type: 'phone',
          text: '07459 8720',
          href: 'tel:+4974598720',
        },
        {
          type: 'email',
          text: emailBande,
          href: 'mailto:' + emailBande,
        },
      ],
      bandeThomas: [
        {
          type: 'phone',
          text: '07459 1003',
          href: 'tel:+4974591003',
        },
        {
          type: 'email',
          text: 'tsakermann@kabelbw.de',
          href: 'mailto:tsakermann@kabelbw.de',
        },
      ],
    }
  },
  mounted() {
    const selection = this.$route.query.thema
    if (selection) {
      switch (selection) {
        case 'sponsoring':
          this.$nextTick(() => this.$refs.contact.selectToItem(0))
          break
        case 'bande':
          this.$nextTick(() => this.$refs.contact.selectToItem(1))
          break
      }
    }
  },
}
</script>

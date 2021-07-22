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
      <touches
        class="pt-4"
        title="Vorsitzender Sebastian Lazar"
        :touches="sponsoring"
      />
    </template>
  </contact>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import headerTitle from '@/components/controls/headerTitle'
import contact from './contact'
import touches from './touches'

export default {
  components: { headerTitle, contact, touches },
  setup(props, { root }) {
    const contact = ref()

    onMounted(() => {
      const selection = root.$route.query.thema
      if (selection) {
        switch (selection) {
          case 'sponsoring':
            root.$nextTick(() => contact.value.selectToItem(0))
            break
          case 'bande':
            root.$nextTick(() => contact.value.selectToItem(1))
            break
        }
      }
    })

    return {
      contact,
      items: [
        {
          value: 'vorstand@sv-eutingen.de',
          text: 'Sponsoring',
        },
        {
          value: 'vorstand@sv-eutingen.de',
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
          text: 'vorstand@sv-eutingen.de',
          href: 'mailto:vorstand@sv-eutingen.de',
        },
        {
          type: 'whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/4917630774678',
        },
      ],
    }
  },
}
</script>

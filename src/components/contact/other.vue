<template>
  <contact :touches="touches">
    <template #description>
      Bei allen anderen Themen und Anliegen in Zusammenhang mit unserem Verein
      kannst Du diese Kanäle nutzen. Wir bearbeiten Dein Anliegen
      schnellstmöglich.
    </template>
    <template #touches>
      <touches class="pt-4" :touches="touches" />
    </template>
  </contact>
</template>

<script>
import contact from './contact'
import touches from './touches'

export default {
  components: { contact, touches },
  setup() {
    return {
      touches: [
        {
          type: 'email',
          text: 'info@sv-eutingen.de',
          href: 'mailto:info@sv-eutingen.de',
        },
      ],
    }
  },
}
</script>

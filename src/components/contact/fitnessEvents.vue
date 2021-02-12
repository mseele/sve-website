<template>
  <contact to-title="Um welches Angebot geht es?" :to-items="toItems">
    <template #description>
      Du hast Fragen rund um unsere Fitnesskurse oder zu den Events? Dann nutze
      diese Kanäle um direkt mit den zuständigen Personen bei uns im Verein
      Kontakt aufzunehmen. Wir bearbeiten Dein Anliegen schnellstmöglich.
    </template>
    <template #touches>
      <touches class="pt-4" title="Fitnessangebot" :touches="fitness" />
      <touches class="pt-4" title="Eventangebot" :touches="events" />
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
      toItems: [
        { value: 'fitness@sv-eutingen.de', text: 'Fitness' },
        { value: 'events@sv-eutingen.de', text: 'Event' },
      ],
      events: [
        {
          type: 'email',
          text: 'events@sv-eutingen.de',
          href: 'mailto:events@sv-eutingen.de',
        },
      ],
      fitness: [
        {
          type: 'email',
          text: 'fitness@sv-eutingen.de',
          href: 'mailto:fitness@sv-eutingen.de',
        },
      ],
    }
  },
}
</script>

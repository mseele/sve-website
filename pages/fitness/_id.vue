<template>
  <event
    :event="event"
    label-updates="Ich möchte über zukünftige Kurse per E-Mail informiert werden"
  >
    <template v-slot:bookingHeader>
      Um sich verbindlich für den Kurs anzumelden, trage bitte hier Deine Daten
      ein. Du wirst von uns anschließend per E-Mail über alles Weitere
      informiert.
    </template>
  </event>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'transparent',
  components: {
    event: () => import('~/components/events/Event')
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return { event: payload }
    } else {
      const res = await axios.get(process.env.eventsAPI)
      const result = res.data.find((e) => e.id.toString() === params.id)
      if (result) {
        return { event: result }
      }
      error({ statusCode: 404, message: 'Fitnesskurs nicht vorhanden' })
    }
  },
  head() {
    return {
      title: this.event.name + ' - Fitness'
    }
  }
}
</script>

<template>
  <v-layout>
    <v-flex class="text-center">
      {{ event.name }}
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params, error, payload }) {
    if (payload) {
      return { event: payload }
    } else {
      const res = await axios.get(process.env.eventsAPI)
      const result = res.data.find((e) => e.id.toString() === params.id)
      if (result) {
        return { event: result }
      }
      error({ statusCode: 404, message: 'Event nicht vorhanden' })
    }
  },
  head() {
    return {
      title: this.event.name + ' - Fitness'
    }
  }
}
</script>

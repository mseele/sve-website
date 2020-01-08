<template>
  <v-layout>
    <v-flex class="text-center">
      events
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {
    const res = await axios.get(process.env.eventsAPI)
    return { events: res.data }
  },
  head() {
    return {
      title: 'Events'
    }
  }
}
</script>

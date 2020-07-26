<template>
  <Layout :transparent="true" :light="$page.event.light">
    <event
      :event="$page.event"
      label-updates="Ich möchte über zukünftige Kurse per E-Mail informiert werden"
    >
      <template v-slot:bookingHeader>
        Um sich verbindlich für den Kurs anzumelden, trage bitte hier Deine
        Daten ein. Du wirst von uns anschließend per E-Mail über alles Weitere
        informiert.
      </template>
    </event>
  </Layout>
</template>

<script>
import axios from 'axios'
import event from '@/components/events/Event'

export default {
  metaInfo() {
    return {
      title: this.$page.event.name + ' - Fitness',
    }
  },
  components: {
    event,
  },
}
</script>

<page-query>
query($id: ID!) {
  event(id: $id) {
    id
    name
    type
    image
    description
    light
    dates
    location
    customDate
    durationInMinutes
    costMember
    costNonMember
    externalOperator
  }
}
</page-query>

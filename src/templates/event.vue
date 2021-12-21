<template>
  <Layout :transparent="true" :light="$page.event.light">
    <event
      :event="$page.event"
      label-updates="Ich möchte über zukünftige Events per E-Mail informiert werden"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
    >
      <template #bookingHeader>
        Um sich verbindlich für das Event anzumelden, trage bitte hier Deine
        Daten ein. Du wirst von uns anschließend per E-Mail über alles Weitere
        informiert.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Events online sind.
      </template>
    </event>
  </Layout>
</template>

<script>
import event from '@/components/events/event'

export default {
  metaInfo() {
    return {
      title: this.$page.event.name + ' - Events',
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
    duration
    costMember
    costNonMember
    altBookingButtonText
    externalOperator
  }
}
</page-query>

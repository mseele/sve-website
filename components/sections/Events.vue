<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="(event, index) in events"
        :key="index"
        cols="12"
        sm="6"
        xl="4"
      >
        <v-card outlined class="mx-auto flexcard" height="100%">
          <v-img
            :src="require('~/assets/events/' + event.image)"
            aspect-ratio="2.75"
          />
          <v-card-text class="text--primary flexgrow flexcard">
            <div class="align-start">
              <div class="headline">{{ event.name }}</div>
              <span
                v-if="!event.bookedUp"
                class="green--text subtitle-2 font-weight-medium"
              >
                {{ (event.maxSubscribers - event.subscribers) | toSubscribers }}
              </span>
              <span v-else class="red--text subtitle-2 font-weight-medium">
                Ausgebucht
              </span>
              <div class="pt-5 body-2">{{ event.shortDescription }}</div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              rounded
              text
              color="primary"
              class="px-5"
              :append="true"
              :to="event.id"
            >
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
}
</script>

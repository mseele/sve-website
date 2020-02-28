<template>
  <v-container fluid fill-height class="align-start section">
    <v-row no-gutters>
      <v-col cols="12">
        <v-container>
          <v-row align="start">
            <v-col cols="12">
              <h2>KONTAKT</h2>
            </v-col>
            <v-col cols="12" class="subtitle-1">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </v-col>
          </v-row>
          <v-row class="pb-6">
            <v-col cols="12">
              <v-select
                v-model="item"
                label="Ich möchte"
                :items="items"
                item-text="text"
                item-value="value"
                outlined
                hide-details
              ></v-select>
            </v-col>
          </v-row>
          <team v-if="item === 'team'"></team>
          <kunstrasen v-if="item === 'kunstrasen'"></kunstrasen>
          <fitness v-if="item === 'fitness'"></fitness>
          <events v-if="item === 'events'"></events>
          <restaurant v-if="item === 'restaurant'"></restaurant>
          <other v-if="item === 'other'"></other>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import team from '~/components/contact/Team'
import kunstrasen from '~/components/contact/Kunstrasen'
import fitness from '~/components/contact/Fitness'
import events from '~/components/contact/Events'
import restaurant from '~/components/contact/Restaurant'
import other from '~/components/contact/Other'

export default {
  components: {
    team,
    kunstrasen,
    fitness,
    events,
    restaurant,
    other
  },
  data() {
    return {
      items: [
        { value: 'team', text: 'Kontakt zu einer Mannschaft herstellen' },
        { value: 'kunstrasen', text: 'den Kunstrasen buchen' },
        {
          value: 'fitness',
          text: 'Kontakt zum Thema Fitnessangebote aufnehmen'
        },
        { value: 'events', text: 'Kontakt zum Thema Events aufnehmen' },
        {
          value: 'restaurant',
          text: 'Kontakt zur Gaststätte "Auszeit" aufnehmen'
        },
        { value: 'other', text: 'ein anderes Thema besprechen' }
      ],
      item: null
    }
  },
  mounted() {
    const selection = this.$route.query.auswahl
    if (selection) {
      this.item = selection
    }
  },
  head() {
    return {
      title: 'Kontakt'
    }
  }
}
</script>

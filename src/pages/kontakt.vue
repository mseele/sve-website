<template>
  <Layout>
    <v-container fluid fill-height class="align-start section">
      <v-row no-gutters>
        <v-col cols="12">
          <v-container>
            <v-row align="start">
              <v-col cols="12">
                <h2>KONTAKT</h2>
              </v-col>
              <v-col cols="12" class="subtitle-1">
                Über dieses Kontaktformular leiten wir Dich direkt an die
                richtige Person in unserem Verein und geben unser Bestes, um
                Dein Anliegen schnellstmöglich zu bearbeiten. Bitte wähle die
                passende Kategorie zu deinem Anliegen über das Auswahlfeld aus.
                Wir freuen uns von Dir zu hören.
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
            <kunstrasen v-else-if="item === 'kunstrasen'"></kunstrasen>
            <fitness-events
              v-else-if="item === 'fitness-events'"
            ></fitness-events>
            <events v-else-if="item === 'events'"></events>
            <restaurant v-else-if="item === 'restaurant'"></restaurant>
            <sponsoring v-else-if="item === 'sponsoring'"></sponsoring>
            <other v-else-if="item === 'other'"></other>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import team from '@/components/contact/Team'
import kunstrasen from '@/components/contact/Kunstrasen'
import fitnessEvents from '@/components/contact/FitnessEvents'
import restaurant from '@/components/contact/Restaurant'
import sponsoring from '@/components/contact/Sponsoring'
import other from '@/components/contact/Other'

export default {
  metaInfo: {
    title: 'Kontakt',
  },
  components: {
    team,
    kunstrasen,
    fitnessEvents,
    restaurant,
    sponsoring,
    other,
  },
  data() {
    return {
      items: [
        { value: 'team', text: 'Kontakt zu einer Mannschaft herstellen' },
        { value: 'kunstrasen', text: 'den Kunstrasen buchen' },
        {
          value: 'fitness-events',
          text: 'Kontakt zum Thema Fitness/Eventangebote aufnehmen',
        },
        {
          value: 'restaurant',
          text: 'Kontakt zur Gaststätte "Auszeit" aufnehmen',
        },
        { value: 'sponsoring', text: 'Kontakt zum Thema Sponsoring aufnehmen' },
        { value: 'other', text: 'ein anderes Thema besprechen' },
      ],
      item: null,
    }
  },
  mounted() {
    const selection = this.$route.query.auswahl
    if (selection) {
      this.item = selection
    }
  },
}
</script>

<template>
  <Layout>
    <page-section title="Kontakt">
      <div class="pb-4">
        Über dieses Kontaktformular leiten wir Dich direkt an die richtige
        Person in unserem Verein und geben unser Bestes, um Dein Anliegen
        schnellstmöglich zu bearbeiten. Bitte wähle die passende Kategorie zu
        deinem Anliegen über das Auswahlfeld aus. Wir freuen uns von Dir zu
        hören.
      </div>
      <div class="w-full">
        <input-label name="category">Ich möchte</input-label>
        <select id="category" v-model="category" class="w-full text-input">
          <option disabled selected value>...</option>
          <option
            v-for="(item, index) in categories"
            :key="index"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
      <div v-if="category" class="pt-4">
        <component :is="category" />
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import inputLabel from '@/components/controls/InputLabel'
import team from '@/components/contact/team'
import kunstrasen from '@/components/contact/kunstrasen'
import fitnessEvents from '@/components/contact/fitnessEvents'
import restaurant from '@/components/contact/restaurant'
import sponsoring from '@/components/contact/sponsoring'
import other from '@/components/contact/other'

export default {
  metaInfo: {
    title: 'Kontakt',
  },
  components: {
    pageSection,
    inputLabel,
    team,
    kunstrasen,
    fitnessEvents,
    restaurant,
    sponsoring,
    other,
  },
  data() {
    return {
      categories: [
        { value: 'team', text: 'Kontakt zu einer Mannschaft herstellen' },
        { value: 'kunstrasen', text: 'den Kunstrasen buchen' },
        {
          value: 'fitnessEvents',
          text: 'Kontakt zum Thema Fitness/Eventangebote aufnehmen',
        },
        {
          value: 'restaurant',
          text: 'Kontakt zur Gaststätte "Auszeit" aufnehmen',
        },
        { value: 'sponsoring', text: 'Kontakt zum Thema Sponsoring aufnehmen' },
        { value: 'other', text: 'ein anderes Thema besprechen' },
      ],
      category: null,
    }
  },
  mounted() {
    const selection = this.$route.query.auswahl
    if (selection) {
      this.category = selection
    }
  },
}
</script>

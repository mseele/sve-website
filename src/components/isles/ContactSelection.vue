<template>
  <div class="w-full">
    <InputLabel name="category">Ich möchte</InputLabel>
    <select id="category" v-model="category" class="text-input w-full">
      <option disabled selected value="">...</option>
      <option
        v-for="(item, index) in categories"
        :key="index"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>
    <div v-if="category" class="pt-4">
      <component :is="category" />
    </div>
  </div>
</template>

<script lang="ts">
import team from '@/components/contact/Team.vue'
import kunstrasen from '@/components/contact/Kunstrasen.vue'
import fitnessEvents from '@/components/contact/FitnessEvents.vue'
import restaurant from '@/components/contact/Restaurant.vue'
import partnerschaft from '@/components/contact/Partnerschaft.vue'
import other from '@/components/contact/Other.vue'

export default {
  components: {
    team,
    kunstrasen,
    fitnessEvents,
    restaurant,
    partnerschaft,
    other,
  },
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const category = ref<string>()

onMounted(() => {
  const selection = new URLSearchParams(window.location.search).get('auswahl')
  if (selection) {
    nextTick(() => {
      category.value = selection
    })
  }
})

const categories = [
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
  { value: 'partnerschaft', text: 'Kontakt zum Thema Partnerschaft aufnehmen' },
  { value: 'other', text: 'ein anderes Thema besprechen' },
]
</script>

<template>
  <div class="flex flex-col">
    <div
      class="mx-auto flex overflow-hidden rounded border-2 border-red-800 bg-red-800"
    >
      <button
        aria-label="subscribe"
        class="px-4 py-1 focus:outline-none"
        :class="{
          'text-white': subscribe,
          'bg-white': !subscribe,
        }"
        @click="subscribe = true"
      >
        Anmelden
      </button>
      <button
        aria-label="unsubscribe"
        class="px-4 py-1 focus:outline-none"
        :class="{
          'text-white': !subscribe,
          'bg-white': subscribe,
        }"
        @click="subscribe = false"
      >
        Abmelden
      </button>
    </div>
    <div class="mx-auto flex py-6">
      <div class="space-y-4">
        <Switch v-model="common">
          <span class="font-medium">Allgemein</span>
          <span class="text-sm"> (Info's rund um den SV Eutingen)</span>
        </Switch>
        <Switch v-model="fitness">
          <span class="font-medium">Fitness</span>
          <span class="text-sm"> (Alles über unser Fitnessangebot)</span>
        </Switch>
        <Switch v-model="events">
          <span class="font-medium">Events</span>
          <span class="text-sm"> (Neuigkeiten über unsere Events)</span>
        </Switch>
      </div>
    </div>
    <EmailSubscription
      :success-message="successMessage"
      :type="type"
      :news-types="newsTypes"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const subscribe = ref(true)
const common = ref(true)
const fitness = ref(true)
const events = ref(true)

const type = computed(() => {
  return subscribe.value ? 'subscribe' : 'unsubscribe'
})

const newsTypes = computed(() => {
  const types = []
  if (common.value) {
    types.push('General')
  }
  if (fitness.value) {
    types.push('Fitness')
  }
  if (events.value) {
    types.push('Events')
  }
  return types
})

const successMessage = computed(() => {
  return subscribe.value
    ? 'Du erhälst für die ausgewählten Optionen automatisch eine E-Mail. Vielen Dank.'
    : 'Du bist für die ausgewählten Optionen vom Newsletter abgemeldet worden und erhälst ab sofort keine Emails mehr.'
})
</script>

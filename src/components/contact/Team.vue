<template>
  <div>
    <div class="w-full">
      <InputLabel name="team">Um welche Mannschaft geht es?</InputLabel>
      <select id="team" v-model="team" class="text-input w-full">
        <option disabled selected value>...</option>
        <option
          v-for="(item, index) in teams()"
          :key="index"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
    <Contact
      v-if="team"
      :to-items="toItems"
      to-label="Wen möchtest du kontaktieren?"
    >
      <template #description>
        Unsere Ansprechpartner stehen Dir für sämtliche Fragen rund um unseren
        Spielbetrieb zur Verfügung. Du erreichst Sie über folgende Kanäle oder
        kannst Ihnen ganz einfach eine Nachricht per Kontaktformular senden.
      </template>
      <template #touches>
        <Touches
          v-if="coachTouches(team).length > 0"
          class="pt-4"
          :title="coachName(team)"
          :touches="coachTouches(team)"
        />
        <Touches
          v-if="contactTouches(team).length > 0"
          class="pt-4"
          :title="contactName(team)"
          :touches="contactTouches(team)"
        />
      </template>
    </Contact>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import data from '@/data/teams'
import {
  Touch,
  TouchType,
  Team,
  Coach,
  Contact as PContact,
  Item,
  PersonalData,
} from '@/models'

const team = ref<string>()
const toItems = ref<Item[]>([])
const to = ref<string>()

onMounted(() => {
  const selection = new URLSearchParams(window.location.search).get('team')
  if (selection) {
    team.value = selection
  }
})

watch(team, (val) => {
  const items: Item[] = []
  if (val) {
    const team = findTeam(val)
    if (team) {
      if (team.coach?.email) {
        items.push({
          value: team.coach.email,
          text: fullyQualifiedCoachName(team.coach),
        })
      }
      if (team.contact?.email) {
        items.push({
          value: team.contact.email,
          text: fullyQualifiedContactName(team.contact),
        })
      }
    }
  }
  nextTick(() => {
    toItems.value = items
    to.value = items.length > 0 ? items[0].value : 'info@sv-eutingen.de'
  })
})

const groups = [
  { key: 'herren', text: 'Herrenfussball' },
  { key: 'frauen', text: 'Frauenfussball' },
  { key: 'jugend_herren', text: 'Jugendfussball (männlich)' },
  { key: 'jugend_frauen', text: 'Jugendfussball (weiblich)' },
  { key: 'kinder', text: 'Kinderfussball' },
  { key: 'volleyball', text: 'Volleyball' },
]

function teams(): Item[] {
  const teams: Item[] = []
  for (const group of groups) {
    for (const item of data[group.key]) {
      teams.push({ value: item.key, text: group.text + ' - ' + item.team })
    }
  }
  return teams
}

function coachName(key: string) {
  const team = findTeam(key)
  if (team?.coach) {
    return fullyQualifiedCoachName(team.coach)
  }
  return undefined
}

function coachTouches(key: string) {
  const team = findTeam(key)
  if (team?.coach) {
    return resolveTouches(team.coach)
  }
  return []
}

function contactName(key: string) {
  const team = findTeam(key)
  if (team != null && team.contact != null) {
    return fullyQualifiedContactName(team.contact)
  }
  return '-'
}

function contactTouches(key: string) {
  const team = findTeam(key)
  if (team != null && team.contact != null) {
    return resolveTouches(team.contact)
  }
  return []
}

function resolveTouches(data: PersonalData): Touch[] {
  const touches: Touch[] = []
  if (data.phone) {
    touches.push({
      type: TouchType.Phone,
      text: data.phone.formatted,
      href: 'tel:' + data.phone.raw,
    })
  }
  if (data.mobile) {
    touches.push({
      type: TouchType.Phone,
      text: data.mobile.formatted,
      href: 'tel:' + data.mobile.raw,
    })
  }
  if (data.email) {
    touches.push({
      type: TouchType.Email,
      text: data.email,
      href: 'mailto:' + data.email,
    })
  }
  if (data.mobile) {
    touches.push({
      type: TouchType.WhatsApp,
      text: 'WhatsApp',
      href: 'https://wa.me/' + data.mobile.raw.substring(1),
    })
  }
  return touches
}

function findTeam(key: string): Team | undefined {
  for (const name in data) {
    for (const team of data[name]) {
      if (team.key === key) {
        return team
      }
    }
  }
  return undefined
}

function fullyQualifiedCoachName(coach: Coach) {
  const prefix = coach.title || 'Trainer'
  return prefix + ' ' + coach.name
}

function fullyQualifiedContactName(contact: PContact) {
  return contact.title + ' ' + contact.name
}
</script>

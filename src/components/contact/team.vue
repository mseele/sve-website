<template>
  <div>
    <div class="w-full">
      <input-label name="team">Um welche Mannschaft geht es?</input-label>
      <select id="team" v-model="team" class="w-full text-input">
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
    <contact
      v-if="team"
      :to-items="toItems"
      to-label="Wenn möchtest du kontaktieren?"
    >
      <template #description>
        Unsere Ansprechpartner stehen Dir für sämtliche Fragen rund um unseren
        Spielbetrieb zur Verfügung. Du erreichst Sie über folgende Kanäle oder
        kannst Ihnen ganz einfach eine Nachricht per Kontaktformular senden.
      </template>
      <template #touches>
        <touches
          v-if="coachTouches(team).length > 0"
          class="pt-4"
          :title="coachName(team)"
          :touches="coachTouches(team)"
        />
        <touches
          v-if="contactTouches(team).length > 0"
          class="pt-4"
          :title="contactName(team)"
          :touches="contactTouches(team)"
        />
      </template>
    </contact>
  </div>
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import inputLabel from '@/components/controls/inputLabel'
import contact from './contact'
import touches from './touches'
import data from '@/data/teams.js'

export default {
  components: { inputLabel, contact, touches },
  setup(props, { root }) {
    const team = ref(null)
    const toItems = ref([])
    const to = ref(null)

    onMounted(() => {
      const selection = root.$route.query.team
      if (selection) {
        team.value = selection
      }
    })

    watch(team, (val) => {
      const items = []
      if (val != null) {
        const team = findTeam(val)
        if (team != null) {
          if (team.coach && team.coach.email) {
            items.push({
              value: team.coach.email,
              text: fullyQualifiedCoachName(team.coach),
            })
          }
          if (team.contact && team.contact.email) {
            items.push({
              value: team.contact.email,
              text: fullyQualifiedContactName(team.contact),
            })
          }
        }
      }
      root.$nextTick(() => {
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

    function teams() {
      const teams = []
      for (const group of groups) {
        for (const item of data[group.key]) {
          teams.push({ value: item.key, text: group.text + ' - ' + item.team })
        }
      }
      return teams
    }

    function coachName(key) {
      const team = findTeam(key)
      if (team != null && team.coach != null) {
        return fullyQualifiedCoachName(team.coach)
      }
      return null
    }

    function coachTouches(key) {
      const team = findTeam(key)
      if (team != null && team.coach != null) {
        return resolveTouches(team.coach)
      }
      return []
    }

    function contactName(key) {
      const team = findTeam(key)
      if (team != null && team.contact != null) {
        return fullyQualifiedContactName(team.contact)
      }
      return null
    }

    function contactTouches(key) {
      const team = findTeam(key)
      if (team != null && team.contact != null) {
        return resolveTouches(team.contact)
      }
      return []
    }

    function resolveTouches(contact) {
      const touches = []
      if (contact.phone) {
        touches.push({
          type: 'phone',
          text: contact.phone.formatted,
          href: 'tel:' + contact.phone.raw,
        })
      }
      if (contact.mobile) {
        touches.push({
          type: 'phone',
          text: contact.mobile.formatted,
          href: 'tel:' + contact.mobile.raw,
        })
      }
      if (contact.email) {
        touches.push({
          type: 'email',
          text: contact.email,
          href: 'mailto:' + contact.email,
        })
      }
      if (contact.mobile) {
        touches.push({
          type: 'whatsapp',
          text: 'WhatsApp',
          href: 'https://wa.me/' + contact.mobile.raw.substring(1),
        })
      }
      return touches
    }

    function findTeam(key) {
      for (const name in data) {
        for (const team of data[name]) {
          if (team.key === key) {
            return team
          }
        }
      }
      return null
    }

    function fullyQualifiedCoachName(coach) {
      const prefix = coach.title ? coach.title : 'Trainer'
      return prefix + ' ' + coach.name
    }

    function fullyQualifiedContactName(contact) {
      return contact.title + ' ' + contact.name
    }

    return {
      team,
      toItems,
      to,
      teams,
      coachName,
      coachTouches,
      contactName,
      contactTouches,
    }
  },
}
</script>

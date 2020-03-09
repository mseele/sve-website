<template>
  <v-row>
    <v-col cols="12" class="pb-6">
      <v-select
        v-model="team"
        label="Um welche Mannschaft geht es?"
        :items="teams()"
        item-text="text"
        item-value="value"
        outlined
        hide-details
      ></v-select>
    </v-col>
    <v-col v-if="team != null" cols="12" lg="6">
      <h3>Kontakt aufnehmen</h3>
      <p class="pt-6">
        Unsere Ansprechpartner stehen Dir für sämtliche Fragen rund um unseren
        Spielbetrieb zur Verfügung. Du erreichst Sie über folgende Kanäle oder
        kannst Ihnen ganz einfach eine Nachricht per Kontaktformular enden.
      </p>
      <div v-if="coachName(team) != null" class="pt-4">
        <h4>{{ coachName(team) }}</h4>
        <touches :touches="coachTouches(team)"></touches>
      </div>
      <div v-if="contactName(team) != null" class="pt-4">
        <h4>{{ contactName(team) }}</h4>
        <touches :touches="contactTouches(team)"></touches>
      </div>
    </v-col>
    <v-col v-if="team != null" cols="12" lg="6">
      <h3>Nachricht senden</h3>
      <v-row v-if="toItems.length > 1" no-gutters class="pt-6">
        <v-col cols="12">
          <v-select
            v-model="to"
            label="Wenn möchtest du kontaktieren?"
            :items="toItems"
            item-text="text"
            item-value="value"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <send-message
        :to="to"
        :class="{ 'pt-6': toItems.length <= 1 }"
      ></send-message>
    </v-col>
  </v-row>
</template>

<script>
import { mdiPhone, mdiEmail, mdiWhatsapp } from '@mdi/js'
import touches from '~/components/common/Touches'
import sendMessage from '~/components/contact/SendMessage'

export default {
  components: {
    touches,
    sendMessage
  },
  data() {
    return {
      team: null,
      toItems: [],
      to: null,
      groups: [
        { key: 'herren', text: 'Herrenfussball' },
        { key: 'frauen', text: 'Frauenfussball' },
        { key: 'jugend_herren', text: 'Jugendfussball (männlich)' },
        { key: 'jugend_frauen', text: 'Jugendfussball (weiblich)' },
        { key: 'kinder', text: 'Kinderfussball' },
        { key: 'volleyball', text: 'Volleyball' }
      ]
    }
  },
  watch: {
    team(val) {
      const items = []
      if (val != null) {
        const team = this.findTeam(val)
        if (team != null) {
          if (team.coach && team.coach.email) {
            items.push({
              value: team.coach.email,
              text: this.fullyQualifiedCoachName(team.coach)
            })
          }
          if (team.contact && team.contact.email) {
            items.push({
              value: team.contact.email,
              text: team.contact.name
            })
          }
        }
      }
      this.toItems = items
      this.$nextTick(() => {
        this.to = items.length > 0 ? items[0].value : 'info@sv-eutingen.de'
      })
    }
  },
  mounted() {
    const selection = this.$route.query.team
    if (selection) {
      this.team = selection
    }
  },
  methods: {
    teams() {
      const teams = []
      for (const group of this.groups) {
        for (const item of this.$store.state.teams[group.key]) {
          teams.push({ value: item.key, text: group.text + ' - ' + item.team })
        }
      }
      return teams
    },
    coachName(key) {
      const team = this.findTeam(key)
      if (team != null && team.coach != null) {
        return this.fullyQualifiedCoachName(team.coach)
      }
      return null
    },
    coachTouches(key) {
      const team = this.findTeam(key)
      if (team != null && team.coach != null) {
        return this.resolveTouches(team.coach)
      }
      return []
    },
    contactName(key) {
      const team = this.findTeam(key)
      if (team != null && team.contact != null) {
        return team.contact.name
      }
      return null
    },
    contactTouches(key) {
      const team = this.findTeam(key)
      if (team != null && team.contact != null) {
        return this.resolveTouches(team.contact)
      }
      return []
    },
    resolveTouches(contact) {
      const touches = []
      if (contact.phone) {
        touches.push({
          icon: mdiPhone,
          text: contact.phone.formatted,
          href: 'tel:' + contact.phone.raw
        })
      }
      if (contact.mobile) {
        touches.push({
          icon: mdiPhone,
          text: contact.mobile.formatted,
          href: 'tel:' + contact.mobile.raw
        })
      }
      if (contact.email) {
        touches.push({
          icon: mdiEmail,
          text: contact.email,
          href: 'mailto:' + contact.email
        })
      }
      if (contact.mobile) {
        touches.push({
          icon: mdiWhatsapp,
          text: 'WhatsApp',
          href:
            'https://wa.me/' +
            contact.mobile.raw.substring(contact.mobile.raw.length - 1)
        })
      }
      return touches
    },
    findTeam(key) {
      for (const name in this.$store.state.teams) {
        for (const team of this.$store.state.teams[name]) {
          if (team.key === key) {
            return team
          }
        }
      }
      return null
    },
    fullyQualifiedCoachName(coach) {
      const prefix = coach.title ? coach.title : 'Trainer'
      return prefix + ' ' + coach.name
    }
  }
}
</script>

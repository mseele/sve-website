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
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At
      </p>
      <div v-if="contactName(team) != null" class="pt-4">
        <h4>{{ contactName(team) }}</h4>
        <touches :touches="contactTouches(team)"></touches>
      </div>
      <div v-if="coachName(team) != null" class="pt-4">
        <h4>{{ coachName(team) }}</h4>
        <touches :touches="coachTouches(team)"></touches>
      </div>
    </v-col>
    <v-col v-if="team != null" cols="12" lg="6">
      <h3>Nachricht senden</h3>
      <!-- todo: to need to be corrected -->
      <send-message class="pt-6"></send-message>
    </v-col>
  </v-row>
</template>

<script>
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
      groups: [
        { key: 'herren', text: 'Herrenfussball' },
        { key: 'damen', text: 'Damenfussball' },
        { key: 'jugend_herren', text: 'Jugendfussball (männlich)' },
        { key: 'jugend_damen', text: 'Jugendfussball (weiblich)' },
        { key: 'kinder', text: 'Kinderfussball' },
        { key: 'volleyball', text: 'Volleyball' }
      ]
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
        const prefix = team.coach.female ? 'Trainerin' : 'Trainer'
        return prefix + ' ' + team.coach.name
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
          icon: 'mdi-phone',
          text: contact.phone.formatted,
          href: 'tel:' + contact.phone.raw
        })
      }
      if (contact.mobile) {
        touches.push({
          icon: 'mdi-phone',
          text: contact.mobile.formatted,
          href: 'tel:' + contact.mobile.raw
        })
      }
      if (contact.email) {
        touches.push({
          icon: 'mdi-email',
          text: contact.email,
          href: 'mailto:' + contact.email
        })
      }
      if (contact.mobile) {
        touches.push({
          icon: 'mdi-whatsapp',
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
    }
  }
}
</script>

<template>
  <div v-if="isOpen" class="cookie">
    <v-alert class="cookie-alert" prominent type="info" color="primary">
      <v-row align="center">
        <v-col class="grow">
          <slot name="message">
            Wir verwenden Cookies, damit du diese Website optimal nutzen kannst.
            Nähere Informationen dazu findest du in unserer
            <nuxt-link class="cookie__link" to="/datenschutz"
              >Datenschutzerklärung</nuxt-link
            >. Stimme der Cookie-Nutzung zu um die beste Benutzererfahrung zu
            erhalten.
          </slot>
        </v-col>
        <v-col class="shrink d-flex justify-end" cols="12" md="3">
          <v-btn class="ma-2 grey darken-4" @click="accept">Akzeptieren</v-btn>
          <v-btn class="ma-2" text @click="deny">Ablehnen</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<style lang="sass" scoped>
.cookie
  z-index: 1
  position: fixed
  bottom: 0
  &__link
    color: #ffffff
    text-decoration: underline
    transition: all .25s
    &:hover
      text-decoration: none

.cookie-alert
  margin: 0px
  border-radius: 0px
</style>

<script>
export default {
  props: {
    storageName: {
      type: String,
      default: 'gdpr:accepted',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  created() {
    const gdpr = this.isVisited()
    if (!gdpr === true) {
      this.isOpen = true
      if (!process.env.BETA) {
        this.$ga.disable()
      }
    } else if (gdpr === 'true') {
      if (!process.env.BETA) {
        this.$ga.enable()
      }
    } else if (gdpr === 'false') {
      if (!process.env.BETA) {
        this.$ga.disable()
      }
    }
  },
  methods: {
    setVisited(value) {
      localStorage.setItem(this.storageName, value)
    },
    isVisited() {
      return localStorage.getItem(this.storageName)
    },
    accept() {
      this.setVisited(true)
      this.isOpen = false
      this.$emit('accept')
      if (!process.env.BETA) {
        this.$ga.enable()
      }
    },
    deny() {
      this.setVisited(false)
      this.isOpen = false
      this.$emit('deny')
      if (!process.env.BETA) {
        this.$ga.disable()
      }
    },
  },
}
</script>

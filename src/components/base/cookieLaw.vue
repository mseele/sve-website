<template>
  <div
    v-if="isOpen"
    class="fixed inset-x-0 bottom-0 z-20 px-4 py-3 text-gray-200 bg-red-800 shadow xl:px-8 xl:py-6"
    role="alert"
  >
    <div class="flex flex-col sm:flex-row xl:justify-between">
      <div class="flex items-center">
        <svg
          class="flex-none w-6 mr-4 text-red-100 fill-current md:w-8 xl:w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
        <div class="text-sm xl:text-lg">
          Wir verwenden Cookies, damit du diese Website optimal nutzen kannst.
          Nähere Informationen dazu findest du in unserer
          <g-link class="text-red-100 hover:text-red-200" to="/datenschutz/"
            >Datenschutzerklärung</g-link
          >. Stimme der Cookie-Nutzung zu um die beste Benutzererfahrung zu
          erhalten.
        </div>
      </div>
      <div class="flex items-center pt-3 space-x-2 sm:pt-0 sm:pl-3">
        <button
          class="flex-grow px-4 py-2 text-sm font-bold tracking-widest text-red-100 uppercase bg-gray-900 rounded-full shadow-sm hover:bg-black hover:text-gray-300 xl:text-base font focus-visible:outline-none focus-visible:ring"
          @click="accept"
        >
          Akzeptieren
        </button>
        <button
          class="flex-grow px-4 py-2 text-sm font-bold tracking-widest text-red-100 uppercase hover:text-red-200 xl:text-base focus-visible:outline-none focus-visible:ring"
          @click="deny"
        >
          Ablehnen
        </button>
      </div>
    </div>
  </div>
</template>

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

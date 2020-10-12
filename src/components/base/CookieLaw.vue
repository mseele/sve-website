<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-bottom-0 tw-inset-x-0 tw-z-10 tw-bg-red-100 tw-border-solid tw-border-0 tw-border-t-4 tw-border-red-800 tw-text-gray-800 tw-px-4 tw-py-3 xl:tw-px-8 xl:tw-py-6 tw-shadow"
    role="alert"
  >
    <div class="tw-flex tw-flex-col sm:tw-flex-row xl:tw-justify-between">
      <div class="tw-flex tw-items-center">
        <svg
          class="tw-fill-current tw-w-32 sm:tw-w-24 md:tw-w-20 lg:tw-w-14 xl:tw-w-10 tw-text-red-800 tw-mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
        <div class="tw-text-sm xl:tw-text-lg">
          Wir verwenden Cookies, damit du diese Website optimal nutzen kannst.
          Nähere Informationen dazu findest du in unserer
          <g-link class="tw-text-red-800" to="/datenschutz"
            >Datenschutzerklärung</g-link
          >. Stimme der Cookie-Nutzung zu um die beste Benutzererfahrung zu
          erhalten.
        </div>
      </div>
      <div
        class="tw-flex tw-items-center tw-pt-3 sm:tw-pt-0 sm:tw-pl-3 tw-space-x-2"
      >
        <button
          class="tw-flex-grow tw-bg-red-800 hover:tw-bg-red-900 tw-text-white tw-font-bold tw-text-sm xl:tw-text-base tw-uppercase tw-py-2 tw-px-4 tw-rounded focus:shadow-outline"
          @click="accept"
        >
          Akzeptieren
        </button>
        <button
          class="tw-flex-grow tw-text-gray-800 hover:tw-text-gray-900 tw-uppercase tw-font-bold tw-text-sm xl:tw-text-base tw-py-2 tw-px-4 focus:shadow-outline"
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

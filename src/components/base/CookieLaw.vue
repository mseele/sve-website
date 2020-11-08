<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-10 tw-px-4 tw-py-3 tw-text-gray-200 tw-bg-red-800 tw-shadow xl:tw-px-8 xl:tw-py-6"
    role="alert"
  >
    <div class="tw-flex tw-flex-col sm:tw-flex-row xl:tw-justify-between">
      <div class="tw-flex tw-items-center">
        <svg
          class="tw-flex-none tw-w-6 tw-mr-4 tw-text-red-100 tw-fill-current md:tw-w-8 xl:tw-w-10"
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
          <g-link
            class="tw-text-red-100 hover:tw-text-red-200"
            to="/datenschutz"
            >Datenschutzerklärung</g-link
          >. Stimme der Cookie-Nutzung zu um die beste Benutzererfahrung zu
          erhalten.
        </div>
      </div>
      <div
        class="tw-flex tw-items-center tw-pt-3 tw-space-x-2 sm:tw-pt-0 sm:tw-pl-3"
      >
        <button
          class="tw-flex-grow tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-tracking-widest tw-text-red-100 tw-uppercase tw-bg-gray-900 tw-rounded-full tw-shadow-sm hover:tw-bg-black hover:tw-text-gray-300 xl:tw-text-base tw-font focus:tw-outline-none focus:tw-shadow-outline"
          @click="accept"
        >
          Akzeptieren
        </button>
        <button
          class="tw-flex-grow tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-tracking-widest tw-text-red-100 tw-uppercase hover:tw-text-red-200 xl:tw-text-base focus:tw-outline-none"
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

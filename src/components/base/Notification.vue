<template>
  <transition
    enter-active-class="tw-transition tw-duration-300 tw-ease-in-out tw-transform"
    enter-class="tw-translate-y-full"
    enter-to-class="tw-translate-y-0"
    leave-active-class="tw-transition tw-duration-300 tw-ease-in-out tw-transform"
    leave-class="tw-translate-y-0"
    leave-to-class="tw-translate-y-full"
  >
    <div v-if="visible" class="tw-fixed tw-bottom-0 tw-z-10 tw-w-full">
      <div class="tw-p-2 tw-text-center lg:tw-p-4 md:tw-px-10">
        <div
          class="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-full tw-shadow lg:tw-max-w-3xl 2xl:tw-max-w-6xl"
          :class="{
            'tw-bg-blue-600 tw-text-blue-100': type == 'info',
            'tw-bg-red-600 tw-text-red-100': type == 'error',
          }"
          role="alert"
          @click="close()"
        >
          <svg
            class="tw-flex-none tw-w-5 tw-h-5 tw-opacity-50 tw-fill-current sm:tw-w-6 sm:tw-h-6 2xl:tw-w-10 2xl:tw-h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              v-if="type == 'info'"
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
            <path
              v-if="type == 'error'"
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            class="tw-flex-auto tw-mx-2 tw-text-sm tw-font-medium tw-text-left sm:tw-text-base 2xl:tw-text-2xl"
          >
            {{ message }}
          </span>
          <svg
            class="tw-flex-none tw-w-4 tw-h-4 tw-opacity-75 tw-cursor-pointer tw-fill-current hover:tw-opacity-50 sm:tw-h-5 sm:tw-w-5 2xl:tw-h-8 2xl:tw-w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      activeTimeout: -1,
    }
  },
  computed: {
    type() {
      return this.$store.state.notification_type
    },
    message() {
      return 'Das ist ein langer langer test' //this.$store.state.notification_message
    },
    visible: {
      get() {
        return true //this.$store.state.notification_visible
      },
      set(value) {
        this.$store.commit('notification_toggleVisibility', value)
      },
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.setTimeout()
      }
    },
  },
  methods: {
    setTimeout() {
      window.clearTimeout(this.activeTimeout)
      this.activeTimeout = window.setTimeout(() => {
        this.visible = false
      }, 5000)
    },
    close() {
      window.clearTimeout(this.activeTimeout)
      this.visible = false
    },
  },
}
</script>

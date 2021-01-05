<template>
  <transition
    enter-active-class="transition duration-300 ease-in-out transform"
    enter-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition duration-300 ease-in-out transform"
    leave-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div v-if="visible" class="fixed bottom-0 z-20 w-full">
      <div class="p-2 text-center lg:p-4 md:px-10">
        <div
          class="inline-flex items-center justify-center p-2 rounded-full shadow lg:max-w-3xl 2xl:max-w-6xl"
          :class="{
            'bg-blue-600 text-blue-100': type == 'info',
            'bg-red-600 text-red-100': type == 'error',
          }"
          role="alert"
          @click="close()"
        >
          <svg
            class="flex-none w-5 h-5 opacity-50 fill-current sm:w-6 sm:h-6 2xl:w-10 2xl:h-10"
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
            class="flex-auto mx-2 text-sm font-medium text-left sm:text-base 2xl:text-2xl"
          >
            {{ message }}
          </span>
          <svg
            class="flex-none w-4 h-4 opacity-75 cursor-pointer fill-current hover:opacity-50 sm:h-5 sm:w-5 2xl:h-8 2xl:w-8"
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
      return this.$store.state.notification_message
    },
    visible: {
      get() {
        return this.$store.state.notification_visible
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

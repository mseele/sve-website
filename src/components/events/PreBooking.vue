<template>
  <page-section :title="titlePrefix + ' Buchung'">
    <div class="flex items-center justify-center h-full">
      <div
        v-if="success == null && error == null"
        class="flex flex-col items-center my-10 2xl:my-20"
      >
        <svg
          class="self-center w-10 h-10 text-red-800 2xl:w-16 2xl:h-16 justify-self-center animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <div class="pt-4 text-gray-600 2xl:pt-8 2xl:text-2xl">
          Die Buchung wird durchgeführt, bitte warten.
        </div>
      </div>
      <div v-else class="flex flex-col items-center w-full">
        <svg
          v-if="success != null"
          class="w-36 h-36 2xl:w-48 2xl:h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 864 716.5"
        >
          <path
            fill="#991b1b"
            d="M807 396c-33 54-27 127-12 184 4 20 10 40 6 62-5 26-24 47-43 59-34 21-73 21-102-2-24-19-40-53-66-72-42-31-99-12-150 17-35 20-74 46-107 32-23-11-37-40-44-72-3-15-5-32-13-43-4-7-10-12-16-16-58-34-136-5-191-45-38-26-59-81-66-139-7-59-1-121 6-183 5-44 12-91 35-127 25-37 63-54 96-51 34 4 63 25 88 51 31 32 59 74 99 84 28 7 58-1 87-6 49-8 97-5 145-2 46 2 92 6 134 22 31 11 54 35 82 51 18 10 39 11 56 24 21 17 39 47 31 86-8 37-37 57-55 86z"
            opacity=".1"
          />
          <g transform="translate(1034 724) scale(1.5298)">
            <rect
              width="513.9"
              height="219.1"
              x="-650.6"
              y="-348.8"
              fill="#fff"
              rx="20"
              ry="19.7"
            />
            <circle
              cx="-546.8"
              cy="-240.8"
              r="57.4"
              fill="#16a34a"
              stroke="#3f3d56"
              stroke-width="2"
            />
            <path
              fill="#fff"
              d="M-554-213a7 7 0 01-4-2l-17-13a8 8 0 119-12l11 9 26-34a8 8 0 0110-2v1-1a8 8 0 012 11l-31 40a8 8 0 01-6 3z"
            />
          </g>
          <path
            fill="#3f3d56"
            d="M801 190H63a26 26 0 00-26 26v285a26 26 0 0026 26h738a26 26 0 0026-26V216a26 26 0 00-26-26zm23 311a23 23 0 01-23 23H63a23 23 0 01-23-23V216a23 23 0 0123-23h738a23 23 0 0123 23z"
          />
          <path
            fill="#ccc"
            d="M536 302H382a19 19 0 000 38h154a19 19 0 100-38zM735 377H382a19 19 0 00-20 18 6 6 0 000 1 19 19 0 0020 19h353a19 19 0 000-38z"
          />
        </svg>
        <svg
          v-if="error != null"
          class="w-36 h-36 2xl:w-48 2xl:h-48"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 864 716.6"
        >
          <path
            fill="#991b1b"
            d="M807 396c-33 54-27 127-12 184 4 20 10 40 6 62-5 26-24 47-43 59-34 21-73 21-102-2-24-19-40-53-66-72-42-31-99-12-150 17-35 20-74 46-107 32-23-11-37-40-44-72-3-15-5-32-13-43-4-7-10-12-16-16-58-34-136-5-191-45-38-26-59-81-66-139-7-59-1-121 6-183 5-44 12-91 35-127 25-37 63-54 96-51 34 4 63 25 88 51 31 32 59 74 99 84 28 7 58-1 87-6 49-8 97-5 145-2 46 2 92 6 134 22 31 11 54 35 82 51 18 10 39 11 56 24 21 17 39 47 31 86-8 37-37 57-55 86z"
            opacity=".1"
          />
          <g transform="matrix(1.531 0 0 1.531 613 1282)">
            <rect
              width="513.9"
              height="219.1"
              x="-375.5"
              y="-712.9"
              fill="#fff"
              rx="20"
              ry="19.7"
            />
            <circle
              cx="-271.7"
              cy="-604.9"
              r="57.4"
              fill="#dc2626"
              stroke="#3f3d56"
              stroke-width="2"
            />
            <path
              fill="#3f3d56"
              d="M123-713h-482a17 17 0 00-17 17v186a17 17 0 0017 17h482a17 17 0 0017-17v-186a17 17 0 00-17-17zm15 203a15 15 0 01-15 15h-482a15 15 0 01-15-15v-186a15 15 0 0115-15h482a15 15 0 0115 15z"
            />
            <path
              fill="#ccc"
              d="M-50-640h-101a12 12 0 000 25h101a12 12 0 100-25zM80-591h-231a12 12 0 00-13 12 13 13 0 0013 13H80a13 13 0 000-25z"
            />
            <path
              fill="#fff"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="18.1"
              d="M-290-587l18-18m0 0l18-18m-18 18l-18-18m18 18l18 18"
            />
          </g>
        </svg>
        <div
          class="pb-6 text-lg text-center text-gray-700 xl:text-xl xl:pb-8 2xl:pb-10 2xl:text-3xl"
        >
          {{ success != null ? success : error }}
        </div>
        <btn
          class="w-full sm:mx-auto sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"
          @click="goBack()"
        >
          Zurück
        </btn>
      </div>
    </div>
  </page-section>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import btn from '@/components/controls/PrimaryButton'
import axios from 'axios'

export default {
  components: { pageSection, btn },
  props: {
    titlePrefix: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      success: null,
      error: null,
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== null && newVal !== oldVal) {
        this.submit(newVal)
      }
    },
  },
  mounted() {
    if (this.value !== null) {
      this.submit(this.value)
    }
  },
  methods: {
    submit(data) {
      axios
        .post(this.$static.metadata.eventsAPI + '/prebooking', data, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.success = response.data.message
          } else {
            this.error = response.data.message
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.error =
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
        })
    },
    goBack() {
      this.$router.replace({ path: this.$router.currentRoute.path })
      this.$emit('input', null)
    },
  },
}
</script>

<static-query>
query {
  metadata {
    eventsAPI
  }
}
</static-query>

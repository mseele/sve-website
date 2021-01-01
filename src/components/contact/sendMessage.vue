<template>
  <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }" tag="div">
    <form class="tw-w-full" @submit.prevent="handleSubmit(submit)">
      <div v-if="toItems && toItems.length > 1" class="tw-w-full tw-pb-2">
        <input-label name="to">{{ toLabel }}</input-label>
        <select
          id="to"
          v-model="toSelection"
          class="tw-w-full tw-mb-4 tw-text-input"
        >
          <option
            v-for="(item, index) in toItems"
            :key="index"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
      <labeled-input
        v-model="name"
        class="tw-w-full tw-pb-2"
        label="Vor- und Nachname"
        rules="required"
        name="fname"
        autocomplete="given-name"
      />
      <labeled-input
        v-model="email"
        class="tw-w-full tw-pb-2"
        label="Email"
        rules="required|email"
        type="email"
        name="email"
        autocomplete="email"
      />
      <labeled-input
        v-model="phone"
        class="tw-w-full tw-pb-2"
        label="Telefon (optional)"
        name="phone"
        autocomplete="phone"
      />
      <labeled-input
        v-model="message"
        class="tw-w-full tw-pb-2"
        label="Nachricht"
        rules="required"
        type="textarea"
        name="message"
      />
      <privacy-checkbox v-model="privacy" class="tw-w-full tw-pb-2" />
      <btn
        class="tw-w-full"
        :disabled="invalid"
        :loading="submitLoading"
        type="submit"
      >
        Nachricht senden
      </btn>
    </form>
  </ValidationObserver>
</template>

<script>
import axios from 'axios'
import { ValidationObserver } from 'vee-validate'
import inputLabel from '@/components/controls/InputLabel'
import labeledInput from '@/components/controls/LabeledInput'
import privacyCheckbox from '@/components/controls/PrivacyCheckbox'
import btn from '@/components/controls/PrimaryButton'

export default {
  components: {
    ValidationObserver,
    inputLabel,
    labeledInput,
    privacyCheckbox,
    btn,
  },
  props: {
    type: {
      type: String,
      default: 'General',
    },
    to: {
      type: String,
      default: 'info@sv-eutingen.de',
    },
    toLabel: {
      type: String,
      default: '',
    },
    toItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      submitLoading: false,
      toSelection: null,
      name: '',
      email: '',
      phone: '',
      message: '',
      privacy: false,
    }
  },
  watch: {
    toItems(val) {
      this.updateToSelection()
    },
    to(val) {
      this.updateToSelection()
    },
  },
  mounted() {
    this.updateToSelection()
  },
  methods: {
    selectToItem(index) {
      this.toSelection = this.toItems[index].value
    },
    updateToSelection() {
      this.$nextTick(() => {
        this.toSelection =
          this.toItems && this.toItems.length > 0
            ? this.toItems[0].value
            : this.to
      })
    },
    submit() {
      this.submitLoading = true
      const data = {
        type: this.type,
        to: this.toSelection,
        name: this.name.trim(),
        email: this.email.trim(),
        phone: this.phone ? this.phone.trim() : '',
        message: this.message.trim(),
      }
      axios
        .post(this.$static.metadata.contactAPI + '/message', data)
        .then((response) => {
          this.submitLoading = false
          this.reset()
          this.$store.commit(
            'notification_showInfo',
            'Danke für deine Nachricht. Wir melden uns umgehend bei Dir.'
          )
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          this.submitLoading = false
          this.reset()
          this.$store.commit(
            'notification_showError',
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    },
    reset() {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.message = ''
      this.privacy = false
      this.$refs.form.reset()
    },
  },
}
</script>

<static-query>
query {
  metadata {
    contactAPI
  }
}
</static-query>

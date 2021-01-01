<template>
  <ValidationProvider v-slot="{ errors, validate }" rules="privacy" tag="div">
    <div class="tw-inline-flex">
      <input
        v-model="privacy"
        class="tw-mt-0/5 tw-checkbox-input"
        :class="{
          'tw-border-red-600 focus:tw-ring-red-600 focus:tw-ring-opacity-50':
            errors.length > 0,
        }"
        type="checkbox"
      />
      <div
        class="tw-pl-2 tw-text-sm tw-font-medium tw-cursor-pointer tw-select-none"
        @click="toggle(validate)"
      >
        <slot>
          Ich stimme der Verarbeitung meiner personenbezogenen Daten zu
        </slot>
      </div>
    </div>
    <div class="tw-text-xs tw-italic tw-text-red-600">
      {{ errors.length > 0 ? errors[0] : '&nbsp;' }}
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'

extend('privacy', (v) => !!v || 'Die Zustimmung wird benötigt')

export default {
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },

    buttonText: {
      type: String,
      default: undefined,
    },
    eventId: {
      type: String,
      default: undefined,
    },
    labelUpdates: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    privacy: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    toggle(validate) {
      this.privacy = !this.privacy
      this.$nextTick(() => validate())
    },
  },
}
</script>

<template>
  <ValidationProvider v-slot="{ errors, validate }" rules="privacy" tag="div">
    <div class="inline-flex">
      <input
        v-model="privacy"
        class="mt-0/5 checkbox-input"
        :class="{
          'border-red-600 focus:ring-red-600 focus:ring-opacity-50':
            errors.length > 0,
        }"
        type="checkbox"
      />
      <div
        class="pl-2 text-sm font-medium cursor-pointer select-none"
        @click="toggle(validate)"
      >
        <slot>
          Ich stimme der Verarbeitung meiner personenbezogenen Daten zu
        </slot>
      </div>
    </div>
    <div class="text-xs italic text-red-600">
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

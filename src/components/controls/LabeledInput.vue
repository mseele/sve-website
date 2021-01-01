<template>
  <ValidationProvider v-slot="{ errors }" :name="label" :rules="rules">
    <label
      class="tw-block tw-mb-2 tw-text-xs tw-font-semibold tw-tracking-wide tw-text-black tw-uppercase"
      :for="'form-' + name"
    >
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="'form-' + name"
      v-model="input"
      class="tw-text-input"
      :class="{
        'tw-border-red-600 focus:tw-ring-red-600 focus:tw-ring-opacity-50':
          errors.length > 0,
      }"
      type="text"
      :placeholder="label"
      :name="name"
      :autocomplete="autocomplete"
      rows="4"
    ></textarea>
    <input
      v-else
      :id="'form-' + name"
      v-model="input"
      class="tw-text-input"
      :class="{
        'tw-border-red-600 focus:tw-ring-red-600 focus:tw-ring-opacity-50':
          errors.length > 0,
      }"
      :type="type"
      :placeholder="label"
      :name="name"
      :autocomplete="autocomplete"
    />
    <div class="tw-mt-1 tw-text-xs tw-italic tw-text-red-600">
      {{ errors.length > 0 ? errors[0] : '&nbsp;' }}
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: 'Die E-Mail Adresse ist ungültig',
})

extend('required', {
  ...required,
  message: '{_field_} wird benötigt',
})

export default {
  components: {
    ValidationProvider,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

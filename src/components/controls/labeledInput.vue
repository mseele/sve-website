<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="label"
    :rules="rules"
    tag="div"
  >
    <input-label :name="'form-' + name">
      {{ label }}
    </input-label>
    <textarea
      v-if="type === 'textarea'"
      :id="'form-' + name"
      v-model="input"
      class="text-input"
      :class="{
        'border-red-600 focus:ring-red-600 focus:ring-opacity-50':
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
      class="text-input"
      :class="{
        'border-red-600 focus:ring-red-600 focus:ring-opacity-50':
          errors.length > 0,
      }"
      :type="type"
      :placeholder="label"
      :name="name"
      :autocomplete="autocomplete"
    />
    <div class="mt-1 text-xs italic text-red-600">
      {{ errors.length > 0 ? errors[0] : '&nbsp;' }}
    </div>
  </ValidationProvider>
</template>

<script>
import inputLabel from './inputLabel'
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
    inputLabel,
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

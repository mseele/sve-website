<template>
  <div>
    <InputLabel :name="'form-' + name">
      {{ label }}
    </InputLabel>
    <textarea
      v-if="textarea"
      :id="'form-' + name"
      v-model="input"
      class="text-input"
      :class="{
        'border-red-600 focus:ring-red-600 focus:ring-opacity-50': errorMessage,
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
        'border-red-600 focus:ring-red-600 focus:ring-opacity-50': errorMessage,
      }"
      :type="type"
      :placeholder="label"
      :name="name"
      :autocomplete="autocomplete"
    />
    <div class="mt-1 text-xs italic text-red-600">
      {{ errorMessage || '&nbsp;' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useField } from 'vee-validate'
import {
  required as requiredValidator,
  email as emailValidator,
} from '@vee-validate/rules'

const props = defineProps({
  field: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: '',
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  email: {
    type: Boolean,
    default: false,
  },
})

const type = props.email ? 'email' : 'text'

function validate(value: string): string | boolean {
  if (props.required && !requiredValidator(value)) {
    return props.label + ' wird benötigt'
  }
  if (props.email && !emailValidator(value)) {
    return 'Die E-Mail Adresse ist ungültig'
  }
  return true
}

const { value: input, errorMessage } = useField<string>(props.field, validate)
</script>

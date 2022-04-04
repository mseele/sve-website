<template>
  <div>
    <div class="inline-flex">
      <input
        :id="'form-' + name"
        :name="name"
        v-model="value"
        class="mt-0/5 checkbox-input"
        :class="{
          'border-red-600 focus:ring-red-600 focus:ring-opacity-50':
            errorMessage,
        }"
        type="checkbox"
      />
      <div
        class="cursor-pointer select-none pl-2 text-sm font-medium"
        @click="value = !value"
      >
        <slot>
          Ich stimme der Verarbeitung meiner personenbezogenen Daten zu
        </slot>
      </div>
    </div>
    <div v-if="required" class="text-xs italic text-red-600">
      {{ errorMessage || '&nbsp;' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: undefined,
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
  required: {
    type: Boolean,
    default: false,
  },
})

function validate(v: boolean): string | boolean {
  if (props.required) {
    return !!v || 'Die Zustimmung wird benötigt'
  }
  return true
}

const { value, errorMessage } = useField<boolean>(props.field, validate)
</script>

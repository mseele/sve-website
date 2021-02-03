<template>
  <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }" tag="div">
    <form class="w-full" @submit.prevent="handleSubmit(submit)">
      <div v-if="toItems && toItems.length > 1" class="w-full pb-2">
        <input-label name="to">{{ toLabel }}</input-label>
        <select id="to" v-model="toSelection" class="w-full mb-4 text-input">
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
        class="w-full pb-2"
        label="Vor- und Nachname"
        rules="required"
        name="fname"
        autocomplete="given-name"
      />
      <labeled-input
        v-model="email"
        class="w-full pb-2"
        label="Email"
        rules="required|email"
        type="email"
        name="email"
        autocomplete="email"
      />
      <labeled-input
        v-model="phone"
        class="w-full pb-2"
        label="Telefon (optional)"
        name="phone"
        autocomplete="phone"
      />
      <labeled-input
        v-model="message"
        class="w-full pb-2"
        label="Nachricht"
        rules="required"
        type="textarea"
        name="message"
      />
      <privacy-checkbox v-model="privacy" class="w-full pb-2" />
      <btn
        class="w-full"
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
import { ref, onMounted, watch, getCurrentInstance } from '@vue/composition-api'
import axios from 'axios'
import { ValidationObserver } from 'vee-validate'
import inputLabel from '@/components/controls/inputLabel'
import labeledInput from '@/components/controls/labeledInput'
import privacyCheckbox from '@/components/controls/privacyCheckbox'
import btn from '@/components/controls/primaryButton'
import { useStore } from '@/composables/store'

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
  setup(props, { root }) {
    const { showInfo, showError } = useStore()

    const form = ref()
    const submitLoading = ref(false)
    const toSelection = ref(null)
    const name = ref('')
    const email = ref('')
    const phone = ref('')
    const message = ref('')
    const privacy = ref(false)

    let $static
    onMounted(() => {
      $static = getCurrentInstance().proxy.$static
      updateToSelection()
    })

    watch(
      () => props.toItems,
      (val) => {
        updateToSelection()
      }
    )
    watch(
      () => props.to,
      (val) => {
        updateToSelection()
      }
    )

    function updateToSelection() {
      root.$nextTick(() => {
        toSelection.value =
          props.toItems && props.toItems.length > 0
            ? props.toItems[0].value
            : props.to
      })
    }

    function submit() {
      submitLoading.value = true
      const data = {
        type: props.type,
        to: toSelection.value,
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value ? phone.value.trim() : '',
        message: message.value.trim(),
      }
      axios
        .post($static.metadata.contactAPI + '/message', data)
        .then((response) => {
          submitLoading.value = false
          reset()
          showInfo(
            'Danke für deine Nachricht. Wir melden uns umgehend bei Dir.'
          )
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          submitLoading.value = false
          reset()
          showError(
            'Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal.'
          )
        })
    }

    function reset() {
      name.value = ''
      email.value = ''
      phone.value = ''
      message.value = ''
      privacy.value = false
      form.value.reset()
    }

    return {
      form,
      submitLoading,
      toSelection,
      name,
      email,
      phone,
      message,
      privacy,
      submit,
    }
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

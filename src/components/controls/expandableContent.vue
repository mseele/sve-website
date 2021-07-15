<template>
  <div class="relative">
    <!-- eslint-disable-next-line prettier/prettier | eslint-disable-next-line vue/no-v-html -->
    <div :class="['prose max-w-none text-gray-700', expandable ? 'max-h-72 sm:max-h-96 overflow-hidden' : '']" v-html="content"/>
    <template v-if="expandable">
      <div
        class="absolute bottom-0 inset-0 bg-gradient-to-t from-white to-transparent"
      />
      <div class="absolute bottom-0 inset-x-0 flex">
        <button
          class="default-link on-focus focus-visible:ring-offset-2 mx-auto"
          @click="expanded = true"
        >
          Weiterlesen...
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const expanded = ref(false)

    const expandable = computed(() => props.collapsed && !expanded.value)

    return { expanded, expandable }
  },
}
</script>

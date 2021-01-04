<template>
  <a
    class="inline-flex items-center px-5 py-3 text-black rounded-lg on-focus-dark"
    :class="[
      dark ? 'bg-white hover:bg-gray-100' : 'bg-white hover:bg-gray-200',
    ]"
    :href="href"
    :target="target"
    rel="noreferrer"
  >
    <slot :imageClass="'w-8 h-8'" />
    <span class="flex flex-col items-start ml-4 leading-none">
      <span class="mb-1 text-xs text-gray-600">{{ firstRow }}</span>
      <span class="font-medium title-font">{{ secondRow }}</span>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_blank',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    firstRow: {
      type: String,
      default: '',
    },
    secondRow: {
      type: String,
      default: '',
    },
  },
}
</script>

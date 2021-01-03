<template>
  <a
    class="tw-inline-flex tw-items-center tw-px-5 tw-py-3 tw-text-black tw-no-underline tw-bg-white tw-rounded-lg hover:tw-bg-gray-100 tw-on-focus-dark"
    :href="href"
    :target="target"
  >
    <slot :imageClass="'tw-w-8 tw-h-8'" />
    <span class="tw-flex tw-flex-col tw-items-start tw-ml-4 tw-leading-none">
      <span class="tw-mb-1 tw-text-xs tw-text-gray-600">{{ firstRow }}</span>
      <span class="tw-font-medium tw-title-font">{{ secondRow }}</span>
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

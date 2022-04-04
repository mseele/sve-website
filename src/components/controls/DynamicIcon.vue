<template>
  <component :is="currentIcon" />
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: true,
  },
})
const currentIcon = await import('../../assets/' + props.name + '.svg')
</script>

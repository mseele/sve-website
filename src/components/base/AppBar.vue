<template>
  <header
    class="fixed inset-x-0 z-20"
    :class="[
      !isTransparent ? 'bg-stone-900' : '',
      showElevation ? 'shadow-md' : '',
    ]"
  >
    <div class="mx-auto flex items-center justify-between p-3">
      <slot name="logo"></slot>
      <slot v-if="isTransparent" name="navTransparent"></slot>
      <slot v-else name="nav"></slot>
      <button
        aria-label="open menu"
        class="on-focus-dark h-6 w-6 rounded focus:outline-none"
        :class="[
          !isTransparent || light
            ? 'text-white hover:text-stone-300'
            : 'text-stone-900 hover:text-stone-600',
        ]"
        @click.stop="drawerClick()"
      >
        <svg
          class="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onUnmounted } from 'vue'
import { drawer } from '@/logic/navigation'

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
})

const currentScroll = ref(0)

const isTransparent = computed(() => {
  return props.transparent && currentScroll.value < 25
})

const showElevation = computed(() => {
  return !props.transparent || currentScroll.value > 1
})

function drawerClick() {
  drawer.value = true
}

onBeforeMount(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  currentScroll.value = window.pageYOffset
}
</script>

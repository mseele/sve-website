<template>
  <div>
    <transition
      enter-active-class="duration-500 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-500 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="drawer"
        class="fixed inset-0 z-30 overflow-hidden"
        @click="drawer = false"
      >
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="absolute inset-0 transition-opacity bg-stone-500 bg-opacity-50"
          ></div>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="transition duration-500 ease-in-out transform sm:duration-700"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-500 ease-in-out transform sm:duration-700"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="drawer"
        class="fixed inset-0 z-30 overflow-hidden"
        :class="{ 'ml-14': drawer }"
        @click="drawer = false"
      >
        <div class="absolute inset-0 overflow-hidden">
          <section
            class="absolute inset-y-0 right-0 flex max-w-full"
            @click.stop
          >
            <slot></slot>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { drawer } from '@/logic/navigation'
</script>

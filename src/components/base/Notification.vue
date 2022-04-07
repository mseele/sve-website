<template>
  <div>
    <transition
      enter-active-class="transition duration-300 ease-in-out transform"
      enter-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition duration-300 ease-in-out transform"
      leave-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div v-if="visible" class="fixed bottom-0 z-20 w-full">
        <div class="p-2 text-center md:px-10 lg:p-4">
          <div
            class="inline-flex items-center justify-center rounded-full p-2 shadow lg:max-w-3xl 2xl:max-w-6xl"
            :class="[
              isInfo ? 'bg-blue-600 text-blue-100' : 'bg-red-600 text-red-100',
            ]"
            role="alert"
            @click="close()"
          >
            <svg
              class="h-5 w-5 flex-none fill-current opacity-50 sm:h-6 sm:w-6 2xl:h-10 2xl:w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                v-if="isInfo"
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              class="mx-2 flex-auto text-left text-sm font-medium sm:text-base 2xl:text-2xl"
            >
              {{ notification?.message }}
            </span>
            <svg
              class="h-4 w-4 flex-none cursor-pointer fill-current opacity-75 hover:opacity-50 sm:h-5 sm:w-5 2xl:h-8 2xl:w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { notification, hideNotification } from '@/logic/notification'
import { NotificationType } from '@/models'

const activeTimeout = ref(-1)

const visible = computed(() => notification.value !== undefined)

const isInfo = computed(() => notification.value?.type === NotificationType.Info)

function setTimeout() {
  window.clearTimeout(activeTimeout.value)
  activeTimeout.value = window.setTimeout(() => {
    hideNotification()
  }, 5000)
}

function close() {
  window.clearTimeout(activeTimeout.value)
  hideNotification()
}

watch(visible, (newValue) => {
  if (newValue) {
    setTimeout()
  }
})
</script>

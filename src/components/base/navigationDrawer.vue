<template>
  <div>
    <transition
      enter-active-class="duration-500 ease-in-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-500 ease-in-out"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="drawer"
        class="fixed inset-0 z-30 overflow-hidden"
        @click="drawer = false"
      >
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-50"
          ></div>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="transition duration-500 ease-in-out transform sm:duration-700"
      enter-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-500 ease-in-out transform sm:duration-700"
      leave-class="translate-x-0"
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
            <div class="relative w-screen max-w-xs lg:max-w-sm xl:max-w-md">
              <div
                class="flex flex-col h-full p-2 space-y-2 overflow-y-scroll bg-white shadow-xl xl:space-y-4 xl:p-4"
              >
                <external-links class="px-4 mx-auto md:px-6" />
                <div class="border-0 border-t border-gray-300"></div>
                <div>
                  <g-link
                    v-for="(item, index) in items"
                    :key="'itm' + index"
                    :to="item.to"
                    class="block p-2 my-1 text-sm font-medium tracking-wide text-gray-800 rounded-md xl:p-3 hover:text-black xl:text-base focus:outline-none on-focus"
                    exact-active-class="text-black bg-gray-200"
                    >{{ item.title }}</g-link
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch, ref } from '@vue/composition-api'
import links from '@/data/links.json'
import externalLinks from '@/components/controls/externalLinks'

export default {
  components: { externalLinks },
  props: {
    value: {
      type: Boolean,
      deafult: false,
    },
  },
  setup(props, { emit }) {
    const drawer = ref(props.value)
    const items = links.mainItems.concat(links.items)

    watch(
      () => props.value,
      (newValue) => {
        drawer.value = newValue
      }
    )

    watch(drawer, (newValue) => {
      emit('input', newValue)
    })

    return { drawer, items }
  },
}
</script>

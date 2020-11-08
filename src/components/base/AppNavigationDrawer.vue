<template>
  <div>
    <transition
      enter-active-class="tw-duration-500 tw-ease-in-out"
      enter-class="tw-opacity-0"
      enter-to-class="tw-opacity-100"
      leave-active-class="tw-duration-500 tw-ease-in-out"
      leave-class="tw-opacity-100"
      leave-to-class="tw-opacity-0"
    >
      <div
        v-if="drawer"
        class="tw-fixed tw-inset-0 tw-z-20 tw-overflow-hidden"
        @click="drawer = false"
      >
        <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
          <div
            class="tw-absolute tw-inset-0 tw-transition-opacity tw-bg-gray-500 tw-bg-opacity-50"
          ></div>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="tw-transition tw-duration-500 tw-ease-in-out tw-transform sm:tw-duration-700"
      enter-class="tw-translate-x-full"
      enter-to-class="tw-translate-x-0"
      leave-active-class="tw-transition tw-duration-500 tw-ease-in-out tw-transform sm:tw-duration-700"
      leave-class="tw-translate-x-0"
      leave-to-class="tw-translate-x-full"
    >
      <div
        v-if="drawer"
        class="tw-fixed tw-inset-0 tw-z-20 tw-overflow-hidden"
        :class="{ 'tw-ml-14': drawer }"
        @click="drawer = false"
      >
        <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
          <section
            class="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full"
            @click.stop
          >
            <div
              class="tw-relative tw-w-screen tw-max-w-xs lg:tw-max-w-sm xl:tw-max-w-md"
            >
              <div
                class="tw-flex tw-flex-col tw-h-full tw-p-2 tw-space-y-2 tw-overflow-y-scroll tw-bg-white tw-shadow-xl xl:tw-space-y-4 xl:tw-p-4"
              >
                <external-links class="tw-px-4 tw-mx-auto md:tw-px-6" />
                <div
                  class="tw-border-0 tw-border-t tw-border-gray-300 tw-border-solid"
                ></div>
                <div>
                  <g-link
                    v-for="(item, index) in items"
                    :key="'itm' + index"
                    :to="$static.metadata.pathPrefix + item.to"
                    class="tw-block tw-p-2 tw-my-1 tw-text-sm tw-font-medium tw-text-gray-800 tw-no-underline tw-rounded-md xl:tw-p-3 hover:tw-text-black xl:tw-text-base"
                    exact-active-class="tw-text-black tw-bg-gray-300"
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
import links from '@/data/links.json'
import ExternalLinks from '@/components/controls/ExternalLinks'

export default {
  components: { ExternalLinks },
  props: {
    value: Boolean,
  },
  data() {
    return {
      drawer: this.value,
      links,
    }
  },
  computed: {
    items() {
      return this.links.mainItems.concat(this.links.items)
    },
  },
  watch: {
    value(val) {
      this.drawer = val
    },
    drawer(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<static-query>
query {
  metadata {
    pathPrefix
  }
}
</static-query>

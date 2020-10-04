<template>
  <div>
    <transition
      enter-active-class="tw-ease-in-out tw-duration-500"
      enter-class="tw-opacity-0"
      enter-to-class="tw-opacity-100"
      leave-active-class="tw-ease-in-out tw-duration-500"
      leave-class="tw-opacity-100"
      leave-to-class="tw-opacity-0"
    >
      <div
        v-if="drawer"
        class="tw-z-20 tw-fixed tw-inset-0 tw-overflow-hidden"
        @click="drawer = false"
      >
        <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
          <div
            class="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-50 tw-transition-opacity"
          ></div>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
      enter-class="tw-translate-x-full"
      enter-to-class="tw-translate-x-0"
      leave-active-class="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
      leave-class="tw-translate-x-0"
      leave-to-class="tw-translate-x-full"
    >
      <div
        v-if="drawer"
        class="tw-z-20 tw-fixed tw-inset-0 tw-overflow-hidden"
        :class="{ 'ml-10': drawer }"
        @click="drawer = false"
      >
        <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
          <section
            class="tw-absolute tw-inset-y-0 tw-right-0 tw-max-w-full tw-flex"
            @click.stop
          >
            <div class="tw-relative">
              <div
                class="tw-h-full tw-flex tw-flex-col tw-border-solid tw-border-0 tw-border-t-2 tw-border-red-800 tw-space-y-2 xl:tw-space-y-4 tw-px-2 xl:tw-px-4 tw-py-2 xl:tw-py-4 tw-bg-white tw-shadow-xl tw-overflow-y-scroll"
              >
                <external-links class="tw-px-4 md:tw-px-6 tw-mx-auto" />
                <div
                  class="tw-border-solid tw-border-0 tw-border-t tw-border-gray-300"
                ></div>
                <div>
                  <g-link
                    v-for="(item, index) in items"
                    :key="'itm' + index"
                    :to="$static.metadata.pathPrefix + item.to"
                    class="tw-block tw-my-1 tw-py-2 tw-pl-2 tw-pr-10 xl:tw-py-3 xl:tw-pl-3 xl:tw-pr-20 tw-rounded-md tw-text-gray-800 hover:tw-text-black tw-text-sm xl:tw-text-base tw-font-medium tw-no-underline"
                    exact-active-class="tw-bg-gray-300 tw-text-black"
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

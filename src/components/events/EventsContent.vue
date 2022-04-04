<template>
  <div>
    <PageSection :title="title">
      <slot name="header"></slot>
    </PageSection>
    <PageSection :title="eventTitle" dark>
      <div v-if="events.length > 0">
        <div class="-m-2 flex flex-wrap justify-center">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="w-full p-2 lg:w-1/2 2xl:w-1/3"
          >
            <router-link
              :to="toPrefix + '/' + event.id"
              class="group flex h-full flex-col overflow-hidden rounded border-2 border-stone-300 bg-white hover:shadow-sm focus:outline-none focus:ring-red-600 focus:ring-opacity-50 focus-visible:ring-2"
            >
              <div
                class="aspect-[5/3] overflow-hidden sm:aspect-[2/1] lg:aspect-[5/3]"
              >
                <DynamicPictureCard
                  :name="event.image"
                  :alt="event.name"
                  class="h-full w-full object-cover transition duration-500 ease-in-out group-hover:scale-110 group-hover:transform-gpu"
                />
              </div>
              <div class="flex flex-grow flex-col p-4">
                <div
                  class="text-lg font-medium text-stone-800 group-hover:text-black"
                >
                  {{ event.name }}
                </div>
                <EventsAvailability :id="event.id" client:load />
                <div
                  class="mt-3 flex-grow text-stone-700 group-hover:text-stone-900"
                >
                  {{ event.shortDescription }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="self-center text-xl font-medium">
        <slot name="infoEmpty"></slot>
      </div>
      <NewsSubscription
        :subscribe-success="subscribeSuccess"
        :news-type="newsType"
        class="pt-8"
      >
        <slot name="subscribeInfo"></slot>
      </NewsSubscription>
    </PageSection>
    <PageSection v-if="faqs.length > 0" id="faqs" title="Faqs">
      <faqs :faqs="faqs" />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Faq, Event } from '@/models'

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  eventTitle: {
    type: String,
    default: undefined,
  },
  events: {
    type: Array as PropType<Event[]>,
    default: () => [],
  },
  toPrefix: {
    type: String,
    default: undefined,
  },
  infoEmpty: {
    type: String,
    default: undefined,
  },
  subscribeSuccess: {
    type: String,
    required: true,
  },
  newsType: {
    type: String,
    required: true,
  },
  faqs: {
    type: Array as PropType<Faq[]>,
    default: () => [],
  },
})
</script>

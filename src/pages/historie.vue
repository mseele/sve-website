<page>
title: Historie
</page>

<template>
  <Layout>
    <PageSection title="Historie">
      <div class="pb-6">
        Dank der großartigen Recherchearbeiten unserer Dorfhistoriker Willi
        Schaupp, Peter Mücke und Rainer Sattler verfügen wir über eine
        detaillierte Auflistung der SVE-Historie. Für unseren Verein sind diese
        Informationen sehr wertvoll. Denn wer Zukunft gestalten will, muss seine
        Wurzeln kennen.
      </div>
      <div class="mx-auto h-full w-full">
        <div class="wrap relative h-full overflow-hidden">
          <div
            class="absolute left-3 h-full border border-stone-700 border-opacity-25 lg:left-1/2"
          />
          <div
            v-for="(moment, index) in history"
            :key="index"
            class="flex w-full items-center justify-between"
            :class="{
              'lg:flex-row-reverse': index % 2 != 0,
              'mt-8': index > 0,
            }"
          >
            <div class="order-1 hidden w-5/12 lg:block">
              <ImageViewer
                v-if="moment.images"
                height="300"
                :images="moment.images"
                client:idle
              />
            </div>
            <div
              class="border-3 z-10 order-1 flex h-6 w-6 flex-none items-center rounded-full border-white bg-red-800 shadow"
            >
              <div class="mx-auto text-lg font-semibold text-white"></div>
            </div>
            <div class="order-1 ml-6 w-full lg:m-0 lg:w-5/12">
              <div
                class="mb-3 flex items-center text-lg font-medium text-stone-800 md:text-xl"
              >
                <div>{{ moment.date }}</div>
                <HistoryImageButton
                  v-if="moment.images"
                  :images="moment.images"
                  client:idle
                />
              </div>
              <div
                class="text-sm leading-relaxed text-stone-800 md:text-base md:leading-normal"
                v-html="moment.text"
              />
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  </Layout>
</template>

<script setup lang="ts">
import history from '@/data/history'
</script>

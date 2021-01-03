<template>
  <Layout>
    <div class="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div class="tw-flex tw-flex-col tw-m-6 tw-text-center">
        <div class="tw-text-3xl tw-text-red-800 sm:tw-text-4xl 2l:tw-text-6xl">
          Ups, falsch abgebogen
        </div>
        <div
          class="tw-py-6 tw-text-lg lg:tw-text-xl 2xl:tw-py-12 2xl:tw-text-2xl"
        >
          Die gewünschte Seite wurde leider nicht gefunden.
        </div>
        <btn
          class="tw-w-full sm:tw-mx-auto sm:tw-w-1/2"
          @click="$router.push({ path: '/' })"
          >Zurück zur Startseite</btn
        >
      </div>
    </div>
  </Layout>
</template>

<script>
import btn from '@/components/controls/PrimaryButton'

export default {
  metaInfo: {
    title: 'Fehler',
  },
  components: { btn },
}
</script>

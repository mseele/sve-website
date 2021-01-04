<template>
  <Layout>
    <page-section title="404">
      <div
        class="flex flex-col items-center justify-center flex-grow m-6 text-center"
      >
        <div class="text-3xl text-red-800 sm:text-4xl 2l:text-6xl">
          Ups, falsch abgebogen
        </div>
        <svg
          class="w-36 h-36 2xl:w-48 2xl:h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 864 716.5"
        >
          <path
            fill="#991b1b"
            d="M807 396c-33 54-27 127-12 184 4 20 10 40 6 62-5 26-24 47-43 59-34 21-73 21-102-2-24-19-40-53-66-72-42-31-99-12-150 17-35 20-74 46-107 32-23-11-37-40-44-72-3-15-5-32-13-43-4-7-10-12-16-16-58-34-136-5-191-45-38-26-59-81-66-139-7-59-1-121 6-183 5-44 12-91 35-127 25-37 63-54 96-51 34 4 63 25 88 51 31 32 59 74 99 84 28 7 58-1 87-6 49-8 97-5 145-2 46 2 92 6 134 22 31 11 54 35 82 51 18 10 39 11 56 24 21 17 39 47 31 86-8 37-37 57-55 86z"
            opacity=".1"
          />
          <rect
            width="669"
            height="453.3"
            x="79.5"
            y="99.1"
            fill="#fff"
            stroke="#fff"
            rx="49.9"
            ry="49.8"
          />
          <path
            fill="#3f3d56"
            d="M751 512V140a43 43 0 00-43-43H122a43 43 0 00-43 43v372a43 43 0 0043 43h586a43 43 0 0043-43zm-629 38a38 38 0 01-38-38V140a38 38 0 0138-38h586a38 38 0 0138 38v372a38 38 0 01-38 38z"
          />
          <path fill="#3f3d56" d="M746 164H84a3 3 0 110-5h662a3 3 0 010 5z" />
          <g fill="#991b1b" transform="translate(1372 662) scale(1.706)">
            <circle cx="-729.9" cy="-310.7" r="7.4" />
            <circle cx="-704.7" cy="-310.7" r="7.4" />
            <circle cx="-679.4" cy="-310.7" r="7.4" />
          </g>
          <path
            d="M308 436a2 2 0 01-2-1c0-18-8-28-20-38a2 2 0 112-3c13 11 22 22 22 41a2 2 0 01-2 1zM162 436a2 2 0 01-2-1c0-19 8-30 22-41a2 2 0 112 3c-13 10-20 20-20 38a2 2 0 01-2 1zM293 320a2 2 0 01-1-3c13-11 14-26 14-43a2 2 0 014 0c0 18-1 34-16 45a2 2 0 01-1 1zM176 319a2 2 0 01-1-1c-14-11-15-27-15-44a2 2 0 014 0c0 17 1 31 14 42a2 2 0 01-2 3zM330 356h-37a2 2 0 010-3h37a2 2 0 110 3zM176 356h-36a2 2 0 010-3h36a2 2 0 010 3zM235 429a2 2 0 01-2-2V311a2 2 0 014 0v116a2 2 0 01-2 2z"
          />
          <path
            d="M235 429a60 60 0 01-60-60v-44c0-28 23-45 60-45 39 0 60 16 60 45v44a60 60 0 01-60 60zm0-146c-28 0-57 11-57 42v44a57 57 0 10114 0v-44c0-37-36-42-57-42z"
          />
          <path
            d="M200 290a2 2 0 01-2-1 24 24 0 01-1-8 38 38 0 0138-38 38 38 0 0138 38 21 21 0 01-1 7 2 2 0 01-4-1 17 17 0 002-6 35 35 0 00-35-35 35 35 0 00-35 35 21 21 0 002 7 2 2 0 01-2 2z"
          />
          <g fill="#ccc">
            <path
              d="M408 281h-20a12 12 0 010-24h20a12 12 0 010 24zM548 331h-20a12 12 0 010-24h20a12 12 0 010 24zM613 331h-21a12 12 0 010-24h21a12 12 0 010 24zM678 331h-21a12 12 0 010-24h21a12 12 0 010 24zM550 282h-96a12 12 0 010-24h96a12 12 0 010 24zM483 329h-95a12 12 0 010-23h95a12 12 0 010 23zM671 282h-73a12 12 0 010-24h73a12 12 0 010 24zM408 381h-20a12 12 0 010-23h20a12 12 0 010 23zM550 382h-96a12 12 0 010-24h96a12 12 0 010 24zM671 382h-73a12 12 0 010-24h73a12 12 0 010 24zM638 422a12 12 0 0112-12h21a12 12 0 010 24h-21a12 12 0 01-12-12zM497 423a12 12 0 0112-12h95a12 12 0 010 24h-95a12 12 0 01-12-12zM376 423a12 12 0 0112-12h73a12 12 0 010 24h-73a12 12 0 01-12-12z"
            />
          </g>
        </svg>
        <div
          class="pb-6 text-lg text-gray-500 lg:text-xl 2xl:pb-12 2xl:text-2xl"
        >
          Die gewünschte Seite wurde leider nicht gefunden.
        </div>
        <btn
          class="w-full sm:mx-auto sm:w-1/2"
          @click="$router.push({ path: '/' })"
          >Zurück zur Startseite</btn
        >
      </div>
    </page-section>
  </Layout>
</template>

<script>
import pageSection from '@/components/common/PageSection'
import btn from '@/components/controls/PrimaryButton'

export default {
  metaInfo: {
    title: 'Fehler',
  },
  components: { pageSection, btn },
}
</script>

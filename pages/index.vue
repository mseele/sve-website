<template>
  <section id="home" class="pa-0">
    <v-img :src="require('~/assets/home.jpg?original')" height="100vh">
      <v-container fill-height>
        <v-row align="center" class="pt-5 px-3">
          <v-sheet class="transparent white--text" max-width="500">
            <h1 class="display-2">{{ $t('title.default') }}</h1>
            <div class="headline py-4">{{ $t('title.slogan') }}</div>
            <v-row class="mx-0 mt-6">
              <v-btn
                v-scroll-to="{ el: '#aktuelles', offset: -64 }"
                rounded
                depressed
                outlined
                dark
                class="mr-2"
                >{{ $t('buttons.news') }}</v-btn
              >
              <v-btn
                v-scroll-to="{ el: '#mach-mit', offset: -64 }"
                rounded
                depressed
                >{{ $t('buttons.join') }}</v-btn
              >
            </v-row>
          </v-sheet>
        </v-row>
      </v-container>
    </v-img>
    <section id="aktuelles">
      <news></news>
    </section>
    <section id="mach-mit">
      <join></join>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'transparent',
  components: {
    news: () => import('~/components/sections/News'),
    join: () => import('~/components/sections/Join')
  }
}
</script>

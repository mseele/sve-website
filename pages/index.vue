<template>
  <section id="home" class="pa-0">
    <v-img :src="require('~/assets/home.jpg?original')" height="100vh">
      <v-container fill-height>
        <v-row align="center" class="pt-5 px-3">
          <v-sheet class="transparent white--text" max-width="500">
            <h1 class="display-2">SV Eutingen</h1>
            <div class="headline py-4">#mehralseinverein</div>
            <v-row class="mx-0 mt-6">
              <v-btn
                v-scroll-to="{ el: '#aktuelles', offset: -appbarOffset() }"
                rounded
                depressed
                outlined
                dark
                class="mr-2"
                >Aktuelles</v-btn
              >
              <v-btn
                v-scroll-to="{ el: '#mach-mit', offset: -appbarOffset() }"
                rounded
                depressed
                >Mach mit</v-btn
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
  },
  methods: {
    appbarOffset() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 56
      }
      return 64
    }
  },
  head() {
    return {
      titleTemplate: '%s'
    }
  }
}
</script>

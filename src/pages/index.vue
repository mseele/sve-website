<template>
  <Layout :transparent="true">
    <section id="home" class="pa-0">
      <v-img src="@/assets/home/main.jpg?vuetify-preload" height="100vh">
        <v-container fill-height>
          <v-row align="center" class="pt-5 px-3">
            <v-sheet class="transparent white--text" max-width="500">
              <h1 class="display-2">SV Eutingen</h1>
              <div class="headline py-4">#mehralseinverein</div>
              <v-row class="mx-0 mt-6">
                <v-btn
                  to="#aktuelles"
                  rounded
                  depressed
                  outlined
                  dark
                  class="mr-2"
                  >Aktuelles</v-btn
                >
                <v-btn to="#mach-mit" rounded depressed>Mach mit</v-btn>
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
  </Layout>
</template>

<script>
import news from '@/components/sections/News'
import join from '@/components/sections/Join'

export default {
  components: {
    news,
    join,
  },
}
</script>
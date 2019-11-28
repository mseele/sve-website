<template>
  <section id="home" class="pa-0">
    <v-img :src="require('~/assets/home.jpg')" height="100vh">
      <v-container fill-height>
        <v-row align="center" class="pt-5 px-3">
          <v-sheet class="transparent white--text" max-width="500">
            <div class="display-2">{{ $t('title.default') }}</div>
            <div class="headline py-4">{{ $t('title.slogan') }}</div>
            <v-row class="mx-0 mt-6">
              <v-btn rounded depressed outlined dark class="mr-2">{{
                $t('buttons.news')
              }}</v-btn>
              <v-btn rounded depressed>{{ $t('buttons.join') }}</v-btn>
            </v-row>
          </v-sheet>
        </v-row>
      </v-container>
    </v-img>
    <section id="welcome">
      <div style="height:500px"></div>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'transparent'
}
</script>

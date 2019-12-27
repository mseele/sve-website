<template>
  <div class="section_gray">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>MACH MIT</h2>
        </v-col>
        <v-col cols="12" class="subtitle-1 font-weight-bold pb-0">
          {{ $t('join.subtitle') }}
        </v-col>
        <v-col cols="12" class="subtitle-1 pt-0">{{ $t('join.intro') }}</v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          lg="4"
          xl="2"
        >
          <v-card outlined class="d-flex flex-column" height="100%">
            <v-card-title>
              {{ item.title }}
            </v-card-title>
            <v-card-text class="flex-grow-1">
              {{ item.text }}
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn rounded text color="primary">{{
                $t('buttons.more')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Lust auf Fussball?',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
          title: 'Tolles Hobby für Kinder',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
          title: 'Halte dich Fit',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
          title: 'Volleyball - genau dein Ding',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
          title: 'Sponsoring - Geben und Nehmen',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        },
        {
          title: 'Werde Mitglied',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,'
        }
      ]
    }
  }
}
</script>

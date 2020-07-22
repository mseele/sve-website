<template>
  <Layout>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>HISTORIE</h2>
          </v-col>
          <v-col cols="12">
            Dank der großartigen Recherchearbeiten unserer Dorfhistoriker Willi
            Schaupp, Peter Mücke und Rainer Sattler verfügen wir über eine
            detaillierte Auflistung der SVE-Historie. Für unseren Verein sind
            diese Informationen sehr wertvoll. Denn wer Zukunft gestalten will,
            muss seine Wurzeln kennen.
          </v-col>
          <v-col cols="12">
            <v-timeline>
              <v-timeline-item v-for="(item, i) in history" :key="i" small>
                <template v-if="item.images" v-slot:opposite>
                  <image-viewer
                    height="300"
                    :images="item.images"
                  ></image-viewer>
                </template>
                <template v-slot:default>
                  <v-container class="px-0">
                    <v-row
                      align="center"
                      no-gutters
                      :class="{ with_img: item.images }"
                    >
                      <v-row no-gutters>
                        <v-col cols="12" class="headline font-weight-bold pb-2">
                          {{ item.date }}
                        </v-col>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <v-col cols="12" v-html="item.text"></v-col>
                      </v-row>
                    </v-row>
                  </v-container>
                </template>
              </v-timeline-item> </v-timeline
          ></v-col>
        </v-row>
      </v-container>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
.with_img {
  min-height: 300px;
}
</style>

<script>
import imageViewer from '@/components/common/ImageViewer'
import history from '@/data/history.json'

export default {
  metaInfo: {
    title: 'Historie',
  },
  components: {
    imageViewer,
  },
  data() {
    return {
      history,
    }
  },
}
</script>

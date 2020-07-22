<template>
  <div>
    <v-img
      v-if="images.length == 1"
      :src="require('@/assets/' + images[0].src + '?vuetify-preload')"
      :height="height"
      @click="index = 0"
    ></v-img>
    <v-carousel
      v-else
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      :height="height"
    >
      <v-carousel-item
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        :src="require('@/assets/' + image.src + '?vuetify-preload')"
        @click="index = imageIndex"
      >
      </v-carousel-item>
    </v-carousel>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-sheet color="black">
        <v-img
          v-if="images.length == 1"
          :src="
            images[0].big
              ? require('@/assets/' + images[0].big + '?vuetify-preload')
              : require('@/assets/' + images[0].src + '?vuetify-preload')
          "
          height="100vh"
          contain
        ></v-img>
        <v-carousel
          v-else
          hide-delimiter-background
          show-arrows-on-hover
          height="100vh"
          :value="index"
        >
          <v-carousel-item
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
          >
            <v-img
              :src="
                image.big
                  ? require('@/assets/' + image.big + '?vuetify-preload')
                  : require('@/assets/' + image.src + '?vuetify-preload')
              "
              height="100vh"
              contain
            ></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-btn absolute top right icon dark @click="index = null">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  props: {
    height: {
      type: String,
      default: '400',
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: null,
      mdiClose,
    }
  },
  computed: {
    dialog: {
      get() {
        return this.index != null
      },
    },
  },
}
</script>

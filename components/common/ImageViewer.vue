<template>
  <div>
    <v-img
      v-if="images.length == 1"
      :lazy-src="images[0].lazy"
      :src="images[0].src"
      :height="height"
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
        :lazy-src="image.lazy"
        :src="image.src"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '400'
    },
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

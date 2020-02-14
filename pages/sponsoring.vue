<template>
  <div>
    <section class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>SPONSORING</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="section_alt">
      <v-container>
        <v-row
          v-for="(key, groupIndex) in Object.keys(sponsors)"
          :key="groupIndex"
          :class="{ 'pt-6': groupIndex > 0 }"
        >
          <v-col cols="12">
            <h3>{{ key }}</h3>
          </v-col>
          <v-col
            v-for="(item, index) of sponsors[key]"
            :key="index"
            class="py-0"
            cols="12"
            lg="6"
          >
            <ul>
              <li class="font-weight-medium">
                <a
                  v-if="item.url"
                  :href="item.url"
                  class="sponsor"
                  target="_blank"
                >
                  {{ item.name }}
                </a>
                <span v-else>{{ item.name }}</span>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<style lang="scss">
.sponsor {
  color: black !important;
  text-decoration-line: none !important;

  &:hover,
  &:focus {
    text-decoration: underline !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      sponsors: this.groupSponsors()
    }
  },
  methods: {
    groupSponsors() {
      return this.$store.state.sponsoring.sponsors
        .slice()
        .sort((a, b) => {
          const nameA = a.groupBy.toUpperCase()
          const nameB = b.groupBy.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        .reduce((acc, item) => {
          const key = item.groupBy.toUpperCase().charAt(0)
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {})
    }
  },
  head() {
    return {
      title: 'Sponsoring'
    }
  }
}
</script>

<template>
  <Picture :src="src" :alt="alt" :class="class" :style="style" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import home from '@/assets/home/main.jpg?preset=full'
import partnerschaft from '@/assets/partnerschaft/main.jpg?preset=full'
import gaststaette from '@/assets/gaststaette/main.jpg?preset=full'

import gaststaette_1 from '@/assets/gaststaette/1.jpg?preset=full'
import gaststaette_2 from '@/assets/gaststaette/2.jpg?preset=full'
import gaststaette_3 from '@/assets/gaststaette/3.jpg?preset=full'

import history_1958_1 from '@/assets/history/1958-1.jpg?preset=full'
import history_1958_2 from '@/assets/history/1958-2.jpg?preset=full'
import history_1958_3 from '@/assets/history/1958-3.jpg?preset=full'
import history_1958_4 from '@/assets/history/1958-4.jpg?preset=full'
import history_1958_5 from '@/assets/history/1958-5.jpg?preset=full'
import history_2009_1 from '@/assets/history/2009-1.jpg?preset=full'
import history_2009_2 from '@/assets/history/2009-2.jpg?preset=full'
import history_2011_1 from '@/assets/history/2011-1.jpg?preset=full'
import history_2011_2 from '@/assets/history/2011-2.jpg?preset=full'
import history_2011_3 from '@/assets/history/2011-3.jpg?preset=full'
import history_2016_1 from '@/assets/history/2016-1.jpg?preset=full'
import history_2018_09_1 from '@/assets/history/2018-09-1.jpg?preset=full'
import history_2018_09_2 from '@/assets/history/2018-09-2.jpg?preset=full'
import history_2018_10_1 from '@/assets/history/2018-10-1.jpg?preset=full'
import history_2018_10_2 from '@/assets/history/2018-10-2.jpg?preset=full'
import history_2018_12_1 from '@/assets/history/2018-12-1.jpg?preset=full'
import history_2019_04_1 from '@/assets/history/2019-04-1.jpg?preset=full'
import history_2019_08_1 from '@/assets/history/2019-08-1.jpg?preset=full'
import history_2019_09_1 from '@/assets/history/2019-09-1.jpg?preset=full'
import history_2020_03_1 from '@/assets/history/2020-03-1.jpg?preset=full'
import history_2020_05_1 from '@/assets/history/2020-05-1.jpg?preset=full'
import history_2020_08_1 from '@/assets/history/2020-08-1.jpg?preset=full'
import history_2020_09_1 from '@/assets/history/2020-09-1.jpg?preset=full'
import history_2020_12_1 from '@/assets/history/2020-12-1.jpg?preset=full'
import history_2020_12_2 from '@/assets/history/2020-12-2.jpg?preset=full'
import history_2021_01_1 from '@/assets/history/2021-01-1.jpg?preset=full'
import history_2022_07_1 from '@/assets/history/2022_07_1.jpg?preset=full'
import history_2022_07_2 from '@/assets/history/2022_07_2.jpg?preset=full'
import history_2023_06_1 from '@/assets/history/2023_06-1.jpg?preset=full'
import history_2023_06_2 from '@/assets/history/2023_06-2.jpg?preset=full'
import history_frauen_2016_1 from '@/assets/history/frauen-2016-1.jpg?preset=full'
import history_frauen_2016_2 from '@/assets/history/frauen-2016-2.jpg?preset=full'
import history_frauen_2016_3 from '@/assets/history/frauen-2016-3.jpg?preset=full'
import history_kunstrasen_2016_1 from '@/assets/history/kunstrasen-2016-1.jpg?preset=full'
import history_maenner_2016_1 from '@/assets/history/maenner-2016-1.jpg?preset=full'
import history_2023_11_1 from '@/assets/history/2023_11-1.jpg?preset=full'
import history_2024_03_1 from '@/assets/history/2024_03-1.jpg?preset=full'
import history_2024_05_1 from '@/assets/history/2024_05-1.jpg?preset=full'
import history_2024_05_2 from '@/assets/history/2024_05-2.jpg?preset=full'

import adventure from '@/assets/events/adventure.jpg?preset=full'
import after_work from '@/assets/events/after_work.jpg?preset=full'
import aqua_2 from '@/assets/events/aqua_2.jpg?preset=full'
import aqua_3 from '@/assets/events/aqua_3.jpg?preset=full'
import aqua from '@/assets/events/aqua.jpg?preset=full'
import baby from '@/assets/events/baby.jpg?preset=full'
import bretzel from '@/assets/events/bretzel.jpg?preset=full'
import brot from '@/assets/events/brot.jpg?preset=full'
import dance from '@/assets/events/dance.jpg?preset=full'
import deep from '@/assets/events/deep.jpg?preset=full'
import fit_gesund from '@/assets/events/fit_gesund.jpg?preset=full'
import fit from '@/assets/events/fit.jpg?preset=full'
import forest from '@/assets/events/forest.jpg?preset=full'
import fussballtor from '@/assets/events/fussballtor.jpg?preset=full'
import jugendturnier from '@/assets/events/jugendturnier.jpg?preset=full'
import kinderturnen from '@/assets/events/kinderturnen.jpg?preset=full'
import meerjungfrau from '@/assets/events/meerjungfrau.jpg?preset=full'
import pilates from '@/assets/events/pilates.jpg?preset=full'
import rf from '@/assets/events/rf.jpg?preset=full'
import ski from '@/assets/events/ski.jpg?preset=full'
import sommerferien from '@/assets/events/sommerferien.jpg?preset=full'
import spargel from '@/assets/events/spargel.jpg?preset=full'
import sv from '@/assets/events/sv.jpg?preset=full'
import sv_frauen from '@/assets/events/sv_frauen.jpg?preset=full'
import swabian from '@/assets/events/swabian.jpg?preset=full'
import thekla from '@/assets/events/thekla.jpg?preset=full'
import walking from '@/assets/events/walking.jpg?preset=full'
import weihnacht from '@/assets/events/weihnacht.jpg?preset=full'
import wein_2 from '@/assets/events/wein_2.jpg?preset=full'
import wein from '@/assets/events/wein.jpg?preset=full'
import yoga from '@/assets/events/yoga.jpg?preset=full'
import zumba from '@/assets/events/zumba.jpg?preset=full'

let assets = new Map<string, any>([
  ['home.jpg', home],
  ['partnerschaft.jpg', partnerschaft],
  ['gaststaette.jpg', gaststaette],

  ['gaststaette_1', gaststaette_1],
  ['gaststaette_2', gaststaette_2],
  ['gaststaette_3', gaststaette_3],

  ['history_1958_1', history_1958_1],
  ['history_1958_2', history_1958_2],
  ['history_1958_3', history_1958_3],
  ['history_1958_4', history_1958_4],
  ['history_1958_5', history_1958_5],
  ['history_2009_1', history_2009_1],
  ['history_2009_2', history_2009_2],
  ['history_2011_1', history_2011_1],
  ['history_2011_2', history_2011_2],
  ['history_2011_3', history_2011_3],
  ['history_2016_1', history_2016_1],
  ['history_2018_09_1', history_2018_09_1],
  ['history_2018_09_2', history_2018_09_2],
  ['history_2018_10_1', history_2018_10_1],
  ['history_2018_10_2', history_2018_10_2],
  ['history_2018_12_1', history_2018_12_1],
  ['history_2019_04_1', history_2019_04_1],
  ['history_2019_08_1', history_2019_08_1],
  ['history_2019_09_1', history_2019_09_1],
  ['history_2020_03_1', history_2020_03_1],
  ['history_2020_05_1', history_2020_05_1],
  ['history_2020_08_1', history_2020_08_1],
  ['history_2020_09_1', history_2020_09_1],
  ['history_2020_12_1', history_2020_12_1],
  ['history_2020_12_2', history_2020_12_2],
  ['history_2021_01_1', history_2021_01_1],
  ['history_2022_07_1', history_2022_07_1],
  ['history_2022_07_2', history_2022_07_2],
  ['history_2023_06_1', history_2023_06_1],
  ['history_2023_06_2', history_2023_06_2],
  ['history_frauen_2016_1', history_frauen_2016_1],
  ['history_frauen_2016_2', history_frauen_2016_2],
  ['history_frauen_2016_3', history_frauen_2016_3],
  ['history_kunstrasen_2016_1', history_kunstrasen_2016_1],
  ['history_maenner_2016_1', history_maenner_2016_1],
  ['history_2023_11_1', history_2023_11_1],
  ['history_2024_03_1', history_2024_03_1],
  ['history_2024_05_1', history_2024_05_1],
  ['history_2024_05_2', history_2024_05_2],

  ['adventure.jpg', adventure],
  ['after_work.jpg', after_work],
  ['aqua_2.jpg', aqua_2],
  ['aqua_3.jpg', aqua_3],
  ['aqua.jpg', aqua],
  ['baby.jpg', baby],
  ['bretzel.jpg', bretzel],
  ['brot.jpg', brot],
  ['dance.jpg', dance],
  ['deep.jpg', deep],
  ['fit_gesund.jpg', fit_gesund],
  ['fit.jpg', fit],
  ['forest.jpg', forest],
  ['fussballtor.jpg', fussballtor],
  ['jugendturnier.jpg', jugendturnier],
  ['kinderturnen.jpg', kinderturnen],
  ['meerjungfrau.jpg', meerjungfrau],
  ['pilates.jpg', pilates],
  ['rf.jpg', rf],
  ['ski.jpg', ski],
  ['sommerferien.jpg', sommerferien],
  ['spargel.jpg', spargel],
  ['sv.jpg', sv],
  ['sv_frauen.jpg', sv_frauen],
  ['swabian.jpg', swabian],
  ['thekla.jpg', thekla],
  ['walking.jpg', walking],
  ['weihnacht.jpg', weihnacht],
  ['wein_2.jpg', wein_2],
  ['wein.jpg', wein],
  ['yoga.jpg', yoga],
  ['zumba.jpg', zumba],
])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: undefined,
  },
  style: {
    type: String,
    default: undefined,
  },
  alt: {
    type: String,
    default: undefined,
  },
})

const src = computed(() => assets.get(props.name))
</script>

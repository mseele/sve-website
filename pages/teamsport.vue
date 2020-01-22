<template>
  <div>
    <section id="fussball" class="section">
      <v-container>
        Fußball ist der beliebteste Breitensport in Deutschland. Zu sehr
        günstigen Konditionen bieten wir in unseren verschiedenen Abteilungen
        für Kinder, Jugendliche, Frauen und Männer das passende Angebot rund um
        das beliebte Leder. Gleichzeitig ist Fußball unser Integrationsmotor
        Nummer eins.
      </v-container>
    </section>
    <section id="herren" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>HERRENFUSSBALL</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >In unserer Herrenfußballabteilung ermöglichen wir Teamsport auf
            verschiedenen Leistungsniveaus. Bei uns ist für jeden etwas dabei.
            Durch teambuildende Aktionen stärken wir Gemeinschaft und
            Wir-Gefühl.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.herren"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="damen" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>DAMENFUSSBALL</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >In unserer Damenfußballabteilung ermöglichen wir Teamsport auf
            verschiedenen Leistungsniveaus. Bei uns ist für jede Frau etwas
            dabei. Durch teambuildende Aktionen stärken wir Gemeinschaft und
            Wir-Gefühl.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.damen"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item" :male="false"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="jugend" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>JUGENDFUSSBALL (MÄNNLICH)</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Jugendliche sind unsere Zukunft. Mit unseren Trainern und Betreuern
            bieten wir ein schönes Sportangebot, bei dem neben dem sportlichen
            Ehrgeiz die Freude an der Gemeinschaft im Mittelpunkt steht. Viele
            Aktionen bereichern unsere Jugendabteilung und bieten
            Abwechslung.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.jugend_herren"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item" :male="false"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="jugend-weiblich" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>JUGENDFUSSBALL (WEIBLICH)</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Jugendliche sind unsere Zukunft. Mit unseren Trainern und Betreuern
            bieten wir ein schönes Sportangebot, bei dem neben dem sportlichen
            Ehrgeiz die Freude an der Gemeinschaft im Mittelpunkt steht. Viele
            Aktionen bereichern unsere Jugendabteilung und bieten
            Abwechslung.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.jugend_damen"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item" :male="false"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="kinder" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>KINDERFUSSBALL</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Kinder sind unsere Zukunft. Mit unseren Trainern und Betreuern
            bieten wir ein schönes Sportangebot, bei dem für die Kinder
            Bewegung, Sport und die Freude an der Gemeinschaft im Mittelpunkt
            stehen. Viele Aktionen bereichern unser Kinderangebot und bieten
            Abwechslung.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.kinder"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item" :male="false"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="volleyball" class="section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>VOLLEYBALL</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Unsere Volleyballgruppe nimmt zwar nicht am regulären Wettbewerb
            teil, aber erlebt tolle Stunden. Denn Volleybal macht in dieser
            Hobbygruppe richtig viel Spaß.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in teams.volleyball"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
            xl="2"
          >
            <teamInfo :value="item"></teamInfo>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    teamInfo: () => import('~/components/common/TeamInfo')
  },
  data() {
    return {
      sections: [
        { title: 'Herrenfussball', to: '#herren' },
        { title: 'Damenfussball', to: '#damen' },
        { title: 'Jugendfussball (männlich)', to: '#jugend-maennlich' },
        { title: 'Jugendfussball (weiblich)', to: '#jugend-weiblich' },
        { title: 'Kinderfussball', to: '#kinder' },
        { title: 'Volleyball', to: '#volleyball' }
      ]
    }
  },
  computed: {
    teams() {
      return this.$store.state.teams
    }
  },
  head() {
    return {
      title: 'Teamsport'
    }
  }
}
</script>

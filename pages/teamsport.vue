<template>
  <div>
    <section id="fussball" class="section">
      <v-container>
        test sebastian
      </v-container>
    </section>
    <section id="herren" class="section_alt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>HERRENFUSSBALL</h2>
          </v-col>
          <v-col cols="12" class="subtitle-1"
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in herren"
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
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in damen"
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
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in jugend_herren"
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
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in jugend_damen"
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
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in kinder"
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
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.</v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in volleyball"
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
      ],
      herren: [
        {
          team: '1. Mannschaft',
          league: 'Kreisliga A2',
          contact: 'Abteilungsleiter Raphael Sickler',
          contactLink: '/kontakt',
          teamID: '011MID6OM0000000VTVG0001VTR8C1K7'
        },
        {
          team: '2. Mannschaft',
          league: 'Kreisliga B1',
          contact: 'Abteilungsleiter Raphael Sickler',
          contactLink: '/kontakt',
          teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH'
        }
      ],
      damen: [
        {
          team: '1. Mannschaft',
          league: 'Verbandsliga',
          contact: 'Abteilungsleiterin Samantha Becker',
          contactLink: '/kontakt',
          teamID: '011MIBTDHG000000VTVG0001VTR8C1K7'
        },
        {
          team: '2. Mannschaft',
          league: 'Bezirksliga',
          contact: 'Abteilungsleiterin Christina Saile',
          contactLink: '/kontakt',
          teamID: '01H9SAS6NS000000VV0AG811VU6HO2AK'
        }
      ],
      jugend_herren: [
        {
          team: 'A-Junioren SGM SV Eutingen',
          league: 'Leistungsstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '012GED15C4000000VV0AG811VT1UN0HI'
        },
        {
          team: 'B-Junioren SGM SV Vollmaringen',
          league: 'Bezirksstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '01SM9K6ICS000000VS548985VU8O1RK1'
        },
        {
          team: 'C-Junioren 1 SGM VfL Hochdorf',
          league: 'Bezirksstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '01L6RV7RVO000000VV0AG811VS9BQ5HH'
        },
        {
          team: 'C-Junioren 2 SGM VfL Hochdorf',
          league: 'Bezirksstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '023UL6T654000000VS548985VVRPGK5E'
        },
        {
          team: 'D-Junioren 1 SGM SV Vollmaringen',
          league: 'Leistungsstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '027H96HED8000000VS5489B1VUA37ON8'
        },
        {
          team: 'D-Junioren 2 SGM SV Vollmaringen',
          league: '7er Kreisstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '027H9744D8000000VS5489B1VUA37ON8'
        }
      ],
      jugend_damen: [
        {
          team: 'B-Juniorinnen 1',
          league: 'EnBW-Oberliga',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '011MI98PJG000000VTVG0001VTR8C1K7'
        },
        {
          team: 'B-Juniorinnen 2',
          league: 'Bezirksstaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '011MIE4SVS000000VTVG0001VTR8C1K7'
        },
        {
          team: 'C-Juniorinnen',
          league: 'Qualistaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '027ISEG2HS000000VS5489B1VUA37ON8'
        },
        {
          team: 'D-Juniorinnen 1 SGM SV Eutingen',
          league: 'Qualistaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '0240ABCB3K000000VS548985VV3HBH6M'
        },
        {
          team: 'D-Juniorinnen 2 SGM SV Eutingen',
          league: 'Qualistaffel',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '0240ABO73G000000VS548985VV3HBH6M'
        }
      ],
      kinder: [
        {
          team: 'E-Junioren',
          league: 'Freundschaftsstaffel 2',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt',
          teamID: '011MICV3FO000000VTVG0001VTR8C1K7'
        },
        {
          team: 'F-Junioren',
          league: '-',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt'
        },
        {
          team: 'Bambini',
          league: '-',
          contact: 'Jugendleiterin Diana Akermann',
          contactLink: '/kontakt'
        }
      ],
      volleyball: [
        {
          team: 'Erwachsenen-Hobbygruppe',
          league: '-',
          contact: 'Rainer Busch',
          contactLink: '/kontakt'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Teamsport'
    }
  }
}
</script>

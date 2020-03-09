<template>
  <div class="section_alt">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>MACH MIT</h2>
        </v-col>
        <v-col cols="12" class="subtitle-1 font-weight-bold pb-0"
          >Du suchst Teamsport oder Fitness-Angebote? Du hast Lust auf Ehrenamt?
          Oder suchst eine starke Sponsoringpartnerschaft für Dein
          Unternehmen?</v-col
        >
        <v-col cols="12" class="subtitle-1 pt-0"
          >Bei uns bist Du richtig. Denn wir entfalten Talente, ermöglichen
          Mannschafts- und Gesundheitssport, stiften Gemeinschaft und leben
          Partnerschaften.</v-col
        >
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
              <v-btn rounded text color="primary" :to="item.link" nuxt
                >Mehr</v-btn
              >
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
          title: 'Fußball - unsere Leidenschaft',
          text:
            'Auf unserer tollen Sportanlage u.a. mit neuwertigen Kunstrasenplätzen bieten wir für Frauen und Männer ein breites Fußballangebot in verschiedenen Ligen.',
          link: '/teamsport#fussball'
        },
        {
          title: 'Teilhabe für Kinder und Jugendliche',
          text:
            'Eine sinnstiftende Freizeitbeschäftigung für Kinder und Jugendliche ist Schwerpunkt unserer Vereinsarbeit. Wir bieten für alle Altersklassen sowie Mädchen und Jungs die Möglichkeit, Fußball zu spielen. Ebenfalls im Programm haben wir regelmäßige Schwimmkurse für Kinder.',
          link: '/teamsport#jugend'
        },
        {
          title: "Fühl' Dich wohl durch Fitness",
          text:
            'Unser breites Fitnessangebot bietet für jedes Alter den perfekten Ausgleich zum Alltag und schafft spürbar mehr Lebensqualität. Rückenfit, Yoga, Pilates, Power Hour... - bei uns findest Du einen passenden Kurs.',
          link: '/fitness'
        },
        {
          title: 'Volleyball - genau Dein Ding',
          text:
            'Unsere Hobbygruppe heißt Dich als Anfänger, ehemaliger Profi oder Wiedereinsteiger des Volleyballsports herzlich willkommen. Immer freitags um 20 Uhr steht die Freude am Sport im Vordergrund.',
          link: '/teamsport#volleyball'
        },
        {
          title: 'Sponsoring - wir leben Partnerschaft',
          text:
            'Geben und Nehmen - so lautet unser Grundsatz für gelungene Partnerschaften. Wir bieten Werbemöglichkeiten, um auf unserer belebten Sportanlage auf Unternehmen und Dienstleistungen aufmerksam zu machen. Für unsere Partner stehen wir auch parat, wenn sie die Hilfe unserer tatkräftigen Mitglieder bspw. für ein Firmenjubiläum benötigen.',
          link: '/sponsoring'
        },
        {
          title: 'Mach mit und werde Mitglied',
          text:
            'Über 5,3 Millionen Menschen in Baden-Württemberg engagieren sich ehrenamtlich. Dafür bieten wir auch beim SVE viele Möglichkeiten. Ob Vereinsamt oder reine Mitgliedschaft - mit Deinem Einsatz unterstützt Du unsere Arbeit und stiftest gesellschaftlichen Nutzen.',
          link: '/kontakt#mitglied'
        }
      ]
    }
  }
}
</script>

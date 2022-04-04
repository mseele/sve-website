const site = {
  title: 'SV Eutingen 1947 e.V.',
  description:
    'Auf der offiziellen Website des SV Eutingen 1947 e.V. findest Du alle Informationen über die Teamsport-, Fitness- und Veranstaltungsangebote des Vereins im Herzen von Baden-Württemberg.',
  year: new Date().getFullYear(),
  tags: [
    'sv eutingen 1947 eV',
    'sv eutingen',
    'sve',
    'eutingen im gäu',
    'eutingen',
    'fussball',
    'frauen fussball',
    'enbw overliga',
    'fitness',
    'events',
  ],
  author: 'Michael Seele',

  nav: {
    mainItems: [
      {
        title: 'Teamsport',
        to: '/teamsport',
      },
      {
        title: 'Events',
        to: '/events',
      },
      {
        title: 'Fitness',
        to: '/fitness',
      },
    ],
    items: [
      {
        title: 'Historie',
        to: '/historie',
      },
      {
        title: 'Kunstrasen Vermietung',
        to: '/kunstrasen',
      },
      {
        title: 'Sponsoring',
        to: '/sponsoring',
      },
      {
        title: 'Vereinsportrait',
        to: '/vereinsportrait',
      },
      {
        title: 'Gaststätte Auszeit',
        to: '/gaststaette',
      },
      {
        title: 'Termine',
        to: '/termine',
      },
    ],
    footerItems: [
      {
        title: 'Impressum',
        to: '/impressum',
      },
      {
        title: 'Datenschutz',
        to: '/datenschutz',
      },
      {
        title: 'Mitglied werden',
        to: '/mitgliedschaft',
      },
      {
        title: 'Kontakt',
        to: '/kontakt',
      },
      {
        title: 'Newsletter',
        to: '/newsletter',
      },
    ],
    externalItems: [
      {
        img: 'facebook',
        to: 'https://www.facebook.com/sveutingen',
        alt: 'facebook',
      },
      {
        img: 'youtube',
        to: 'https://www.youtube.com/channel/UC6QXvcCp9CpHl4az3idhkYQ',
        alt: 'youtube',
      },
      {
        img: 'fussball_de',
        to: 'http://www.fussball.de/verein/sv-eutingen-wuerttemberg/-/id/00ES8GNAUG000068VV0AG08LVUPGND5I',
        alt: 'fussball.de',
      },
    ],
  },
}

export default site

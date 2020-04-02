export const state = () => ({
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
      img: require('~/assets/facebook.svg'),
      to: 'https://www.facebook.com/sveutingen',
    },
    {
      img: require('~/assets/fussball_de.svg'),
      to:
        'http://www.fussball.de/verein/sv-eutingen-wuerttemberg/-/id/00ES8GNAUG000068VV0AG08LVUPGND5I',
    },
  ],
})

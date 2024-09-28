import { type Contact, type Team } from '@/types'

const abteilungsleiterHerren: Contact = {
  title: 'Abteilungsleiter',
  name: 'Raphael Sickler',
  email: 'herrenabteilung@sv-eutingen.de',
  mobile: {
    formatted: '0176 32396224',
    raw: '+4917632396224'
  }
}

const jugendleiter: Contact = {
  title: 'Jugendleiterin',
  name: 'Diana Akermann',
  email: 'akermann.diana@gmail.com',
  mobile: {
    formatted: '0163 7938508',
    raw: '+491637938508'
  }
}

const teams: {
  herren: Team[]
  frauen: Team[]
  jugend_herren: Team[]
  jugend_frauen: Team[]
  kinder: Team[]
  volleyball: Team[]
} = {
  herren: [
    {
      key: 'herren-1',
      team: '1. Mannschaft',
      league: 'Bezirksliga',
      coach: {
        name: 'Alexander Esslinger'
      },
      contact: abteilungsleiterHerren,
      teamID: '011MID6OM0000000VTVG0001VTR8C1K7'
    },
    {
      key: 'herren-2',
      team: '2. Mannschaft',
      league: 'Kreisliga A3',
      coach: {
        name: 'Marcel Dettling',
        email: 'Marceldettling@gmx.de',
        mobile: {
          formatted: '0176 47864896',
          raw: '+4917647864896'
        }
      },
      contact: abteilungsleiterHerren,
      teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH'
    },
    {
      key: 'herren-3',
      team: '3. Mannschaft',
      league: 'Kreisliga B3',
      coach: {
        name: 'Raphael Teufel',
        email: 'teufelraphael.1@web.de',
        mobile: {
          formatted: '0151 44357549',
          raw: '+4915144357549'
        }
      },
      contact: abteilungsleiterHerren,
      teamID: '02LUSRQ9Q8000000VS5489B1VVVHS1D7'
    },
    {
      key: 'ah',
      team: 'AH',
      league: 'Hobby',
      contact: {
        title: 'Ansprechpartner',
        name: 'Dietmar Kurbjun',
        email: 'diddi.kurbjun@gmail.com',
        phone: {
          formatted: '0172 7490132',
          raw: '+491727490132'
        }
      }
    }
  ],
  frauen: [
    {
      key: 'frauen-1',
      team: '1. Mannschaft',
      league: 'Verbandsliga',
      coach: {
        name: 'Dominik Rakoczy',
        email: 'domraky@gmail.com',
        mobile: {
          formatted: '01511 8566050',
          raw: '+4915118566050'
        }
      },
      contact: {
        title: 'Abteilungsleiterin',
        name: 'Carolin Schimpf',
        email: 'caro1214@gmx.de',
        mobile: {
          formatted: '0176 81132107',
          raw: '+4917681132107'
        }
      },
      teamID: '011MIBTDHG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'frauen-2',
      team: '2. Mannschaft',
      league: 'Bezirksliga',
      coach: {
        title: 'Trainer',
        name: 'Robert Hank',
        mobile: {
          formatted: '0160 99666790',
          raw: '+4916099666790'
        }
      },
      contact: {
        title: 'Abteilungsleiterin',
        name: 'Christina Marquardt',
        email: 'Saile.christina@web.de',
        mobile: {
          formatted: '01578 8571421',
          raw: '+4915788571421'
        }
      },
      teamID: '01H9SAS6NS000000VV0AG811VU6HO2AK'
    }
  ],
  jugend_herren: [
    {
      key: 'b-junioren',
      team: 'B-Junioren SGM SV Vollmaringen',
      league: 'Quali Kreiasstaffel 1',
      coach: {
        name: 'Niklas Stephan',
        email: 'niklas.stephan02@googlemail.com',
        mobile: {
          formatted: '0157 39035505',
          raw: '+4915739035505'
        }
      },
      contact: jugendleiter,
      teamID: '02M7UGNE54000000VS5489B2VUHJA7LU'
    },
    {
      key: 'c-junioren',
      team: 'C-Junioren SGM VfL Hochdorf',
      league: 'Quali Staffel 4',
      coach: {
        name: 'Thorsten Weiss',
        email: 'thorsten.weiss@gmx.de',
        mobile: {
          formatted: '0172 7240436',
          raw: '+491727240436'
        }
      },
      contact: jugendleiter,
      teamID: '02PRQBJ68G000000VS5489B1VVQNIHJA'
    },
    {
      key: 'd-junioren-1',
      team: 'D-Junioren 1 SGM VfL Hochdorf',
      league: 'Quali Bezirksstaffel',
      coach: {
        name: 'Volker Löffler',
        email: 'volker.loeffler@t-online.de',
        mobile: {
          formatted: '0151 26412922',
          raw: '+4915126412922'
        }
      },
      contact: jugendleiter,
      teamID: '02M86HTPKO000000VS5489B2VUHJA7LU'
    },
    {
      key: 'd-junioren-2',
      team: 'D-Junioren 2 SGM VfL Hochdorf',
      league: 'Quali Staffel 2',
      coach: {
        name: 'Kai Weihing',
        email: 'maldini82@gmx.de',
        mobile: {
          formatted: '0173 7288791',
          raw: '+491737288791'
        }
      },
      contact: jugendleiter,
      teamID: '02M86IH7UO000000VS5489B2VUHJA7LU'
    }
  ],
  jugend_frauen: [
    {
      key: 'b-juniorinnen-1',
      team: 'B-Juniorinnen 1',
      league: 'EnBW-Oberliga BaWü',
      coach: {
        name: 'Manuel Strobel',
        email: 'manuelstrobel93@web.de',
        mobile: {
          formatted: '01515 6072107',
          raw: '+4915156072107'
        }
      },
      contact: {
        title: 'Teammanager',
        name: 'Rainer Kalbacher',
        email: 'rainer.kalbacher@t-online.de',
        mobile: {
          formatted: '01517 4117189',
          raw: '+4915174117189'
        }
      },
      teamID: '011MI98PJG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'b-juniorinnen-2',
      team: 'B-Juniorinnen 2 SGM SV Eutingen',
      league: 'Bezirksstaffel Flex',
      coach: {
        name: 'Alexandra Haizmann',
        email: 'Alex.haizmann@gmx.de',
        mobile: {
          formatted: '0173 5692040',
          raw: '+491735692040'
        }
      },
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7'
    },
    {
      key: 'c-juniorinnen',
      team: 'C-Juniorinnen SV Eutingen',
      league: 'Kreisstaffel',
      coach: {
        name: 'Daniel Stehle',
        email: 'danielstehle@gmx.net',
        mobile: {
          formatted: '0178 4153804',
          raw: '+491784153804'
        }
      },
      contact: jugendleiter,
      teamID: '027ISEG2HS000000VS5489B1VUA37ON8'
    }
  ],
  kinder: [
    {
      key: 'e-junioren-1',
      team: 'E-Junioren 1 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 5',
      coach: {
        name: 'Michael Köhn',
        email: 'michael_koehn@gmx.de',
        mobile: {
          formatted: '0172 5616742',
          raw: '+491725616742'
        }
      },
      contact: jugendleiter,
      teamID: '02PRCOH7OS000000VS5489B2VSE05932'
    },
    {
      key: 'e-junioren-2',
      team: 'E-Junioren 2 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 8',
      coach: {
        name: 'Boris Rakoczy',
        email: 'boraky@gmail.com',
        mobile: {
          formatted: '0173 3211358',
          raw: '+491733211358'
        }
      },
      contact: jugendleiter,
      teamID: '02PRCPPLQS000000VS5489B2VSE05932'
    },
    {
      key: 'e-junioren-3',
      team: 'E-Junioren 3 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 9',
      coach: {
        name: 'Raphael Braun',
        email: 'raphibraun@t-online.de',
        mobile: {
          formatted: '0157 33112704',
          raw: '+4915733112704'
        }
      },
      contact: jugendleiter,
      teamID: '02PRCQ3GV0000000VS5489B2VSE05932'
    },
    {
      key: 'f-junioren',
      team: 'F-Junioren',
      league: 'Spieltage',
      coach: {
        name: 'Michael Platz',
        email: 'mikeplatz_1991@web.de',
        mobile: {
          formatted: '0178 6048401',
          raw: '+491786048401'
        }
      },
      contact: jugendleiter
    },
    {
      key: 'g-junioren',
      team: 'G-Junioren (Bambini)',
      league: 'Spieltage',
      coach: {
        name: 'Thomas Kehm',
        email: 't.kehm@gmx.de',
        mobile: {
          formatted: '0173 6659554',
          raw: '+491736659554'
        }
      },
      contact: jugendleiter
    }
  ],
  volleyball: [
    {
      key: 'volleyball',
      team: 'Erwachsenen-Hobbygruppe',
      league: '-',
      contact: {
        title: 'Ansprechpartner',
        name: 'Rainer Busch',
        email: 'R-Busch@horb.de',
        phone: {
          formatted: '07451 8909',
          raw: '+4974518909'
        }
      }
    }
  ]
}

export default teams

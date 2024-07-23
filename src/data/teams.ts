import { Contact, Team } from '@/models'

const abteilungsleiterHerren: Contact = {
  title: 'Abteilungsleiter',
  name: 'Raphael Sickler',
  email: 'herrenabteilung@sv-eutingen.de',
  mobile: {
    formatted: '0176 32396224',
    raw: '+4917632396224',
  },
}

const jugendleiter: Contact = {
  title: 'Jugendleiterin',
  name: 'Diana Akermann',
  email: 'akermann.diana@gmail.com',
  mobile: {
    formatted: '0163 7938508',
    raw: '+491637938508',
  },
}

const teams: Record<string, Team[]> = {
  herren: [
    {
      key: 'herren-1',
      team: '1. Mannschaft',
      league: 'Bezirksliga',
      coach: {
        name: 'Alexander Esslinger',
      },
      contact: abteilungsleiterHerren,
      teamID: '011MID6OM0000000VTVG0001VTR8C1K7',
    },
    {
      key: 'herren-2',
      team: '2. Mannschaft',
      league: 'Kreisliga B2',
      coach: {
        name: 'Marcel Dettling',
        email: 'dettlingmarcel@web.de',
        mobile: {
          formatted: '0176 47864896',
          raw: '+4917647864896',
        },
      },
      contact: abteilungsleiterHerren,
      teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH',
    },
    {
      key: 'herren-3',
      team: '3. Mannschaft',
      league: 'Kreisliga B1',
      coach: {
        name: 'Raphael Teufel',
        email: 'teufelraphael.1@web.de',
        mobile: {
          formatted: '0151 44357549',
          raw: '+4915144357549',
        },
      },
      contact: abteilungsleiterHerren,
      teamID: '02IPFLU5SG000000VS5489B2VU3QR439',
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
          raw: '+491727490132',
        },
      },
    },
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
          raw: '+4915118566050',
        },
      },
      contact: {
        title: 'Abteilungsleiterin',
        name: 'Samantha Becker',
        email: 'Samantha.becker.sb@gmail.com',
        mobile: {
          formatted: '0172 1951443',
          raw: '+491721951443',
        },
      },
      teamID: '011MIBTDHG000000VTVG0001VTR8C1K7',
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
          raw: '+4916099666790',
        },
      },
      contact: {
        title: 'Abteilungsleiterin',
        name: 'Christina Marquardt',
        email: 'Saile.christina@web.de',
        mobile: {
          formatted: '01578 8571421',
          raw: '+4915788571421',
        },
      },
      teamID: '01H9SAS6NS000000VV0AG811VU6HO2AK',
    },
  ],
  jugend_herren: [
    {
      key: 'a-junioren-1',
      team: 'A-Junioren 1 SGM SV Eutingen',
      league: 'Regionenstaffel Mitte 1',
      coach: {
        name: 'Wolfgang Mey',
        email: 'w.mey@vodafone.de',
        mobile: {
          formatted: '0162 2063637',
          raw: '+491622063637',
        },
      },
      contact: jugendleiter,
      teamID: '012GED15C4000000VV0AG811VT1UN0HI',
    },
    {
      key: 'a-junioren-2',
      team: 'A-Junioren 2 SGM SV Eutingen',
      league: 'Quali-Staffel NSW',
      coach: {
        name: 'Claudius Stützel',
        email: 'claudius-stuetzel.bvb@web.de',
        mobile: {
          formatted: '01573 7031432',
          raw: '+4915737031432',
        },
      },
      contact: jugendleiter,
      teamID: '02B8KTGDLG000000VS5489B1VU7OHECJ',
    },
    {
      key: 'c-junioren',
      team: 'C-Junioren SGM VFL Hochdorf',
      league: 'Quali-Staffel NSW',
      coach: {
        name: 'Michael Eberhard',
        email: 'michaeleberhard@t-online.de',
        mobile: {
          formatted: '0171 3655494',
          raw: '+491713655494',
        },
      },
      contact: jugendleiter,
      teamID: '02EVQMB9VG000000VS5489B1VT1H0S9M',
    },
    {
      key: 'd-junioren',
      team: 'D-Junioren SGM SV Eutingen',
      league: '9er Bezirksstaffel',
      coach: {
        name: 'Thorsten Weiss',
        email: 'Thorsten.Weiss1@gmx.de',
        mobile: {
          formatted: '0172 7240436',
          raw: '+491727240436',
        },
      },
      contact: jugendleiter,
      teamID: '02B8KVQK4G000000VS5489B1VU7OHECJ',
    },
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
          raw: '+4915156072107',
        },
      },
      contact: {
        title: 'Teammanager',
        name: 'Rainer Kalbacher',
        email: 'rainer.kalbacher@t-online.de',
        mobile: {
          formatted: '01517 4117189',
          raw: '+4915174117189',
        }
      },
      teamID: '011MI98PJG000000VTVG0001VTR8C1K7',
    },
    {
      key: 'b-juniorinnen-2',
      team: 'B-Juniorinnen 2 SGM SV Eutingen',
      league: 'Bezirksstaffel Flex',
      coach: {
        name: 'Carsten Oswald',
        email: '01795450311@O2Online.de',
        mobile: {
          formatted: '0179 5450311',
          raw: '+491795450311',
        },
      },
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7',
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
          raw: '+491784153804',
        },
      },
      contact: jugendleiter,
      teamID: '027ISEG2HS000000VS5489B1VUA37ON8',
    },
  ],
  kinder: [
    {
      key: 'e-junioren-1',
      team: 'E-Junioren 1 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 2',
      coach: {
        name: 'Kai Weihing',
        email: 'annaweihing@gmx.de',
        mobile: {
          formatted: '0173 7288791',
          raw: '+491737288791',
        },
      },
      contact: jugendleiter,
      teamID: '027H92NVVC000000VS5489B1VUA37ON8',
    },
    {
      key: 'e-junioren-2',
      team: 'E-Junioren 2 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 2',
      coach: {
        name: 'Volker Löffler',
        email: 'volker.loeffler@t-online.de',
        mobile: {
          formatted: '01512 6412922',
          raw: '+4915126412922',
        },
      },
      contact: jugendleiter,
      teamID: '027H92V6UO000000VS5489B1VUA37ON8',
    },
    {
      key: 'f-junioren',
      team: 'F-Junioren',
      league: 'Spieltage',
      coach: {
        name: 'Michael Köhn',
        email: 'michael_koehn@gmx.de',
        mobile: {
          formatted: '0172 5616742',
          raw: '+491725616742',
        },
      },
      contact: jugendleiter,
    },
    {
      key: 'bambini',
      team: 'Bambini',
      league: 'Spieltage',
      coach: {
        name: 'Thomas Kehm',
        email: 't.kehm@gmx.de',
        mobile: {
          formatted: '0173 6659554',
          raw: '+491736659554',
        },
      },
      contact: jugendleiter,
    },
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
          raw: '+4974518909',
        },
      },
    },
  ],
}

export default teams

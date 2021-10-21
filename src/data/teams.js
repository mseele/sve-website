const abteilungsleiterHerren = {
  title: 'Abteilungsleiter',
  name: 'Daniel Neuss',
  email: 'herrenabteilung@sv-eutingen.de',
  mobile: {
    formatted: '0172 7770447',
    raw: '+491727770447',
  },
}

const jugendleiter = {
  title: 'Jugendleiterin',
  name: 'Diana Akermann',
  email: 'akermann.diana@gmail.com',
  mobile: {
    formatted: '0163 7938508',
    raw: '+491637938508',
  },
}

export default {
  herren: [
    {
      key: 'herren-1',
      team: '1. Mannschaft',
      league: 'Kreisliga A2',
      coach: {
        name: 'Sergej Golubkow',
      },
      contact: abteilungsleiterHerren,
      teamID: '011MID6OM0000000VTVG0001VTR8C1K7',
    },
    {
      key: 'herren-2',
      team: '2. Mannschaft',
      league: 'Kreisliga B1',
      coach: {
        name: 'Philipp Dettling',
        mobile: {
          formatted: '01512 1930003',
          raw: '+4915121930003',
        },
      },
      contact: abteilungsleiterHerren,
      teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH',
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
        name: 'Peter Steeb',
        mobile: {
          formatted: '0176 23748586',
          raw: '+4917623748586',
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
        title: 'Trainerin',
        name: 'Chrissi Gaiser',
        email: 'chrissi.heitmann@gmail.com',
        mobile: {
          formatted: '0157 51505470',
          raw: '+4915751505470',
        },
      },
      contact: {
        title: 'Abteilungsleiterin',
        name: 'Christina Saile',
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
      league: 'Bezirksstaffel',
      coach: {
        name: 'Mario Pargolo',
        email: 'mario.pargolo@arag-partner.de',
        mobile: {
          formatted: '0172 2303172',
          raw: '+491722303172',
        },
      },
      contact: jugendleiter,
      teamID: '012GED15C4000000VV0AG811VT1UN0HI',
    },
    {
      key: 'a-junioren-2',
      team: 'A-Junioren 2 SGM SV Eutingen',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Gerald Öhrlich',
        email: 'g_h_oehrlich@msn.com',
        mobile: {
          formatted: '01577 0319784',
          raw: '+4915770319784',
        },
      },
      contact: jugendleiter,
      teamID: '02B8KTGDLG000000VS5489B1VU7OHECJ',
    },
    {
      key: 'b-junioren-1',
      team: 'B-Junioren 1 SGM SV Vollmaringen',
      league: 'Bezirksstaffel',
      coach: {
        name: 'Frank Weindel',
        email: 'forstbetrieb-baum-faellt@t-online.de',
        mobile: {
          formatted: '0179 5385998',
          raw: '+491795385998',
        },
      },
      contact: jugendleiter,
      teamID: '01SM9K6ICS000000VS548985VU8O1RK1',
    },
    {
      key: 'b-junioren-2',
      team: 'B-Junioren 2 SGM SV Vollmaringen',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Volker Löffler',
        email: 'volker.loeffler@t-online.de',
        mobile: {
          formatted: '01512 6412922',
          raw: '+4915126412922',
        },
      },
      contact: jugendleiter,
      teamID: '02B8ESCO64000000VS5489B2VSCHU9TQ',
    },
    {
      key: 'c-junioren',
      team: 'C-Junioren SGM VFL Hochdorf',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Josip Mrsic',
        email: 'jmrv79@outlook.de',
        mobile: {
          formatted: '0176 62073007',
          raw: '+4917662073007',
        },
      },
      contact: jugendleiter,
      teamID: '02EVQMB9VG000000VS5489B1VT1H0S9M',
    },
    {
      key: 'd-junioren-1',
      team: 'D-Junioren 1 SGM SV Eutingen',
      league: '9er Bezirksstaffel',
      coach: {
        name: 'Heiko Bube',
        email: 'heiko.bube@gmail.com',
        mobile: {
          formatted: '0176 40741543',
          raw: '+4917640741543',
        },
      },
      contact: jugendleiter,
      teamID: '02B8KVQK4G000000VS5489B1VU7OHECJ',
    },
    {
      key: 'd-junioren-2',
      team: 'D-Junioren 2 SGM SV Eutingen',
      league: '9er Kreisstaffel',
      coach: {
        name: 'Nika Ziebart',
        email: 'nikolausziebart321@gmail.com',
        mobile: {
          formatted: '0176 60174003',
          raw: '+4917660174003',
        },
      },
      contact: jugendleiter,
      teamID: '02B8L0D5R0000000VS5489B1VU7OHECJ',
    },
  ],
  jugend_frauen: [
    {
      key: 'b-juniorinnen-1',
      team: 'B-Juniorinnen 1',
      league: 'EnBW-Oberliga BaWü',
      coach: {
        name: 'Rainer Kalbacher',
      },
      contact: jugendleiter,
      teamID: '011MI98PJG000000VTVG0001VTR8C1K7',
    },
    {
      key: 'b-juniorinnen-2',
      team: 'B-Juniorinnen 2 SGM SV Eutingen',
      league: 'Bezirksstaffel',
      coach: {
        name: 'Francesco Caboli',
        email: 'Franco030878@gmail.com',
        mobile: {
          formatted: '0162 5869821',
          raw: '+491625869821',
        },
      },
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7',
    },
    {
      key: 'c-juniorinnen-1',
      team: 'C-Juniorinnen 1 SGM SV Eutingen',
      league: 'Kreisstaffel',
      coach: {
        name: 'Carsten Oswald',
        email: '01795450311@O2Online.de',
        mobile: {
          formatted: '0179 5450311',
          raw: '+491795450311',
        },
      },
      contact: jugendleiter,
      teamID: '027ISEG2HS000000VS5489B1VUA37ON8',
    },
    {
      key: 'c-juniorinnen-2',
      team: 'C-Juniorinnen 2 SGM SV Eutingen',
      league: 'Kreisstaffel',
      coach: {
        name: 'Carsten Oswald',
        email: '01795450311@O2Online.de',
        mobile: {
          formatted: '0179 5450311',
          raw: '+491795450311',
        },
      },
      contact: jugendleiter,
      teamID: '02ESSVG5SC000000VS5489B1VT0RKM5V',
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
        name: 'Pascal Akermann',
        email: 'pascal.akermann@web.de',
        mobile: {
          formatted: '0176 92412152',
          raw: '+4917692412152',
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

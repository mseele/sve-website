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
  email: 'akermann.diana@googlemail.com',
  mobile: {
    formatted: '0163 7938508',
    raw: '+491637938508',
  },
}

const coachEJunioren = {
  name: 'Heiko Bube',
  email: 'heiko.bube@gmail.com',
  mobile: {
    formatted: '0176 40741543',
    raw: '+4917640741543',
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
        name: 'Yannik Janzen',
        email: 'yjanzen98@gmail.com',
        mobile: {
          formatted: '0163 7296476',
          raw: '+491637296476',
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
        name: 'Dirk Vialkowitsch',
        email: 'dirk.vialkowitsch@vacos.de',
        mobile: {
          formatted: '0172 7750843',
          raw: '+491727750843',
        },
      },
      contact: jugendleiter,
      teamID: '02B8ESCO64000000VS5489B2VSCHU9TQ',
    },
    {
      key: 'c-junioren-1',
      team: 'C-Junioren 1 SGM FC Göttelfingen',
      league: 'Bezirksstaffel',
      coach: {
        name: 'Volker Löffler',
        email: 'volker.loeffler@t-online.de',
        mobile: {
          formatted: '0151 26412922',
          raw: '+4915126412922',
        },
      },
      contact: jugendleiter,
      teamID: '02B9VNNOVK000000VS5489B1VU20GQ5T',
    },
    {
      key: 'c-junioren-2',
      team: 'C-Junioren 2 SGM FC Göttelfingen',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Bünyamin Kalali',
        mobile: {
          formatted: '0174 7508050',
          raw: '+491747508050',
        },
      },
      contact: jugendleiter,
      teamID: '02B9VNVD7S000000VS5489B1VU20GQ5T',
    },
    {
      key: 'd-junioren-1',
      team: 'D-Junioren 1 SGM SV Eutingen',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Nika Ziebart',
        email: 'nikolausziebart321@gmail.com',
        mobile: {
          formatted: '0176 60174003',
          raw: '+4917660174003',
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
        name: 'Heinfried Weiss',
        email: 'heinfried.weiss@gmx.net',
        mobile: {
          formatted: '0172 7522880',
          raw: '+491727522880',
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
        email: 'Rainer.kalbacher@t-online.de',
        mobile: {
          formatted: '0151 74117189',
          raw: '+4915174117189',
        },
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
        email: 'Franco030878@googlemail.com',
        mobile: {
          formatted: '0162 5869821',
          raw: '+491625869821',
        },
      },
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7',
    },
    {
      key: 'c-juniorinnen',
      team: 'C-Juniorinnen 1 SGM SV Eutingen',
      league: 'Qualistaffel',
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
      key: 'd-juniorinnen',
      team: 'D-Juniorinnen SGM SV Eutingen',
      league: 'Qualistaffel',
      coach: {
        title: 'Trainerin',
        name: 'Jenny Nesch',
        email: 'jennypauline.nesch@gmail.com',
        mobile: {
          formatted: '0157 89606128',
          raw: '+4915789606128',
        },
      },
      contact: jugendleiter,
      teamID: '0240ABCB3K000000VS548985VV3HBH6M',
    },
  ],
  kinder: [
    {
      key: 'e-junioren-1',
      team: 'E-Junioren 1 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 1',
      coach: coachEJunioren,
      contact: jugendleiter,
      teamID: '027H92NVVC000000VS5489B1VUA37ON8',
    },
    {
      key: 'e-junioren-2',
      team: 'E-Junioren 2 SGM VfL Hochdorf',
      league: 'Freundschaftsstaffel 2',
      coach: coachEJunioren,
      contact: jugendleiter,
      teamID: '027H92V6UO000000VS5489B1VUA37ON8',
    },
    {
      key: 'f-junioren',
      team: 'F-Junioren',
      league: 'Spieltage',
      coach: {
        name: 'Kai Weihing',
        email: 'Maldini82@gmx.de',
        mobile: {
          formatted: '0173 7288791',
          raw: '+491737288791',
        },
      },
      contact: jugendleiter,
    },
    {
      key: 'bambini',
      team: 'Bambini',
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
  ],
  volleyball: [
    {
      key: 'volleyball',
      team: 'Erwachsenen-Hobbygruppe',
      league: '-',
      contact: {
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

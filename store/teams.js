const abteilungsleiterHerren = {
  name: 'Abteilungsleiter Daniel Neuss',
  email: 'abteilungsleiter@sv-eutingen.de',
  mobile: {
    formatted: '0172 7770447',
    raw: '+491727770447'
  }
}

const jugendleiter = {
  name: 'Jugendleiterin Diana Akermann',
  female: true,
  email: 'akermann.diana@googlemail.com',
  mobile: {
    formatted: '0163 7938508',
    raw: '+491637938508'
  }
}

const coachCJunioren = {
  name: 'Frank Weindel',
  email: 'forstbetrieb-baum-faellt@t-online.de',
  mobile: {
    formatted: '0179 5385998',
    raw: '+491795385998'
  }
}

const coachDJunioren = {
  name: 'Thorsten Weiss',
  email: 'Thorsten.Weiss1@gmx.de',
  mobile: {
    formatted: '0172 7240436',
    raw: '+491727240436'
  }
}

const coachBCJuniorinnen = {
  name: 'Francesco Caboli',
  email: 'Franco030878@googlemail.com',
  mobile: {
    formatted: '0162 5869821',
    raw: '+491625869821'
  }
}

const coachDJuniorinnen = {
  name: 'Carsten Oswald',
  email: '01795450311@O2Online.de',
  mobile: {
    formatted: '0179 5450311',
    raw: '+491795450311'
  }
}

export const state = () => ({
  herren: [
    {
      key: 'herren-1',
      team: '1. Mannschaft',
      league: 'Kreisliga A2',
      coach: {
        name: 'Erdal Kabakci',
        email: 'ErdalKabakci.62@web.de',
        mobile: {
          formatted: '0178 5195578',
          raw: '+491785195578'
        }
      },
      contact: abteilungsleiterHerren,
      teamID: '011MID6OM0000000VTVG0001VTR8C1K7'
    },
    {
      key: 'herren-2',
      team: '2. Mannschaft',
      league: 'Kreisliga B1',
      coach: {
        name: 'Sven Beu',
        email: 'sven.beu@gmail.com',
        mobile: {
          formatted: '01575 2658870',
          raw: '+4915752658870'
        }
      },
      contact: abteilungsleiterHerren,
      teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH'
    }
  ],
  damen: [
    {
      key: 'damen-1',
      team: '1. Mannschaft',
      league: 'Verbandsliga',
      coach: {
        name: 'Peter Steeb',
        mobile: {
          formatted: '0176 23748586',
          raw: '+4917623748586'
        }
      },
      contact: {
        name: 'Abteilungsleiterin Samantha Becker',
        female: true,
        email: 'Samantha.becker.sb@gmail.com',
        mobile: {
          formatted: '0172 1951443',
          raw: '+491721951443'
        }
      },
      teamID: '011MIBTDHG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'damen-2',
      team: '2. Mannschaft',
      league: 'Bezirksliga',
      coach: {
        name: 'Ivica Braun Butrovic',
        mobile: {
          formatted: '01520 1626427',
          raw: '+4915201626427'
        }
      },
      contact: {
        name: 'Abteilungsleiterin Christina Saile',
        female: true,
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
      key: 'a-junioren',
      team: 'A-Junioren SGM SV Eutingen',
      league: 'Leistungsstaffel',
      coach: {
        name: 'Gerd Liegl',
        email: 'gerd.liegl@t-online.de',
        mobile: {
          formatted: '01520 8697125',
          raw: '+4915208697125'
        }
      },
      contact: jugendleiter,
      teamID: '012GED15C4000000VV0AG811VT1UN0HI'
    },
    {
      key: 'b-junioren',
      team: 'B-Junioren SGM SV Vollmaringen',
      league: 'Bezirksstaffel',
      coach: {
        name: 'Johannes Teufel',
        email: 'Johannes-te@web.de',
        mobile: {
          formatted: '0157 88105808',
          raw: '+4915788105808'
        }
      },
      contact: jugendleiter,
      teamID: '01SM9K6ICS000000VS548985VU8O1RK1'
    },
    {
      key: 'c-junioren-1',
      team: 'C-Junioren 1 SGM VfL Hochdorf',
      league: 'Bezirksstaffel',
      coach: coachCJunioren,
      contact: jugendleiter,
      teamID: '01L6RV7RVO000000VV0AG811VS9BQ5HH'
    },
    {
      key: 'c-junioren-2',
      team: 'C-Junioren 2 SGM VfL Hochdorf',
      league: 'Bezirksstaffel',
      coach: coachCJunioren,
      contact: jugendleiter,
      teamID: '023UL6T654000000VS548985VVRPGK5E'
    },
    {
      key: 'd-junioren-1',
      team: 'D-Junioren 1 SGM SV Vollmaringen',
      league: 'Leistungsstaffel',
      coach: coachDJunioren,
      contact: jugendleiter,
      teamID: '027H96HED8000000VS5489B1VUA37ON8'
    },
    {
      key: 'd-junioren-2',
      team: 'D-Junioren 2 SGM SV Vollmaringen',
      league: '7er Kreisstaffel',
      coach: coachDJunioren,
      contact: jugendleiter,
      teamID: '027H9744D8000000VS5489B1VUA37ON8'
    }
  ],
  jugend_damen: [
    {
      key: 'b-juniorinnen-1',
      team: 'B-Juniorinnen 1',
      league: 'EnBW-Oberliga',
      coach: {
        name: 'Rainer Kalbacher',
        email: 'Rainer.kalbacher@t-online.de',
        mobile: {
          formatted: '0172 7397083',
          raw: '+491727397083'
        }
      },
      contact: jugendleiter,
      teamID: '011MI98PJG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'b-juniorinnen-2',
      team: 'B-Juniorinnen 2',
      league: 'Bezirksstaffel',
      coach: coachBCJuniorinnen,
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7'
    },
    {
      key: 'c-juniorinnen',
      team: 'C-Juniorinnen',
      league: 'Qualistaffel',
      coach: coachBCJuniorinnen,
      contact: jugendleiter,
      teamID: '027ISEG2HS000000VS5489B1VUA37ON8'
    },
    {
      key: 'd-juniorinnen-1',
      team: 'D-Juniorinnen 1 SGM SV Eutingen',
      league: 'Qualistaffel',
      coach: coachDJuniorinnen,
      contact: jugendleiter,
      teamID: '0240ABCB3K000000VS548985VV3HBH6M'
    },
    {
      key: 'd-juniorinnen-2',
      team: 'D-Juniorinnen 2 SGM SV Eutingen',
      league: 'Qualistaffel',
      coach: coachDJuniorinnen,
      contact: jugendleiter,
      teamID: '0240ABO73G000000VS548985VV3HBH6M'
    }
  ],
  kinder: [
    {
      key: 'e-junioren',
      team: 'E-Junioren',
      league: 'Freundschaftsstaffel 2',
      coach: {
        name: 'Nika Ziebart',
        email: 'nikolausziebart321@gmail.com',
        mobile: {
          formatted: '0176 60174003',
          raw: '+4917660174003'
        }
      },
      contact: jugendleiter,
      teamID: '011MICV3FO000000VTVG0001VTR8C1K7'
    },
    {
      key: 'f-junioren',
      team: 'F-Junioren',
      league: '-',
      coach: {
        name: 'Kai Weihing',
        email: 'Maldini82@gmx.de',
        mobile: {
          formatted: '0173 7288791',
          raw: '+491737288791'
        }
      },
      contact: jugendleiter
    },
    {
      key: 'bambini',
      team: 'Bambini',
      league: '-',
      coach: {
        name: 'Michael Köhn',
        email: 'michael_koehn@gmx.de',
        mobile: {
          formatted: '0172 5616742',
          raw: '+491725616742'
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
        name: 'Rainer Busch',
        email: 'R-Busch@horb.de',
        phone: {
          formatted: '07451 8909',
          raw: '+4974518909'
        }
      }
    }
  ]
})

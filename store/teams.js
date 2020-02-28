const abteilungsleiterHerren = {
  name: 'Abteilungsleiter Daniel Neuss',
  email: 'abteilungsleiter@sv-eutingen.de',
  mobile: {
    formatted: '0177 77777777',
    raw: '+4917777777777'
  }
}

const jugendleiter = {
  name: 'Jugendleiterin Diana Akermann',
  female: true,
  email: 'djakermann@web.de'
}

export const state = () => ({
  herren: [
    {
      key: 'herren-1',
      team: '1. Mannschaft',
      league: 'Kreisliga A2',
      contact: abteilungsleiterHerren,
      teamID: '011MID6OM0000000VTVG0001VTR8C1K7'
    },
    {
      key: 'herren-2',
      team: '2. Mannschaft',
      league: 'Kreisliga B1',
      contact: abteilungsleiterHerren,
      teamID: '01A1LJM17C000000VV0AG80NVSEJ47CH'
    }
  ],
  damen: [
    {
      key: 'damen-1',
      team: '1. Mannschaft',
      league: 'Verbandsliga',
      contact: {
        name: 'Abteilungsleiterin Samantha Becker',
        female: true,
        email: 'abteilungsleiter@sv-eutingen.de'
      },
      teamID: '011MIBTDHG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'damen-2',
      team: '2. Mannschaft',
      league: 'Bezirksliga',
      contact: {
        name: 'Abteilungsleiterin Christina Saile',
        female: true,
        email: 'abteilungsleiter@sv-eutingen.de'
      },
      teamID: '01H9SAS6NS000000VV0AG811VU6HO2AK'
    }
  ],
  jugend_herren: [
    {
      key: 'a-junioren',
      team: 'A-Junioren SGM SV Eutingen',
      league: 'Leistungsstaffel',
      contact: jugendleiter,
      teamID: '012GED15C4000000VV0AG811VT1UN0HI'
    },
    {
      key: 'b-junioren',
      team: 'B-Junioren SGM SV Vollmaringen',
      league: 'Bezirksstaffel',
      contact: jugendleiter,
      teamID: '01SM9K6ICS000000VS548985VU8O1RK1'
    },
    {
      key: 'c-junioren-1',
      team: 'C-Junioren 1 SGM VfL Hochdorf',
      league: 'Bezirksstaffel',
      contact: jugendleiter,
      teamID: '01L6RV7RVO000000VV0AG811VS9BQ5HH'
    },
    {
      key: 'c-junioren-2',
      team: 'C-Junioren 2 SGM VfL Hochdorf',
      league: 'Bezirksstaffel',
      contact: jugendleiter,
      teamID: '023UL6T654000000VS548985VVRPGK5E'
    },
    {
      key: 'd-junioren-1',
      team: 'D-Junioren 1 SGM SV Vollmaringen',
      league: 'Leistungsstaffel',
      contact: jugendleiter,
      teamID: '027H96HED8000000VS5489B1VUA37ON8'
    },
    {
      key: 'd-junioren-2',
      team: 'D-Junioren 2 SGM SV Vollmaringen',
      league: '7er Kreisstaffel',
      contact: jugendleiter,
      teamID: '027H9744D8000000VS5489B1VUA37ON8'
    }
  ],
  jugend_damen: [
    {
      key: 'b-juniorinnen-1',
      team: 'B-Juniorinnen 1',
      league: 'EnBW-Oberliga',
      contact: jugendleiter,
      teamID: '011MI98PJG000000VTVG0001VTR8C1K7'
    },
    {
      key: 'b-juniorinnen-2',
      team: 'B-Juniorinnen 2',
      league: 'Bezirksstaffel',
      contact: jugendleiter,
      teamID: '011MIE4SVS000000VTVG0001VTR8C1K7'
    },
    {
      key: 'c-juniorinnen',
      team: 'C-Juniorinnen',
      league: 'Qualistaffel',
      contact: jugendleiter,
      teamID: '027ISEG2HS000000VS5489B1VUA37ON8'
    },
    {
      key: 'd-juniorinnen-1',
      team: 'D-Juniorinnen 1 SGM SV Eutingen',
      league: 'Qualistaffel',
      contact: jugendleiter,
      teamID: '0240ABCB3K000000VS548985VV3HBH6M'
    },
    {
      key: 'd-juniorinnen-2',
      team: 'D-Juniorinnen 2 SGM SV Eutingen',
      league: 'Qualistaffel',
      contact: jugendleiter,
      teamID: '0240ABO73G000000VS548985VV3HBH6M'
    }
  ],
  kinder: [
    {
      key: 'e-junioren',
      team: 'E-Junioren',
      league: 'Freundschaftsstaffel 2',
      contact: jugendleiter,
      teamID: '011MICV3FO000000VTVG0001VTR8C1K7'
    },
    {
      key: 'f-junioren',
      team: 'F-Junioren',
      league: '-',
      contact: jugendleiter
    },
    {
      key: 'bambini',
      team: 'Bambini',
      league: '-',
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
        email: 'abteilungsleiter@sv-eutingen.de'
      }
    }
  ]
})

export const CONFIG = {
  station: 'Balgrist',
  stationboardLimit: 15,
  apiBase: 'https://transport.opendata.ch/v1',

  stationboardRefresh: 30_000,
  connectionsRefresh: 180_000,
  clockRefresh: 1_000,
  weatherRefresh: 10 * 60_000,
  pageReload: 6 * 60 * 60_000,

  destinations: [
    { name: 'ETH Zentrum', query: 'Zürich, ETH/Universitätsspital' },
    { name: 'ETH Hönggerberg', query: 'Zürich, ETH Hönggerberg' },
    { name: 'UZH Zentrum', query: 'Zürich, ETH/Universitätsspital' },
    { name: 'UZH Irchel', query: 'Zürich, Universität Irchel' },
    { name: 'HB Zürich', query: 'Zürich HB' },
    { name: 'Brugg/Windisch', query: 'Brugg AG' },
    { name: 'Limmatplatz', query: 'Zürich, Limmatplatz' },
    { name: 'Meilen', query: 'Meilen' },
  ],
  connectionsPerDestination: 3,

  walkingTime: 4, // minutes to walk to Balgrist stop

  categoryClasses: {
    T: 'line-badge--tram',
    B: 'line-badge--bus',
    S: 'line-badge--sbahn',
    IR: 'line-badge--ir',
    IC: 'line-badge--ir',
    RE: 'line-badge--ir',
  },

  categoryIcons: {
    T: 'ph-tram',
    B: 'ph-bus',
    S: 'ph-train-simple',
    IR: 'ph-train',
    IC: 'ph-train',
    RE: 'ph-train',
  },

  // ZVV per-line colors (override category default)
  lineColors: {
    T2: '#DC143C',
    T3: '#009B3A',
    T4: '#21468B',
    T5: '#6C4824',
    T6: '#D4A017',
    T7: '#1A1A1A',
    T8: '#B5007F',
    T9: '#5B2C6F',
    T10: '#E91E63',
    T11: '#009B3A',
    T12: '#48C0A3',
    T13: '#D4A017',
    T14: '#5BC0EB',
    T15: '#E3000F',
    T17: '#9B1B30',
  },
};

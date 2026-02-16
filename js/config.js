export const CONFIG = {
  station: 'Balgrist',
  stationboardLimit: 15,
  apiBase: 'https://transport.opendata.ch/v1',

  stationboardRefresh: 30_000,
  connectionsRefresh: 180_000,
  clockRefresh: 1_000,
  pageReload: 6 * 60 * 60 * 1000,

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

  categoryClasses: {
    T: 'line-badge--tram',
    B: 'line-badge--bus',
    S: 'line-badge--sbahn',
    IR: 'line-badge--ir',
    IC: 'line-badge--ir',
    RE: 'line-badge--ir',
  },
};

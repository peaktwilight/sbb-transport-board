export const CONFIG = {
  station: 'Balgrist',
  stationboardLimit: 15,
  apiBase: 'https://transport.opendata.ch/v1',

  stationboardRefresh: 45_000,
  connectionsRefresh: 15 * 60_000, // 15 min (daily limit: 1000 connection searches)
  clockRefresh: 1_000,
  weatherRefresh: 10 * 60_000,
  screenInterval: 12_000, // switch screens every 12s
  pageReload: 6 * 60 * 60_000,

  destinations: [
    { name: 'ETH/UZH Zentrum', query: 'Zürich, ETH/Universitätsspital' },
    { name: 'ETH Hönggerberg', query: 'Zürich, ETH Hönggerberg' },
    { name: 'UZH Irchel', query: 'Zürich, Universität Irchel' },
    { name: 'HB Zürich', query: 'Zürich HB' },
    { name: 'Oerlikon', query: 'Zürich Oerlikon' },
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

  // Markets screen
  markets: {
    crypto: ['bitcoin', 'ethereum', 'solana', 'dogecoin'],
    forex: [
      { from: 'USD', to: 'CHF' },
      { from: 'EUR', to: 'CHF' },
    ],
    refreshInterval: 5 * 60_000,
  },

  // News screen
  news: {
    feeds: [
      { label: 'SWISSINFO', url: 'https://cdn.prod.swi-services.ch/rss/eng/rssxml/latest-news/rss' },
      { label: 'SRF', url: 'https://www.srf.ch/news/bnf/rss/1890' },
      // { label: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      { label: 'Guardian', url: 'https://www.theguardian.com/world/rss' },
      { label: 'Reuters', url: 'https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US' },
      // { label: 'FIN. TIMES', url: 'https://www.ft.com/world?format=rss' },
      { label: 'HACKER NEWS', url: 'https://hnrss.org/frontpage' },
      { label: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      // { label: '20MIN', url: 'https://partner-feeds.publishing.20min.ch/rss/20minuten' },
      { label: 'LE NEWS', url: 'https://lenews.ch/feed/' },
      { label: 'FINTECH CH', url: 'https://fintechnews.ch/feed/' },
      { label: 'NEW YORK TIMES', url: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/topic/destination/switzerland/rss.xml' },
      { label: 'LOCAL (CH)', url: 'https://feeds.thelocal.com/rss/ch' },
      { label: 'NASA', url: 'https://www.nasa.gov/news-release/feed/' },
      { label: 'SCIENCEDAILY', url: 'https://www.sciencedaily.com/rss/top/science.xml' },
      { label: 'ARS TECHNICA', url: 'https://feeds.arstechnica.com/arstechnica/index' },
      // { label: 'EURONEWS', url: 'https://feeds.feedburner.com/euronews/en/home/' },
    ],
    refreshInterval: 10 * 60_000,
    itemsPerFeed: 10,
    maxTitleLength: 100,
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

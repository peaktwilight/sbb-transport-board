export const CONFIG = {
  station: 'Balgrist',
  stationboardLimit: 15,
  apiBase: 'https://transport.opendata.ch/v1',

  stationboardRefresh: 45_000,
  clockRefresh: 1_000,
  weatherRefresh: 10 * 60_000,
  pageReload: 6 * 60 * 60_000,

  walkingTime: 4, // minutes to walk to Balgrist stop

  // Hide departures going away from the city
  excludeDestinations: ['Rehalp', 'Esslingen', 'Zollikon'],

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
      { label: 'Guardian', url: 'https://www.theguardian.com/world/rss' },
      { label: 'Reuters', url: 'https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US' },
      { label: 'HACKER NEWS', url: 'https://hnrss.org/frontpage' },
      { label: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      { label: 'LE NEWS', url: 'https://lenews.ch/feed/' },
      { label: 'FINTECH CH', url: 'https://fintechnews.ch/feed/' },
      { label: 'NEW YORK TIMES', url: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/topic/destination/switzerland/rss.xml' },
      { label: 'LOCAL (CH)', url: 'https://feeds.thelocal.com/rss/ch' },
      { label: 'NASA', url: 'https://www.nasa.gov/news-release/feed/' },
      { label: 'SCIENCEDAILY', url: 'https://www.sciencedaily.com/rss/top/science.xml' },
      { label: 'ARS TECHNICA', url: 'https://feeds.arstechnica.com/arstechnica/index' },
    ],
    refreshInterval: 10 * 60_000,
    itemsPerFeed: 10,
    maxTitleLength: 100,
  },

  // Birthdays (month 1-12, day 1-31)
  birthdays: [
    { name: 'Marie', month: 1, day: 7 },
    { name: 'Yiming', month: 2, day: 2 },
    { name: 'Xuelin', month: 2, day: 3 },
    { name: 'Fabi', month: 2, day: 17 },
    { name: 'Tomasz', month: 2, day: 17 },
    { name: 'Michi', month: 4, day: 2 },
    { name: 'Samira', month: 4, day: 12 },
    { name: 'Jannik', month: 4, day: 12 },
    { name: 'Kira', month: 5, day: 17 },
    { name: 'Sahil', month: 5, day: 20 },
    { name: 'Neko', month: 5, day: 23 },
    { name: 'Jule', month: 5, day: 25 },
    { name: 'Jingyang', month: 6, day: 22 },
    { name: 'Yitong', month: 6, day: 26 },
    { name: 'Doruk', month: 7, day: 10 },
    { name: 'César', month: 7, day: 23 },
    { name: 'Sienna', month: 7, day: 27 },
    { name: 'Jaaylin', month: 8, day: 1 },
    { name: 'Juan', month: 8, day: 11 },
    { name: 'Toheeb', month: 10, day: 4 },
    { name: 'Sophie', month: 11, day: 19 },
    { name: 'Adam', month: 11, day: 23 },
    { name: 'Anna', month: 12, day: 10 },
  ],

  // Kitchen shaming
  kitchen: {
    wahaSession: 'default',
    groupId: '41786737283-1415046441@g.us', // WG 3. Stock ft. the Traitors
    cooldown: 30_000, // 30s cooldown between shames
    sides: ['13er', '9er'],
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

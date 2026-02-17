# SBB Departure Board

A real-time public transport departure board for **Balgrist** tram stop in Zurich, styled like the classic Swiss LED boards. Built as a always-on tablet display for our WG (shared apartment) at Witellikerstrasse 20.

![HTML](https://img.shields.io/badge/HTML-vanilla-orange) ![CSS](https://img.shields.io/badge/CSS-custom-blue) ![JS](https://img.shields.io/badge/JS-ES_modules-yellow) ![API](https://img.shields.io/badge/API-transport.opendata.ch-red)

## What it does

- **Live departures** from Balgrist with real-time countdown, delay indicators, and a "GO NOW" green zone (3-6 min) for city-bound trams only
- **Weather screen** with current conditions, feels-like temp, wind, and rotating context-aware messages
- **News screen** with live RSS headlines from 13+ sources (Swissinfo, SRF, Guardian, Reuters, Hacker News, TechCrunch, and more) sorted by time with colored source badges
- **Birthday celebrations** — on someone's birthday: header takeover, birthday screen replaces news, and birthday messages in the ticker. On normal days: upcoming birthdays list in the news tab
- **Market ticker** at the bottom scrolling crypto (BTC, ETH, SOL, DOGE) and forex (USD/CHF, EUR/CHF) with green/red change indicators
- **Millisecond clock** because why not
- **Per-line ZVV colors** for all Zurich tram lines (Tram 4 = dark blue, Tram 8 = magenta, etc.)
- **Phosphor Icons** for transport types (tram, bus, S-Bahn, train)

## Screenshots

The board rotates between departures, weather, and news screens, with clickable tabs to switch manually.

## How it works

Plain HTML/CSS/JS with ES modules. No frameworks, no build step, no dependencies. Just open `index.html` with a local server.

### APIs used (all free, no keys needed)

| API | What for | Refresh |
|-----|----------|---------|
| [transport.opendata.ch](https://transport.opendata.ch) | Departures from Balgrist | Every 45s |
| [Open-Meteo](https://open-meteo.com) | Weather for Zurich | Every 10 min |
| [rss2json](https://rss2json.com) | RSS-to-JSON proxy for news feeds | Every 10 min |
| [CoinGecko](https://www.coingecko.com/en/api) | Crypto prices in CHF | Every 5 min |
| [Frankfurter](https://www.frankfurter.app) | Forex rates | Every 5 min |

### Rate limits

The transport API has a daily limit of ~10,000 stationboard requests. RSS feeds are staggered (300ms between each) to avoid rss2json rate limits. The board uses retry with exponential backoff to handle transient errors.

## Setup

```bash
# Clone
git clone https://github.com/peaktwilight/sbb-transport-board.git
cd sbb-transport-board

# Serve locally (ES modules need a server)
python3 -m http.server 8080

# Open http://localhost:8080
```

### Tablet kiosk mode

The board is optimized for a tablet running in fullscreen:

- `mobile-web-app-capable` for fullscreen
- Wake Lock API to prevent screen dimming
- Auto page reload every 6 hours (memory safety)
- Portrait fallback with responsive layout

### Docker

```bash
docker build -t sbb-board .
docker run -p 8080:8080 sbb-board
```

## Customization

Everything is in `js/config.js`:

```js
station: 'Balgrist',              // Your stop
excludeDestinations: ['Rehalp'],  // Filter out directions
markets: { crypto: [...], ... }   // Ticker symbols
lineColors: { T4: '#21468B' }     // Per-line badge colors
news: { feeds: [...] }            // RSS feed sources
birthdays: [                      // WG member birthdays
  { name: 'Fabi', month: 2, day: 17 },
]
```

### Messages

The board shows context-aware messages based on:
- **Time of day** (morning, afternoon, evening, night)
- **Day of week** (Monday blues, Friday vibes, etc.)
- **Weather** (rain, snow, fog, hot, freezing, overcast)
- **Birthdays** (fun WG-themed messages when it's someone's birthday)
- **Easter eggs** and WG inside jokes

All messages are in `js/info.js`, `js/ticker.js`, and `js/birthday.js`.

## Project structure

```
index.html          -- Single page app
css/styles.css      -- LED board styling, scanlines, transitions
js/
  config.js         -- All configuration in one place
  app.js            -- Init and orchestration
  clock.js          -- Millisecond clock and countdown utils
  board.js          -- Departure row rendering with go-zone
  weather.js        -- Open-Meteo weather fetching
  info.js           -- Weather screen messages and rendering
  ticker.js         -- Bottom ticker bar with messages
  stocks.js         -- Market data (crypto, forex)
  news.js           -- RSS news feed fetching and rendering
  birthday.js       -- Birthday detection, celebration, and upcoming list
  screens.js        -- Screen rotation and auto-scroll
  api.js            -- Transport API with retry
favicon.svg         -- Amber tram icon
```

## Made for

The Witelli 20 WG in Zurich. Made with love and JavaScript.

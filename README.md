# SBB Departure Board

A real-time public transport departure board for **Balgrist** tram stop in Zurich, styled like the classic Swiss LED boards. Built as a always-on tablet display for our WG (shared apartment) at Witellikerstrasse 20.

![HTML](https://img.shields.io/badge/HTML-vanilla-orange) ![CSS](https://img.shields.io/badge/CSS-custom-blue) ![JS](https://img.shields.io/badge/JS-ES_modules-yellow) ![API](https://img.shields.io/badge/API-transport.opendata.ch-red)

## What it does

- **Live departures** from Balgrist with real-time countdown, delay indicators, and a "leave now" green zone (3-7 min)
- **Weather screen** with current conditions, feels-like temp, wind, and rotating context-aware messages
- **Market ticker** at the bottom scrolling crypto (BTC, ETH, SOL, DOGE), stocks (NVDA, AAPL, GOOGL), and forex (USD/CHF, EUR/CHF) with green/red change indicators
- **Millisecond clock** because why not
- **Per-line ZVV colors** for all Zurich tram lines (Tram 4 = dark blue, Tram 8 = magenta, etc.)
- **Phosphor Icons** for transport types (tram, bus, S-Bahn, train)

## Screenshots

The board rotates between a departures view and a weather/message view, with clickable tabs to switch manually.

## How it works

Plain HTML/CSS/JS with ES modules. No frameworks, no build step, no dependencies. Just open `index.html` with a local server.

### APIs used (all free, no keys needed)

| API | What for | Refresh |
|-----|----------|---------|
| [transport.opendata.ch](https://transport.opendata.ch) | Departures from Balgrist | Every 45s |
| [Open-Meteo](https://open-meteo.com) | Weather for Zurich | Every 10 min |
| [CoinGecko](https://www.coingecko.com/en/api) | Crypto prices in CHF | Every 5 min |
| [Yahoo Finance](https://finance.yahoo.com) | Stock prices | Every 5 min |
| [Frankfurter](https://www.frankfurter.app) | Forex rates | Every 5 min |

### Rate limits

The transport API has a daily limit of ~1,000 connection searches and ~10,000 stationboard requests. The board uses localStorage caching and retry with exponential backoff to stay well within limits.

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

- `apple-mobile-web-app-capable` for iOS fullscreen
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
station: 'Balgrist',           // Your stop
destinations: [...],            // Connection destinations
walkingTime: 4,                 // Minutes to walk to stop
screenInterval: 12_000,         // Screen rotation speed (ms)
markets: { crypto: [...], ... } // Ticker symbols
lineColors: { T4: '#21468B' }   // Per-line badge colors
```

### Messages

The board shows context-aware messages based on:
- **Time of day** (morning, afternoon, evening, night)
- **Day of week** (Monday blues, Friday vibes, etc.)
- **Weather** (rain, snow, fog, hot, freezing, overcast)
- **Easter eggs** and adapted quotes

All messages are in `js/info.js` and `js/ticker.js`.

## Project structure

```
index.html          -- Single page app
css/styles.css      -- LED board styling, scanlines, transitions
js/
  config.js         -- All configuration in one place
  app.js            -- Init and orchestration
  clock.js          -- Millisecond clock and countdown utils
  board.js          -- Departure row rendering
  weather.js        -- Open-Meteo weather fetching
  info.js           -- Weather screen messages and rendering
  ticker.js         -- Bottom ticker bar with messages
  stocks.js         -- Market data (crypto, stocks, forex)
  screens.js        -- Screen rotation and auto-scroll
  api.js            -- Transport API with caching and retry
favicon.svg         -- Amber tram icon
```

## Made for

The Witelli 20 WG in Zurich. Made with love and JavaScript.

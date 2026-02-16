import { CONFIG } from './config.js';

const CRYPTO_NAMES = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  solana: { symbol: 'SOL', name: 'Solana' },
  dogecoin: { symbol: 'DOGE', name: 'Dogecoin' },
};

const STOCK_NAMES = {
  NVDA: 'NVIDIA',
  AAPL: 'Apple',
  GOOGL: 'Alphabet',
};

let cachedCrypto = null;
let cachedStocks = null;
let cachedForex = null;
let lastFetchTime = null;

async function fetchCrypto() {
  const ids = CONFIG.markets.crypto.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=chf&include_24hr_change=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}

async function fetchStocks() {
  const symbols = CONFIG.markets.stocks;
  const results = {};
  for (const symbol of symbols) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const meta = data.chart.result[0].meta;
      const price = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose || meta.previousClose;
      const change = prevClose ? ((price - prevClose) / prevClose) * 100 : null;
      results[symbol] = { price, change, currency: meta.currency };
    } catch {
      // Yahoo Finance may block CORS — fail silently per stock
    }
  }
  return Object.keys(results).length ? results : null;
}

async function fetchForex() {
  const pairs = CONFIG.markets.forex;
  const results = [];
  for (const pair of pairs) {
    try {
      const url = `https://api.frankfurter.app/latest?from=${pair.from}&to=${pair.to}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      results.push({ from: pair.from, to: pair.to, rate: data.rates[pair.to] });
    } catch {}
  }
  return results;
}

function formatPrice(price) {
  if (price >= 1000) return price.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toLocaleString('de-CH', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function changeHtml(change) {
  if (change === null || change === undefined) return '';
  const cls = change >= 0 ? 'market-up' : 'market-down';
  const arrow = change >= 0 ? '▲' : '▼';
  return `<span class="${cls}">${arrow} ${Math.abs(change).toFixed(1)}%</span>`;
}

export async function fetchMarkets() {
  try {
    const [crypto, stocks, forex] = await Promise.all([
      fetchCrypto().catch(() => null),
      fetchStocks().catch(() => null),
      fetchForex().catch(() => []),
    ]);
    if (crypto) cachedCrypto = crypto;
    if (stocks) cachedStocks = stocks;
    if (forex.length) cachedForex = forex;
    lastFetchTime = Date.now();
  } catch (err) {
    console.warn('Markets fetch failed:', err);
  }
}

function renderRows(items) {
  return items.map(({ symbol, name, price, currency, change }) => `
    <div class="market-row">
      <div class="market-symbol">${symbol}</div>
      <div class="market-name led-text-dim">${name}</div>
      <div class="market-price led-text">${formatPrice(price)} <span class="market-currency">${currency}</span></div>
      <div class="market-change">${changeHtml(change)}</div>
    </div>
  `).join('');
}

export function renderMarkets(container) {
  if (!cachedCrypto && !cachedStocks && !cachedForex) {
    container.innerHTML = '<div class="connections-loading led-text-dim">Loading markets...</div>';
    return;
  }

  let html = '<div class="markets-grid">';

  // Crypto section
  if (cachedCrypto) {
    html += '<div class="market-section-header led-text-white">Crypto</div>';
    const rows = CONFIG.markets.crypto
      .filter((id) => cachedCrypto[id])
      .map((id) => {
        const info = CRYPTO_NAMES[id] || { symbol: id.toUpperCase(), name: id };
        const data = cachedCrypto[id];
        return { symbol: info.symbol, name: info.name, price: data.chf, currency: 'CHF', change: data.chf_24h_change };
      });
    html += renderRows(rows);
  }

  // Stocks section
  if (cachedStocks) {
    html += '<div class="market-section-header led-text-white">Stocks</div>';
    const rows = CONFIG.markets.stocks
      .filter((s) => cachedStocks[s])
      .map((symbol) => {
        const data = cachedStocks[symbol];
        return { symbol, name: STOCK_NAMES[symbol] || symbol, price: data.price, currency: data.currency, change: data.change };
      });
    html += renderRows(rows);
  }

  // Forex section
  if (cachedForex && cachedForex.length) {
    html += '<div class="market-section-header led-text-white">Forex</div>';
    const rows = cachedForex.map((pair) => ({
      symbol: pair.from, name: `${pair.from}/${pair.to}`, price: pair.rate, currency: pair.to, change: null,
    }));
    html += renderRows(rows);
  }

  // Timestamp
  if (lastFetchTime) {
    const age = Math.round((Date.now() - lastFetchTime) / 60_000);
    const timeStr = age < 1 ? 'just now' : `${age} min ago`;
    html += `<div class="market-updated led-text-dim">Updated ${timeStr}</div>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

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

function changeText(change) {
  if (change === null || change === undefined) return '';
  const arrow = change >= 0 ? '▲' : '▼';
  return ` ${arrow}${Math.abs(change).toFixed(1)}%`;
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

export function getTickerItems() {
  const items = [];

  if (cachedCrypto) {
    for (const id of CONFIG.markets.crypto) {
      const data = cachedCrypto[id];
      if (!data) continue;
      const info = CRYPTO_NAMES[id] || { symbol: id.toUpperCase() };
      items.push(`${info.symbol} ${formatPrice(data.chf)} CHF${changeText(data.chf_24h_change)}`);
    }
  }

  if (cachedStocks) {
    for (const symbol of CONFIG.markets.stocks) {
      const data = cachedStocks[symbol];
      if (!data) continue;
      items.push(`${symbol} ${formatPrice(data.price)} ${data.currency}${changeText(data.change)}`);
    }
  }

  if (cachedForex && cachedForex.length) {
    for (const pair of cachedForex) {
      items.push(`${pair.from}/${pair.to} ${pair.rate.toFixed(4)}`);
    }
  }

  return items;
}

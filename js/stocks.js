import { CONFIG } from './config.js';

const CRYPTO_NAMES = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  solana: { symbol: 'SOL', name: 'Solana' },
  dogecoin: { symbol: 'DOGE', name: 'Dogecoin' },
};

let cachedCrypto = null;
let cachedForex = null;

async function fetchCrypto() {
  const ids = CONFIG.markets.crypto.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=chf&include_24hr_change=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
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
  const cls = change >= 0 ? 'ticker-up' : 'ticker-down';
  const arrow = change >= 0 ? '▲' : '▼';
  return ` <span class="${cls}">${arrow}${Math.abs(change).toFixed(1)}%</span>`;
}

export async function fetchMarkets() {
  try {
    const [crypto, forex] = await Promise.all([
      fetchCrypto().catch(() => null),
      fetchForex().catch(() => []),
    ]);
    if (crypto) cachedCrypto = crypto;
    if (forex.length) cachedForex = forex;
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
      items.push(`${info.symbol} ${formatPrice(data.chf)} CHF${changeHtml(data.chf_24h_change)}`);
    }
  }

  if (cachedForex && cachedForex.length) {
    for (const pair of cachedForex) {
      items.push(`${pair.from}/${pair.to} ${pair.rate.toFixed(4)}`);
    }
  }

  return items;
}

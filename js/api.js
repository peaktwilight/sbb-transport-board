import { CONFIG } from './config.js';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCached(key, maxAge) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > maxAge) return null;
    return data;
  } catch { return null; }
}

function setCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const response = await fetch(url);
    if (response.ok) return response.json();
    if (response.status === 429 && i < retries) {
      const wait = (i + 1) * 5000;
      console.warn(`Rate limited, retrying in ${wait / 1000}s...`);
      await delay(wait);
      continue;
    }
    throw new Error(`API error: ${response.status}`);
  }
}

export async function fetchStationboard() {
  const url = `${CONFIG.apiBase}/stationboard?station=${encodeURIComponent(CONFIG.station)}&limit=${CONFIG.stationboardLimit}`;
  const data = await fetchWithRetry(url);
  return data.stationboard;
}

export async function fetchConnections(destination) {
  const cacheKey = `conn_${destination}`;
  const cached = getCached(cacheKey, CONFIG.connectionsRefresh);
  if (cached) return cached;

  const url = `${CONFIG.apiBase}/connections?from=${encodeURIComponent(CONFIG.station)}&to=${encodeURIComponent(destination)}&limit=${CONFIG.connectionsPerDestination}`;
  const data = await fetchWithRetry(url);
  setCache(cacheKey, data.connections);
  return data.connections;
}

export async function fetchConnectionsStreaming(onResult) {
  for (const dest of CONFIG.destinations) {
    try {
      const connections = await fetchConnections(dest.query);
      onResult({ destination: dest.name, connections });
    } catch (err) {
      console.warn(`Failed to fetch ${dest.name}:`, err);
    }
    await delay(3000);
  }
}

import { CONFIG } from './config.js';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

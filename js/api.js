import { CONFIG } from './config.js';

export async function fetchStationboard() {
  const url = `${CONFIG.apiBase}/stationboard?station=${encodeURIComponent(CONFIG.station)}&limit=${CONFIG.stationboardLimit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Stationboard API error: ${response.status}`);
  const data = await response.json();
  return data.stationboard;
}

export async function fetchConnections(destination) {
  const url = `${CONFIG.apiBase}/connections?from=${encodeURIComponent(CONFIG.station)}&to=${encodeURIComponent(destination)}&limit=${CONFIG.connectionsPerDestination}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Connections API error: ${response.status}`);
  const data = await response.json();
  return data.connections;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllConnections() {
  const results = [];
  for (const dest of CONFIG.destinations) {
    try {
      const connections = await fetchConnections(dest.query);
      results.push({ destination: dest.name, connections });
    } catch (err) {
      console.warn(`Failed to fetch ${dest.name}:`, err);
    }
    await delay(1500);
  }
  return results;
}

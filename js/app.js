import { CONFIG } from './config.js';
import { fetchStationboard, fetchConnectionsStreaming } from './api.js';
import { renderStationboard, updateCountdowns } from './board.js';
import { appendConnection, updateConnectionCountdowns } from './connections.js';
import { startClock } from './clock.js';
import { fetchWeather, currentWeatherCode, currentTemp } from './weather.js';
import { buildTicker } from './ticker.js';

const $ = (id) => document.getElementById(id);
const clockEl = $('clock');
const departuresEl = $('departures-body');
const connectionsEl = $('connections-body');
const statusEl = $('status');
const weatherEl = $('weather');
const tickerEl = $('ticker-track');

let currentDepartures = [];
let lastSuccessTime = Date.now();

async function updateStationboard() {
  try {
    currentDepartures = await fetchStationboard();
    renderStationboard(currentDepartures, departuresEl);
    lastSuccessTime = Date.now();
    setStatus('ok');
  } catch (err) {
    console.error('Stationboard fetch failed:', err);
    setStatus('error');
  }
}

async function updateConnections() {
  if (!connectionsEl.querySelector('.connection-section')) {
    connectionsEl.innerHTML = '<div class="connections-loading led-text-dim">Loading connections...</div>';
  }
  await fetchConnectionsStreaming((data) => appendConnection(data, connectionsEl));
}

function tick() {
  if (currentDepartures.length) updateCountdowns(currentDepartures, departuresEl);
  updateConnectionCountdowns(connectionsEl);
  if (Date.now() - lastSuccessTime > 120_000) setStatus('stale');
}

function setStatus(state) {
  if (!statusEl) return;
  statusEl.className = `status-label status-${state}`;
  statusEl.textContent = state === 'ok' ? 'LIVE' : state === 'error' ? 'OFFLINE' : 'STALE';
}

async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    await navigator.wakeLock.request('screen');
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') navigator.wakeLock.request('screen');
    });
  } catch {}
}

async function init() {
  startClock(clockEl);
  requestWakeLock();
  buildTicker(tickerEl, null, null);

  updateStationboard();
  updateConnections();

  fetchWeather(weatherEl).then(() => buildTicker(tickerEl, currentWeatherCode, currentTemp));

  setInterval(updateStationboard, CONFIG.stationboardRefresh);
  setInterval(updateConnections, CONFIG.connectionsRefresh);
  setInterval(tick, CONFIG.clockRefresh);
  setInterval(() => fetchWeather(weatherEl), CONFIG.weatherRefresh);
  setTimeout(() => location.reload(), CONFIG.pageReload);
}

document.addEventListener('DOMContentLoaded', init);

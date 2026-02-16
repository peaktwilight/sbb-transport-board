import { CONFIG } from './config.js';
import { fetchStationboard, fetchConnectionsStreaming } from './api.js';
import { renderStationboard, updateCountdowns } from './board.js';
import { appendConnection, updateConnectionCountdowns } from './connections.js';
import { startClock } from './clock.js';
import { fetchWeather, currentWeatherCode, currentTemp } from './weather.js';
import { buildTicker } from './ticker.js';

const clockEl = document.getElementById('clock');
const departuresEl = document.getElementById('departures-body');
const connectionsEl = document.getElementById('connections-body');
const statusEl = document.getElementById('status');
const weatherEl = document.getElementById('weather');
const tickerEl = document.getElementById('ticker-track');

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
  await fetchConnectionsStreaming((data) => {
    appendConnection(data, connectionsEl);
  });
}

function tickCountdowns() {
  if (currentDepartures.length > 0) {
    updateCountdowns(currentDepartures, departuresEl);
  }
  updateConnectionCountdowns(connectionsEl);

  if (Date.now() - lastSuccessTime > 120_000) {
    setStatus('stale');
  }
}

function setStatus(state) {
  if (statusEl) {
    statusEl.className = `status-label status-${state}`;
    statusEl.textContent = state === 'ok' ? 'LIVE' : state === 'error' ? 'OFFLINE' : 'STALE';
  }
}

async function initWeatherAndTicker() {
  await fetchWeather(weatherEl);
  buildTicker(tickerEl, currentWeatherCode, currentTemp);
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      let lock = await navigator.wakeLock.request('screen');
      document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
          lock = await navigator.wakeLock.request('screen');
        }
      });
    }
  } catch (err) {
    console.warn('Wake Lock not available:', err);
  }
}

function init() {
  startClock(clockEl);
  requestWakeLock();

  buildTicker(tickerEl, null, null);

  updateStationboard();
  updateConnections();
  initWeatherAndTicker();

  setInterval(updateStationboard, CONFIG.stationboardRefresh);
  setInterval(updateConnections, CONFIG.connectionsRefresh);
  setInterval(tickCountdowns, CONFIG.clockRefresh);
  setInterval(() => fetchWeather(weatherEl), 10 * 60 * 1000);

  setTimeout(() => location.reload(), CONFIG.pageReload);
}

document.addEventListener('DOMContentLoaded', init);

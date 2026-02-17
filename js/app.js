import { CONFIG } from './config.js';
import { fetchStationboard } from './api.js';
import { renderStationboard, updateCountdowns } from './board.js';
import { startClock } from './clock.js';
import { fetchWeather, currentWeatherCode, currentTemp } from './weather.js';
import { buildTicker } from './ticker.js';
import { initScreens } from './screens.js';
import { updateInfoScreen } from './info.js';
import { fetchMarkets, getTickerItems } from './stocks.js';
import { fetchNews, renderNewsScreen } from './news.js';
import { getTodaysBirthdays, renderBirthdayNews, onNewsScreenLeave, renderUpcomingBirthdays } from './birthday.js';

const $ = (id) => document.getElementById(id);
const clockEl = $('clock');
const departuresEl = $('departures-body');
const statusEl = $('status');
const tickerEl = $('ticker-track');
const progressEl = $('screen-progress');
const headerDayEl = $('header-day');
const headerDateEl = $('header-date');
const infoWeatherEl = $('info-weather');
const infoMessageEl = $('info-message');
const newsBodyEl = $('news-body');

let currentDepartures = [];
let lastSuccessTime = Date.now();
const todayBirthdays = getTodaysBirthdays();

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

function tick() {
  if (currentDepartures.length) updateCountdowns(currentDepartures, departuresEl);
  if (Date.now() - lastSuccessTime > 120_000) setStatus('stale');
}

function setStatus(state) {
  if (!statusEl) return;
  statusEl.className = `status-label status-${state}`;
  statusEl.textContent = state === 'ok' ? 'LIVE' : state === 'error' ? 'OFFLINE' : 'STALE';
}

function rebuildTicker() {
  buildTicker(tickerEl, currentWeatherCode, currentTemp, getTickerItems());
}

function showNewsOrBirthday() {
  if (todayBirthdays.length) {
    renderBirthdayNews(newsBodyEl, todayBirthdays);
  } else {
    renderNewsScreen(newsBodyEl);
    renderUpcomingBirthdays(newsBodyEl);
  }
}

function showBirthdayHeader() {
  const names = todayBirthdays.map((b) => b.name).join(' & ');
  headerDayEl.textContent = 'Happy Birthday';
  headerDayEl.classList.remove('led-text-dim');
  headerDayEl.classList.add('led-text');
  headerDateEl.textContent = '';
  const stationEl = document.querySelector('.station-name');
  if (stationEl) {
    stationEl.textContent = names;
    stationEl.classList.remove('led-text-white');
    stationEl.classList.add('led-text');
    stationEl.style.animation = 'name-glow 2s ease-in-out infinite';
  }
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
  startClock(clockEl, headerDayEl, headerDateEl);
  requestWakeLock();

  if (todayBirthdays.length) showBirthdayHeader();

  initScreens(progressEl, (screen) => {
    if (screen === 'info') updateInfoScreen(infoWeatherEl, infoMessageEl);
    if (screen === 'news') showNewsOrBirthday();
    if (screen !== 'news') onNewsScreenLeave();
  });
  updateInfoScreen(infoWeatherEl, infoMessageEl);
  buildTicker(tickerEl, null, null, []);

  updateStationboard();
  fetchMarkets().then(rebuildTicker);
  fetchNews().then(showNewsOrBirthday);

  fetchWeather().then(() => {
    rebuildTicker();
    updateInfoScreen(infoWeatherEl, infoMessageEl);
  });

  setInterval(updateStationboard, CONFIG.stationboardRefresh);
  setInterval(tick, CONFIG.clockRefresh);
  setInterval(() => fetchWeather(), CONFIG.weatherRefresh);
  setInterval(() => fetchMarkets().then(rebuildTicker), CONFIG.markets.refreshInterval);
  setInterval(() => fetchNews().then(showNewsOrBirthday), CONFIG.news.refreshInterval);
  setTimeout(() => location.reload(), CONFIG.pageReload);
}

document.addEventListener('DOMContentLoaded', init);

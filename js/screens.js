import { CONFIG } from './config.js';

const screens = [];
let current = 0;
let progressEl = null;
let onSwitch = null;
let scrollTimer = null;
let autoTimer = null;

export function initScreens(progressElement, onScreenSwitch) {
  progressEl = progressElement;
  onSwitch = onScreenSwitch;
  const els = document.querySelectorAll('.screen');
  els.forEach((el, i) => {
    screens.push(el);
    el.classList.toggle('screen--active', i === 0);
  });

  // Tab click handlers
  document.querySelectorAll('.screen-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = parseInt(tab.dataset.target, 10);
      if (target === current) return;
      goTo(target);
      restartAutoTimer();
    });
  });

  resetProgress();
  autoScroll(screens[0]);
  startAutoTimer();
}

function startAutoTimer() {
  autoTimer = setInterval(next, CONFIG.screenInterval);
}

function restartAutoTimer() {
  clearInterval(autoTimer);
  resetProgress();
  startAutoTimer();
}

function goTo(target) {
  const prev = screens[current];
  current = target;
  const active = screens[current];

  prev.classList.add('screen--out');
  prev.classList.remove('screen--active');

  active.classList.add('screen--in');
  active.offsetHeight;
  active.classList.remove('screen--in');
  active.classList.add('screen--active');

  setTimeout(() => {
    prev.classList.remove('screen--out');
  }, 600);

  updateTabs();
  autoScroll(active);
  if (onSwitch) onSwitch(active.dataset.screen);
}

function next() {
  goTo((current + 1) % screens.length);
  resetProgress();
}

function updateTabs() {
  document.querySelectorAll('.screen-tab').forEach((tab) => {
    tab.classList.toggle('screen-tab--active', parseInt(tab.dataset.target, 10) === current);
  });
}

let scrollDirection = 1;
const SCROLL_PAUSE = 2000; // pause at top/bottom before reversing
let scrollPauseUntil = 0;

function autoScroll(screen) {
  if (scrollTimer) clearInterval(scrollTimer);
  const body = screen.querySelector('.screen-body');
  if (!body) return;
  body.scrollTop = 0;
  scrollDirection = 1;
  scrollPauseUntil = Date.now() + SCROLL_PAUSE;
  scrollTimer = setInterval(() => {
    const maxScroll = body.scrollHeight - body.clientHeight;
    if (maxScroll <= 0) return;
    if (Date.now() < scrollPauseUntil) return;
    body.scrollTop += scrollDirection;
    if (body.scrollTop >= maxScroll - 1 && scrollDirection === 1) {
      scrollDirection = -1;
      scrollPauseUntil = Date.now() + SCROLL_PAUSE;
    } else if (body.scrollTop <= 0 && scrollDirection === -1) {
      scrollDirection = 1;
      scrollPauseUntil = Date.now() + SCROLL_PAUSE;
    }
  }, 50);
}

function resetProgress() {
  if (!progressEl) return;
  const tab = document.querySelector(`.screen-tab[data-target="${current}"]`);
  if (!tab) return;
  const nav = tab.parentElement;
  const navRect = nav.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  progressEl.style.left = `${tabRect.left - navRect.left}px`;
  progressEl.style.width = `${tabRect.width}px`;
  progressEl.style.transition = 'none';
  progressEl.style.transform = 'scaleX(0)';
  progressEl.offsetHeight;
  progressEl.style.transition = `transform ${CONFIG.screenInterval}ms linear`;
  progressEl.style.transform = 'scaleX(1)';
}

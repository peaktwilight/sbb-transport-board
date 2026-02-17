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

  // Stagger on first load
  screens[0].classList.add('screen--entering');
  setTimeout(() => screens[0].classList.remove('screen--entering'), 1200);

  resetProgress();
  autoScroll(screens[0]);
  startAutoTimer();
}

const SCREEN_DURATIONS = [12_000, 8_000, 10_000]; // departures, weather, news

function getDuration() {
  return SCREEN_DURATIONS[current] || SCREEN_DURATIONS[0];
}

function startAutoTimer() {
  autoTimer = setTimeout(() => {
    next();
    startAutoTimer();
  }, getDuration());
}

function restartAutoTimer() {
  clearTimeout(autoTimer);
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
  active.classList.add('screen--active', 'screen--entering');

  setTimeout(() => prev.classList.remove('screen--out'), 600);
  setTimeout(() => active.classList.remove('screen--entering'), 1200);

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
const SCROLL_PAUSE = 2000;
let scrollPauseUntil = 0;
let userScrolling = false;
let userScrollTimeout = null;
let currentScrollBody = null;

function autoScroll(screen) {
  if (scrollTimer) clearInterval(scrollTimer);
  // Clean up previous listener
  if (currentScrollBody) {
    currentScrollBody.removeEventListener('wheel', onUserScroll);
    currentScrollBody.removeEventListener('touchstart', onUserScroll);
  }
  const body = screen.querySelector('.screen-body');
  if (!body) { currentScrollBody = null; return; }
  currentScrollBody = body;
  body.scrollTop = 0;
  scrollDirection = 1;
  userScrolling = false;
  scrollPauseUntil = Date.now() + SCROLL_PAUSE;

  // User scroll overrides auto-scroll, resumes after 4s of inactivity
  body.addEventListener('wheel', onUserScroll, { passive: true });
  body.addEventListener('touchstart', onUserScroll, { passive: true });

  scrollTimer = setInterval(() => {
    if (userScrolling) return;
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

function onUserScroll() {
  userScrolling = true;
  clearTimeout(userScrollTimeout);
  userScrollTimeout = setTimeout(() => {
    userScrolling = false;
    scrollPauseUntil = Date.now() + SCROLL_PAUSE;
  }, 4000);
}

let bar = null;
let cover = null;
let animFrame = null;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function resetProgress() {
  if (!progressEl) return;
  cancelAnimationFrame(animFrame);

  if (!bar || !bar.parentElement) {
    progressEl.innerHTML = '<div class="progress-bar"></div><div class="progress-cover"></div>';
    bar = progressEl.querySelector('.progress-bar');
    cover = progressEl.querySelector('.progress-cover');
  }

  const duration = getDuration();
  const isDrain = current === 1; // weather: cover eats the bar

  if (isDrain) {
    // Bar stays full, cover grows over it
    bar.style.width = '100%';
    cover.style.width = '0';
  } else {
    // Reset both, bar fills fresh
    bar.style.width = '0';
    cover.style.width = '0';
  }

  requestAnimationFrame(() => {
    const start = performance.now();

    function tick(now) {
      const linear = Math.min((now - start) / duration, 1);
      const t = easeOutCubic(linear);

      if (isDrain) {
        cover.style.width = `${t * 100}%`;
      } else {
        bar.style.width = `${t * 100}%`;
      }

      if (linear < 1) animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);
  });
}

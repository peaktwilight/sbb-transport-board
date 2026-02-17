import { CONFIG } from './config.js';

const CAKE_ICON = '<i class="ph-bold ph-cake birthday-icon"></i>';

const BIRTHDAY_TICKER = [
  (n) => `HAPPY BIRTHDAY ${n.toUpperCase()}!!! The whole WG is celebrating`,
  (n) => `It's ${n}'s birthday! Be extra nice today (or at least do the dishes)`,
  (n) => `${n} was born on this day. The world has never been the same`,
  (n) => `Birthday alert: ${n} is officially older. Congrats? Condolences?`,
  (n) => `${n}'s birthday! Free hugs mandatory, free drinks optional but encouraged`,
  (n) => `PSA: It's ${n}'s birthday. Act accordingly`,
  (n) => `${n} levels up today! +1 year, +1 wisdom (debatable)`,
  (n) => `The Witelli birthday protocol is now active for ${n}`,
  (n) => `${n}'s special day! No chores for the birthday human`,
  (n) => `Breaking: ${n} is celebrating a birthday. The tram is still on time though`,
  (n) => `Reminder: buy ${n} a cake. Or at least a Migros Guetzli`,
  (n) => `${n}: another year older, another year of surviving WG life`,
];

const SUBTITLES = [
  (n) => `${n} is officially older. The WG sends its condolences and cake`,
  (n) => `Another year of ${n} surviving Witelli. Legendary`,
  (n) => `${n}'s birthday protocol: no dishes, no chores, max vibes`,
  (n) => `The departure board wishes ${n} the happiest of birthdays`,
  (n) => `Level up! ${n} gained +1 year and +100 birthday vibes`,
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getTodaysBirthdays() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return (CONFIG.birthdays || []).filter((b) => b.month === month && b.day === day);
}

export function getBirthdayTickerMessages(birthdays) {
  const messages = [];
  for (const b of birthdays) {
    const shuffled = [...BIRTHDAY_TICKER].sort(() => Math.random() - 0.5);
    messages.push(...shuffled.slice(0, 5).map((fn) => fn(b.name)));
  }
  return messages;
}

function getUpcomingBirthdays() {
  const now = new Date();
  const birthdays = (CONFIG.birthdays || []).map((b) => {
    const daysAway = getDaysUntil(now, b.month, b.day);
    return { ...b, daysAway };
  });
  birthdays.sort((a, b) => a.daysAway - b.daysAway);
  return birthdays;
}

function getDaysUntil(from, month, day) {
  const thisYear = from.getFullYear();
  let target = new Date(thisYear, month - 1, day);
  const today = new Date(thisYear, from.getMonth(), from.getDate());
  if (target < today) target = new Date(thisYear + 1, month - 1, day);
  return Math.round((target - today) / 86_400_000);
}

// Renders birthday celebration into the news screen body (replaces news)
export function renderBirthdayNews(container, birthdays) {
  const names = birthdays.map((b) => b.name).join(' & ');
  const subtitle = SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)](names);

  container.innerHTML = `
    <div class="birthday-screen">
      <div class="birthday-content">
        <div class="birthday-cake">${CAKE_ICON}</div>
        <div class="birthday-greeting">
          <div class="birthday-label led-text">HAPPY BIRTHDAY</div>
          <div class="birthday-name">${names}</div>
        </div>
        <div class="birthday-subtitle">${subtitle}</div>
      </div>
    </div>
  `;
}

// Renders upcoming birthdays list for the news screen body (appended after news)
export function renderUpcomingBirthdays(container) {
  const upcoming = getUpcomingBirthdays();
  if (!upcoming.length) return;

  const section = document.createElement('div');
  section.className = 'birthday-upcoming';
  section.innerHTML = `<div class="birthday-upcoming-header led-text-dim">
    <i class="ph-bold ph-cake"></i> Upcoming Birthdays
  </div>`;

  for (const b of upcoming) {
    const row = document.createElement('div');
    row.className = 'birthday-upcoming-row';
    const dateStr = `${b.day} ${MONTHS[b.month - 1]}`;
    let away = '';
    if (b.daysAway === 0) away = '<span class="birthday-today led-text">TODAY!</span>';
    else if (b.daysAway === 1) away = '<span class="led-text-dim">tomorrow</span>';
    else if (b.daysAway <= 7) away = `<span class="led-text-dim">in ${b.daysAway} days</span>`;
    else away = `<span class="led-text-dim">${dateStr}</span>`;

    row.innerHTML = `
      <span class="birthday-upcoming-name led-text-white">${b.name}</span>
      <span class="birthday-upcoming-date">${away}</span>
    `;
    section.appendChild(row);
  }

  container.appendChild(section);
}

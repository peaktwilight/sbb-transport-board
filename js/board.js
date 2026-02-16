import { CONFIG } from './config.js';
import { formatTime, getCountdown } from './clock.js';

function cleanDestination(name) {
  return name.replace(/^Zürich,\s*/, '');
}

function minuteClass(mins) {
  if (mins < 1) return 'minutes--imminent';
  if (mins <= 3) return 'minutes--soon';
  if (mins <= CONFIG.walkingTime + 1) return 'minutes--go';
  return '';
}

function badgeStyle(category, number) {
  const color = CONFIG.lineColors?.[`${category}${number}`];
  return color ? ` style="background:${color}"` : '';
}

export function renderStationboard(departures, container) {
  container.innerHTML = '';

  for (const dep of departures) {
    const time = dep.stop.prognosis?.departure || dep.stop.departure;
    const countdown = getCountdown(time);
    if (countdown.totalSecs <= 0) continue;

    const badgeClass = CONFIG.categoryClasses[dep.category] || 'line-badge--default';
    const style = badgeStyle(dep.category, dep.number);
    const delayHtml = dep.stop.delay > 0
      ? `<span class="delay-indicator">+${dep.stop.delay}</span>` : '';
    const isGo = countdown.mins > 3 && countdown.mins <= CONFIG.walkingTime + 1;

    const row = document.createElement('div');
    row.className = `departure-row${isGo ? ' departure-row--go' : ''}`;
    row.innerHTML = `
      <div class="departure-line">
        <span class="line-badge ${badgeClass}"${style}>
          <i class="ph-bold ${CONFIG.categoryIcons[dep.category] || 'ph-path'} line-icon"></i>
          <span class="line-number">${dep.number}</span>
        </span>
      </div>
      <div class="departure-destination led-text">${cleanDestination(dep.to)}</div>
      <div class="departure-time led-text">${formatTime(time)}${delayHtml}</div>
      <div class="departure-minutes led-text ${minuteClass(countdown.mins)}">${countdown.text}</div>
    `;
    container.appendChild(row);
  }
}

export function updateCountdowns(departures, container) {
  const rows = container.querySelectorAll('.departure-row');
  rows.forEach((row, i) => {
    if (!departures[i]) return;
    const time = departures[i].stop.prognosis?.departure || departures[i].stop.departure;
    const countdown = getCountdown(time);
    const el = row.querySelector('.departure-minutes');
    if (el) {
      el.textContent = countdown.text;
      el.className = `departure-minutes led-text ${minuteClass(countdown.mins)}`;
    }
    row.classList.toggle('departure-row--go', countdown.mins > 3 && countdown.mins <= CONFIG.walkingTime + 1);
  });
}

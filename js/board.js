import { CONFIG } from './config.js';
import { formatTime, getCountdown } from './clock.js';

function cleanDestination(name) {
  return name.replace(/^Zürich,\s*/, '');
}

function minuteClass(mins) {
  return mins < 1 ? 'minutes--imminent' : mins <= 3 ? 'minutes--soon' : '';
}

export function renderStationboard(departures, container) {
  container.innerHTML = '';

  for (const dep of departures) {
    const time = dep.stop.prognosis?.departure || dep.stop.departure;
    const countdown = getCountdown(time);
    if (countdown.totalSecs <= 0) continue;

    const badgeClass = CONFIG.categoryClasses[dep.category] || 'line-badge--default';
    const delayHtml = dep.stop.delay > 0
      ? `<span class="delay-indicator">+${dep.stop.delay}</span>` : '';

    const row = document.createElement('div');
    row.className = 'departure-row';
    row.innerHTML = `
      <div class="departure-line">
        <span class="line-badge ${badgeClass}">
          <span class="line-category">${dep.category}</span>
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
  });
}

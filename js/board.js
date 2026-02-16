import { CONFIG } from './config.js';
import { formatTime, getCountdown } from './clock.js';

function cleanDestination(fullName) {
  return fullName.replace(/^Zürich,\s*/, '');
}

export function renderStationboard(departures, container) {
  container.innerHTML = '';

  departures.forEach((dep) => {
    const departureTime = dep.stop.prognosis?.departure || dep.stop.departure;
    const countdown = getCountdown(departureTime);

    // Skip already-departed entries
    if (countdown.totalSecs <= 0 && new Date(departureTime) < new Date()) return;

    const row = document.createElement('div');
    row.className = 'departure-row';

    const minuteClass =
      countdown.mins < 1 ? 'minutes--imminent' : countdown.mins <= 3 ? 'minutes--soon' : '';

    const badgeClass = CONFIG.categoryClasses[dep.category] || 'line-badge--default';
    const lineLabel = `${dep.number}`;
    const categoryLabel = dep.category;

    const delayHtml =
      dep.stop.delay && dep.stop.delay > 0
        ? `<span class="delay-indicator">+${dep.stop.delay}</span>`
        : '';

    row.innerHTML = `
      <div class="departure-line">
        <span class="line-badge ${badgeClass}">
          <span class="line-category">${categoryLabel}</span>
          <span class="line-number">${lineLabel}</span>
        </span>
      </div>
      <div class="departure-destination led-text">${cleanDestination(dep.to)}</div>
      <div class="departure-time led-text">${formatTime(departureTime)}${delayHtml}</div>
      <div class="departure-minutes led-text ${minuteClass}">${countdown.text}</div>
    `;

    container.appendChild(row);
  });
}

export function updateCountdowns(departures, container) {
  const rows = container.querySelectorAll('.departure-row');
  rows.forEach((row, i) => {
    if (!departures[i]) return;
    const departureTime =
      departures[i].stop.prognosis?.departure || departures[i].stop.departure;
    const countdown = getCountdown(departureTime);
    const minEl = row.querySelector('.departure-minutes');
    if (minEl) {
      minEl.textContent = countdown.text;
      minEl.className = `departure-minutes led-text ${
        countdown.mins < 1 ? 'minutes--imminent' : countdown.mins <= 3 ? 'minutes--soon' : ''
      }`;
    }
  });
}

import { CONFIG } from './config.js';
import { formatTime, getCountdown } from './clock.js';

function parseDuration(durationStr) {
  const match = durationStr.match(/(\d+)d(\d+):(\d+):(\d+)/);
  if (!match) return durationStr;
  const [, days, hours, mins] = match;
  const totalMins = parseInt(days) * 1440 + parseInt(hours) * 60 + parseInt(mins);
  return `${totalMins} min`;
}

function getFirstTransportSection(conn) {
  const section = conn.sections?.find((s) => s.journey);
  if (!section) return null;
  return {
    category: section.journey.category,
    number: section.journey.number,
  };
}

function renderSection({ destination, connections }) {
  const section = document.createElement('div');
  section.className = 'connection-section';
  section.dataset.destination = destination;

  const header = document.createElement('div');
  header.className = 'connection-header';
  header.innerHTML = `<span class="connection-destination led-text-white">${destination}</span>`;
  section.appendChild(header);

  connections.forEach((conn) => {
    const countdown = getCountdown(conn.from.departure);
    if (countdown.totalSecs <= 0) return;

    const row = document.createElement('div');
    row.className = 'connection-row';

    const depTime = formatTime(conn.from.departure);
    const duration = parseDuration(conn.duration);

    const transport = getFirstTransportSection(conn);
    const badgeClass = transport
      ? CONFIG.categoryClasses[transport.category] || 'line-badge--default'
      : 'line-badge--default';
    const badgeHtml = transport
      ? `<span class="line-badge line-badge--sm ${badgeClass}">${transport.category} ${transport.number}</span>`
      : '';

    const minuteClass =
      countdown.mins < 3 ? 'minutes--imminent' : countdown.mins <= 5 ? 'minutes--soon' : '';

    row.dataset.departure = conn.from.departure;
    row.innerHTML = `
      <div class="conn-badge">${badgeHtml}</div>
      <div class="conn-depart led-text">${depTime}</div>
      <div class="conn-minutes led-text ${minuteClass}">${countdown.text}</div>
      <div class="conn-duration led-text-dim">${duration}</div>
    `;

    section.appendChild(row);
  });

  return section;
}

export function appendConnection(data, container) {
  // Remove loading message if present
  const loading = container.querySelector('.connections-loading');
  if (loading) loading.remove();

  // Replace existing section for same destination, or append
  const existing = container.querySelector(`[data-destination="${data.destination}"]`);
  const section = renderSection(data);
  if (existing) {
    existing.replaceWith(section);
  } else {
    container.appendChild(section);
  }
}

export function renderConnections(allConnections, container) {
  container.innerHTML = '';
  allConnections.forEach((data) => container.appendChild(renderSection(data)));
}

export function updateConnectionCountdowns(container) {
  container.querySelectorAll('.connection-row').forEach((row) => {
    const dep = row.dataset.departure;
    if (!dep) return;
    const countdown = getCountdown(dep);
    if (countdown.totalSecs <= 0) {
      row.remove();
      return;
    }
    const minEl = row.querySelector('.conn-minutes');
    if (minEl) {
      minEl.textContent = countdown.text;
      minEl.className = `conn-minutes led-text ${
        countdown.mins < 3 ? 'minutes--imminent' : countdown.mins <= 5 ? 'minutes--soon' : ''
      }`;
    }
  });
}

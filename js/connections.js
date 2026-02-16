import { CONFIG } from './config.js';
import { formatTime, getCountdown } from './clock.js';

function getFirstTransport(conn) {
  const s = conn.sections?.find((s) => s.journey);
  return s ? { category: s.journey.category, number: s.journey.number } : null;
}

function badgeStyle(category, number) {
  const color = CONFIG.lineColors?.[`${category}${number}`];
  return color ? ` style="background:${color}"` : '';
}

function renderSection({ destination, connections }) {
  const section = document.createElement('div');
  section.className = 'connection-section';
  section.dataset.destination = destination;

  const header = document.createElement('div');
  header.className = 'connection-header';
  header.innerHTML = `<span class="connection-destination led-text-white">${destination}</span>`;
  section.appendChild(header);

  for (const conn of connections) {
    const countdown = getCountdown(conn.from.departure);
    if (countdown.totalSecs <= 0) continue;

    const transport = getFirstTransport(conn);
    const badgeClass = transport
      ? CONFIG.categoryClasses[transport.category] || 'line-badge--default'
      : 'line-badge--default';
    const style = transport ? badgeStyle(transport.category, transport.number) : '';
    const icon = transport ? CONFIG.categoryIcons[transport.category] || 'ph-path' : '';
    const badgeHtml = transport
      ? `<span class="line-badge line-badge--sm ${badgeClass}"${style}><i class="ph-bold ${icon} line-icon"></i> ${transport.number}</span>`
      : '';
    const minuteClass = countdown.mins < 3 ? 'minutes--imminent' : countdown.mins <= 5 ? 'minutes--soon' : '';
    const arrivalHtml = conn.to?.arrival ? formatTime(conn.to.arrival) : '';

    const row = document.createElement('div');
    row.className = 'connection-row';
    row.dataset.departure = conn.from.departure;
    row.innerHTML = `
      <div class="conn-badge">${badgeHtml}</div>
      <div class="conn-depart led-text">${formatTime(conn.from.departure)}</div>
      <div class="conn-minutes led-text ${minuteClass}">${countdown.text}</div>
      <div class="conn-arrive led-text-dim">${arrivalHtml}</div>
    `;
    section.appendChild(row);
  }

  return section;
}

export function appendConnection(data, container) {
  const loading = container.querySelector('.connections-loading');
  if (loading) loading.remove();

  const existing = container.querySelector(`[data-destination="${data.destination}"]`);
  const section = renderSection(data);
  if (existing) existing.replaceWith(section);
  else container.appendChild(section);
}

export function updateConnectionCountdowns(container) {
  for (const row of container.querySelectorAll('.connection-row')) {
    const dep = row.dataset.departure;
    if (!dep) continue;
    const countdown = getCountdown(dep);
    if (countdown.totalSecs <= 0) { row.remove(); continue; }
    const el = row.querySelector('.conn-minutes');
    if (el) {
      el.textContent = countdown.text;
      el.className = `conn-minutes led-text ${countdown.mins < 3 ? 'minutes--imminent' : countdown.mins <= 5 ? 'minutes--soon' : ''}`;
    }
  }
}

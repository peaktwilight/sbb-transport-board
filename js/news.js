import { CONFIG } from './config.js';

const BADGE_COLORS = {
  SWISSINFO: '#e2001a',
  SRF: '#c82828',
  Guardian: '#052962',
  Reuters: '#ffffff',
  'HACKER NEWS': '#ff6000',
  TechCrunch: '#0a9e01',
  'LE NEWS': '#1b5e20',
  'FINTECH CH': '#00b4d8',
  'NEW YORK TIMES': '#ffffff',
  'LOCAL (CH)': '#6b3a2a',
  NASA: '#0b3d91',
  SCIENCEDAILY: '#2e7d32',
  'ARS TECHNICA': '#ff4e00',
};

let cachedHeadlines = [];

async function fetchFeed(feed) {
  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  try {
    const res = await fetch(rss2jsonUrl);
    if (!res.ok) throw new Error(`rss2json ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok' || !data.items) throw new Error('rss2json bad response');
    return data.items.slice(0, CONFIG.news.itemsPerFeed).map((item) => {
      let title = (item.title || '').replace(/\s*-\s*(Reuters|TechCrunch)$/i, '');
      if (title.length > CONFIG.news.maxTitleLength) {
        title = title.slice(0, CONFIG.news.maxTitleLength - 1) + '\u2026';
      }
      const pubDate = item.pubDate ? new Date(item.pubDate).getTime() : 0;
      return { label: feed.label, title, pubDate };
    });
  } catch {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(feed.url)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) return [];
      const xml = await res.text();
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      const items = doc.querySelectorAll('item');
      const results = [];
      for (let i = 0; i < Math.min(items.length, CONFIG.news.itemsPerFeed); i++) {
        let title = items[i].querySelector('title')?.textContent || '';
        if (title.length > CONFIG.news.maxTitleLength) {
          title = title.slice(0, CONFIG.news.maxTitleLength - 1) + '\u2026';
        }
        const pubStr = items[i].querySelector('pubDate')?.textContent;
        const pubDate = pubStr ? new Date(pubStr).getTime() : 0;
        results.push({ label: feed.label, title, pubDate });
      }
      return results;
    } catch {
      return [];
    }
  }
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchNews() {
  try {
    const results = [];
    for (const feed of CONFIG.news.feeds) {
      results.push(await fetchFeed(feed));
      await delay(300);
    }
    const all = results.flat().filter((h) => h.title);
    all.sort((a, b) => b.pubDate - a.pubDate);
    if (all.length) cachedHeadlines = all;
  } catch (err) {
    console.warn('News fetch failed:', err);
  }
}

function timeAgo(ts) {
  if (!ts) return '';
  const mins = Math.floor((Date.now() - ts) / 60_000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function renderNewsScreen(container) {
  container.innerHTML = '';
  if (!cachedHeadlines.length) {
    container.innerHTML = '<div class="news-loading led-text">Loading headlines\u2026</div>';
    return;
  }
  cachedHeadlines.forEach((h, i) => {
    const color = BADGE_COLORS[h.label] || '#555';
    const isLight = ['Reuters', 'NEW YORK TIMES'].includes(h.label);
    const ago = timeAgo(h.pubDate);
    const row = document.createElement('div');
    row.className = 'news-row';
    row.style.setProperty('--i', i);
    row.innerHTML = `
      <div class="news-source"><span class="news-badge" style="background:${color}${isLight ? ';color:#111' : ''}">${h.label}</span></div>
      <div class="news-headline led-text">${h.title}</div>
      <div class="news-time led-text-dim">${ago}</div>
    `;
    container.appendChild(row);
  });
}

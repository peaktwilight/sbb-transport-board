import { CONFIG } from './config.js';

const SHAME_MESSAGES = [
  (side) => `KITCHEN SHAME ALERT: The ${side} side kitchen is a disaster zone. Clean up, people.`,
  (side) => `Someone from the ${side} side forgot what a sponge looks like. Again.`,
  (side) => `The ${side} kitchen just filed a complaint with the WG council. Please clean.`,
  (side) => `Breaking news: ${side} side kitchen declared uninhabitable. Immediate action required.`,
  (side) => `PSA from the departure board: ${side} kitchen needs attention. You know who you are.`,
  (side) => `The ${side} side dishes are growing their own ecosystem. Science is cool but please clean.`,
  (side) => `ALERT: ${side} kitchen status = CRITICAL. This is not a drill.`,
  (side) => `Friendly reminder that the ${side} kitchen won't clean itself. Unfriendly reminder incoming if ignored.`,
  (side) => `The Witelli board has detected a hygiene anomaly on the ${side} side. Deploying shame protocol.`,
  (side) => `${side} side: the kitchen fairy called in sick. You're on your own.`,
  (side) => `Whoever left the ${side} kitchen like that... the board sees everything.`,
  (side) => `${side} kitchen cleanliness score: 0/10. The board is disappointed.`,
];

let audio = null;
let lastShameTime = 0;

function getShameMessage(side) {
  const msg = SHAME_MESSAGES[Math.floor(Math.random() * SHAME_MESSAGES.length)];
  return msg(side);
}

function playAudio() {
  if (!audio) {
    audio = new Audio('audio/kitchen-shame.mp3');
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

async function sendWhatsApp(message) {
  const { wahaUrl, wahaApiKey, wahaSession, groupId } = CONFIG.kitchen;
  if (!groupId) {
    console.warn('Kitchen shame: no WhatsApp group ID configured');
    return false;
  }
  try {
    const res = await fetch(`${wahaUrl}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': wahaApiKey,
      },
      body: JSON.stringify({
        session: wahaSession,
        chatId: groupId,
        text: message,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Kitchen shame WhatsApp failed:', err);
    return false;
  }
}

async function sendAudioWhatsApp() {
  const { wahaUrl, wahaApiKey, wahaSession, groupId } = CONFIG.kitchen;
  if (!groupId) return false;
  try {
    // Send audio file as voice message
    const audioUrl = `${location.origin}/audio/kitchen-shame.mp3`;
    const res = await fetch(`${wahaUrl}/api/sendFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': wahaApiKey,
      },
      body: JSON.stringify({
        session: wahaSession,
        chatId: groupId,
        file: { url: audioUrl },
        caption: 'KITCHEN SHAME SOUNDTRACK',
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function initKitchenShame() {
  const btn = document.getElementById('kitchen-shame-btn');
  const panel = document.getElementById('kitchen-panel');
  const status = document.getElementById('kitchen-status');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    panel.classList.toggle('kitchen-panel--open');
  });

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove('kitchen-panel--open');
    }
  });

  for (const side of CONFIG.kitchen.sides) {
    const sideBtn = document.createElement('button');
    sideBtn.className = 'kitchen-side-btn';
    sideBtn.textContent = `${side} side`;
    sideBtn.addEventListener('click', () => triggerShame(side, status, panel));
    panel.querySelector('.kitchen-sides').appendChild(sideBtn);
  }
}

async function triggerShame(side, statusEl, panel) {
  const now = Date.now();
  if (now - lastShameTime < CONFIG.kitchen.cooldown) {
    const remaining = Math.ceil((CONFIG.kitchen.cooldown - (now - lastShameTime)) / 1000);
    statusEl.textContent = `Cooldown: ${remaining}s`;
    statusEl.className = 'kitchen-status kitchen-status--cooldown';
    return;
  }

  lastShameTime = now;
  statusEl.textContent = 'Shaming...';
  statusEl.className = 'kitchen-status kitchen-status--sending';

  // Play audio locally
  playAudio();

  // Send WhatsApp message + audio
  const message = getShameMessage(side);
  const [textOk, audioOk] = await Promise.all([
    sendWhatsApp(message),
    sendAudioWhatsApp(),
  ]);

  if (textOk) {
    statusEl.textContent = 'Shame sent!';
    statusEl.className = 'kitchen-status kitchen-status--success';
  } else if (!CONFIG.kitchen.groupId) {
    statusEl.textContent = 'Audio only (no group ID)';
    statusEl.className = 'kitchen-status kitchen-status--warn';
  } else {
    statusEl.textContent = 'Send failed';
    statusEl.className = 'kitchen-status kitchen-status--error';
  }

  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = 'kitchen-status';
    panel.classList.remove('kitchen-panel--open');
  }, 3000);
}

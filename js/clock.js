export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
}

export function getCountdown(isoString) {
  const departure = new Date(isoString);
  const now = new Date();
  const diffMs = Math.max(0, departure - now);
  const totalSecs = Math.floor(diffMs / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return { mins, secs, totalSecs, text: `${mins}:${String(secs).padStart(2, '0')}` };
}

export function startClock(element) {
  function update() {
    const now = new Date();
    element.textContent = now.toLocaleTimeString('de-CH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  update();
  return setInterval(update, 1000);
}

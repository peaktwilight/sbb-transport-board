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

export function startClock(element, dayElement, dateElement) {
  const pad2 = (n) => String(n).padStart(2, '0');
  const pad3 = (n) => String(n).padStart(3, '0');
  let lastDate = '';
  function update() {
    const now = new Date();
    element.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}.${pad3(now.getMilliseconds())}`;
    if (dayElement && dateElement) {
      const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      if (dateStr !== lastDate) {
        dayElement.textContent = now.toLocaleDateString('en-GB', { weekday: 'long' });
        dateElement.textContent = dateStr;
        lastDate = dateStr;
      }
    }
  }
  update();
  return setInterval(update, 37);
}

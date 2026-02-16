const TIPS = [
  'Walk to Balgrist stop: ~4 minutes',
  'Tram 4 goes directly to Zurich HB',
  'Tram 18 connects to Stadelhofen for S-Bahn trains',
  'Bus 77 takes you to Hegibachplatz',
  'Bus 99 goes to Zollikon',
];

const MORNING = [
  'Good morning! Have a great day',
  'Rise and shine, Witelli crew',
  'Don\'t forget your umbrella... just in case',
  'Pro tip: coffee first, then tram',
];

const AFTERNOON = [
  'Hope your day is going well!',
  'Afternoon vibes at Witelli 20',
  'Maybe grab a snack on the way home?',
];

const EVENING = [
  'Bon appetit! Enjoy your dinner',
  'Time to relax, you\'ve earned it',
  'Movie night at Witelli?',
  'Hope you had a great day!',
];

const NIGHT = [
  'Good night, sleep well!',
  'Sweet dreams, Witelli fam',
  'Nighty night! Tomorrow is a new day',
];

const WEEKEND = [
  'Happy weekend! No rush today',
  'Weekend plans? The lake is always a good idea',
  'Brunch time? Zurich has great spots',
];

const WEATHER_NICE = [
  'Beautiful weather outside — go for a walk!',
  'Sun is out! Perfect for a stroll by the lake',
  'Too nice to stay inside, enjoy the day!',
];

const WEATHER_COLD = [
  'Bundle up, it\'s chilly out there!',
  'Hot chocolate weather today',
];

const WEATHER_RAIN = [
  'Don\'t forget your umbrella today!',
  'Rainy day... perfect for staying cozy',
];

const WEATHER_SNOW = [
  'Snow day! Watch your step outside',
  'It\'s snowing! Winter wonderland vibes',
];

function getTimeOfDayMessages() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return MORNING;
  if (hour >= 11 && hour < 17) return AFTERNOON;
  if (hour >= 17 && hour < 22) return EVENING;
  return NIGHT;
}

function getWeatherMessages(weatherCode, temp) {
  if (weatherCode === null) return [];
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return WEATHER_SNOW;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode)) return WEATHER_RAIN;
  if (temp !== null && temp < 5) return WEATHER_COLD;
  if ([0, 1, 2].includes(weatherCode) && temp !== null && temp > 15) return WEATHER_NICE;
  return [];
}

function isWeekend() {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

function pick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function buildTicker(element, weatherCode, temp) {
  const messages = [...TIPS];

  messages.push(...pick(getTimeOfDayMessages(), 2));

  const weatherMsgs = getWeatherMessages(weatherCode, temp);
  if (weatherMsgs.length) messages.push(...pick(weatherMsgs, 1));

  if (isWeekend()) messages.push(...pick(WEEKEND, 1));

  // Shuffle for variety
  const selected = messages.sort(() => Math.random() - 0.5);

  // Build HTML: duplicate for seamless loop
  const html = selected
    .map((msg) => `<span>${msg}</span><span class="ticker-sep">///</span>`)
    .join('');

  element.innerHTML = html + html;
}

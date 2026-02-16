import { currentWeatherCode, currentTemp, currentFeelsLike, currentWind } from './weather.js';

const WEATHER_ICONS = {
  0: 'ph-sun', 1: 'ph-sun', 2: 'ph-cloud-sun', 3: 'ph-cloud',
  45: 'ph-cloud-fog', 48: 'ph-cloud-fog',
  51: 'ph-cloud-rain', 53: 'ph-cloud-rain', 55: 'ph-cloud-rain',
  61: 'ph-cloud-rain', 63: 'ph-cloud-rain', 65: 'ph-cloud-rain',
  71: 'ph-snowflake', 73: 'ph-snowflake', 75: 'ph-snowflake', 77: 'ph-snowflake',
  80: 'ph-cloud-rain', 81: 'ph-cloud-rain', 82: 'ph-cloud-rain',
  85: 'ph-snowflake', 86: 'ph-snowflake',
  95: 'ph-cloud-lightning', 96: 'ph-cloud-lightning', 99: 'ph-cloud-lightning',
};

const WEATHER_DESC = {
  0: 'Clear skies', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snowing', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Showers', 81: 'Rain showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Severe storm',
};

// ---- Weather-reactive commentary ----

const WEATHER_MSGS = {
  nice: [
    'The sun showed up and so should you',
    'Zürichsee is literally sparkling rn. Go look at it',
    'Ice cream weather. This is not a debate',
    'UV index doesn\'t care about your plans. Sunscreen up',
    'Vitamin D is free today. Go collect some',
    'Perfect Letten day if you\'re feeling brave',
    'Golden hour is gonna hit different today',
    'Reminder: the lake is free and the vibes are priceless',
  ],
  hot: [
    'It\'s giving summer. Hydrate or diedrate',
    'This is your sign to buy a watermelon',
    'Too hot to function. Valid excuse for everything',
    'The tram has AC. The walk to the tram does not',
    'Shorts weather. No further questions',
  ],
  cold: [
    'You better might wanna get some gloves :)',
    'Fondue weather. Mandatory, not optional',
    'Your future self says: bring a scarf. And a jacket. And maybe a blanket',
    'Hot choco season is upon us',
    'The cold never bothered me anyway... jk',
    'Glühwein o\'clock',
    'It\'s cold outside, so layer up or suffer. Your choice',
  ],
  freezing: [
    'It\'s literally freezing. Like, actually below 0',
    'Your phone battery hates this weather as much as you do',
    'If you go outside, your face will hurt. That\'s normal',
    'The tram heater is your best friend today',
  ],
  rain: [
    'Umbrella check before you leave. You\'re welcome',
    'Wet socks are a vibe. A terrible, terrible vibe',
    'The ducks at the lake are absolutely thriving rn',
    'Rain jacket w cap> umbrella. Hill I will die on',
    'Pro tip: puddles are deeper than they look',
    'Cozy inside day? Cozy inside day',
    'The sound of rain on the Witelli roof >>> ',
  ],
  storm: [
    'Thunder and lightning, very very frightening',
    'Maybe don\'t stand under trees today',
    'Nature is having a moment. Let her',
    'The sky said "hold my beer"',
  ],
  snow: [
    'IT\'S SNOWING. Everyone lose their minds appropriately',
    'Snowball fight on the rooftop terrace? Just a thought',
    'Uetliberg with snow is actual magic. Go see it',
    'Watch your step. The sidewalk is secretly an ice rink',
    'The world looks prettier in white tbh',
    'Build a snowman or regret it forever',
  ],
  fog: [
    'Can\'t see Uetliberg. Can\'t see the lake. Can\'t see anything tbh',
    'Silent Hill vibes today',
    'The fog makes everything feel like a movie scene',
    'Visibility: vibes only',
  ],
  overcast: [
    'The sky is giving absolutely nothing today',
    'Grey skies, warm hearts. Or whatever',
    'Perfect "stay in bed 5 more minutes" weather',
    'The sun is on a break. Relatable honestly',
  ],
};

// ---- Time of day ----

const MORNING_MSGS = [
  'Good morning Witelli crew',
  'First: coffee (or tea Adam), everything else after',
  'Your bed misses you already. Stay strong',
  'Step 1: leave bed. Step 2: ???',
  'Did you actually set your alarm or just got lucky?',
  'Don\'t forget your keys. Seriously. Check again',
  'Morning person or just awake? There\'s a difference',
  'Alexa, give me motivation. Alexa? ALEXA??',
];

const AFTERNOON_MSGS = [
  'Is it too early for another coffee? (no)',
  'That post-lunch energy dip hits different',
  'Friendly reminder to drink water. Your organs are begging',
  'Have you stretched today? Your back is writing a complaint',
  'Hope your day is going well. If not, there\'s always cheese',
  'Power nap window closing in 3... 2... 1...',
  'You\'re doing great. Probably. I\'m a departure board, not a therapist',
  'Afternoon slump is just your body\'s screensaver kicking in',
];

const EVENING_MSGS = [
  'What\'s for dinner tonight? And no, cereal doesn\'t count',
  'So uhhh, did you clean the kitchen?',
  'WG dinner hits different when everyone\'s home',
  'The fridge is judging your leftovers. Eat them or free them',
  'Whoever is cooking tonight... u r a legend',
  'Golden hour at the Zürichsee right now, just saying',
  'Couch or productivity? We both know the answer',
  'Evening plans: exist on the couch. Execute flawlessly',
];

const NIGHT_MSGS = [
  'The city sleeps, and so should you',
  'Still awake? Respect. Or questionable life choices. Both valid',
  'You\'ll regret staying up this late. Tomorrow-you sends regards',
  'One more episode? That\'s what you said 3 episodes ago',
  'Tomorrow-you will be grateful if you sleep now',
  'The WiFi is still on but your brain should be off',
  'Fun fact: sleep is free. And you\'re not using it. Weird',
  'Your alarm clock is already dreading tomorrow',
  'It\'s past midnight and you\'re looking at a departure board. Respect',
];

// ---- Day of week ----

const DAY_MSGS = {
  1: [
    'Bruhhh it\'s Monday again :\')',
    'Monday motivation: only 4 more days of this',
    'New week, new chances to miss the tram',
    'Another Monday, another chance to pretend you\'re a morning person',
    'If Monday was a tram, it would be delayed. And crowded',
    'The week is fresh, the coffee better be too',
    'Monday energy: loading... loading... 404 not found',
  ],
  2: [
    'Tuesday: Monday\'s less annoying sibling',
    'It\'s only Tuesday?? fuckkkk',
    'At least it\'s not Monday anymore. Small wins',
    'Tuesday hack: pretend it\'s already Wednesday. Nobody will notice',
  ],
  3: [
    'It\'s Wednesdayy we made it halfway aaAAaAAAaAAAAA',
    'Wednesday is proof you survived Monday and Tuesday',
    'Peak of the week. It\'s all downhill from here',
    'Hump day! Don\'t ask why it\'s called that',
  ],
  4: [
    'Almost Friday... almost... ALMOST...',
    'Tomorrow is Friday. Let that sink in. (insert elon meme here)',
    'You can almost taste the weekend from here',
    'One more day. ONE. MORE. DAY',
  ],
  5: [
    'IT\'S FRIDAY. ACT ACCORDINGLY',
    'Weekend loading... 99% ... 99% ... still 99%',
    'Friday night at Witelli? Say less',
    'You survived another week. That genuinely deserves celebration',
    'Friday vibes: everything is possible again',
    'The weekend doesn\'t start itself. Actually wait, it does',
  ],
  6: [
    'Happy Saturday! No alarms, no stress, no problems',
    'Socially acceptable to do absolutely nothing today',
    'The lake is free. Go touch grass. Then touch water',
    'Saturday brunch is not optional, it\'s a lifestyle choice',
    'Sleep in. You earned it. (even if you didn\'t)',
    'Netflix and chill. Or just chill. Your choice',
  ],
  0: [
    'Everything is closed and honestly that\'s a blessing',
    'The only plans today should be no plans',
    'Make the most of today. Monday has zero chill',
    'Pro tip: start nothing you can\'t finish before Monday',
    'Enjoy the quiet before the weekly chaos resumes',
  ],
};

// ---- Quotes & fun ----

const QUOTES = [
  '"The only way to do great work is to love what you do" — Steve Jobs probably didn\'t take the tram',
  '"Life is what happens when you\'re busy checking the departure board" — John Lennon, adapted',
  '"In the middle of difficulty lies opportunity" — Einstein, who also lived in Switzerland btw',
  '"Stay hungry, stay foolish" — good advice unless the Migros is closed',
  '"Not all those who wander are lost" — but check Google Maps anyway',
  '"The journey of a thousand miles begins with a single tram ride" — Lao Tzu, probably',
  '"To be or not to be" — Shakespeare, deciding whether to catch the tram or wait for the next one',
  '"I think, therefore I am... running late" — Descartes, adapted for Zürich',
  '"It does not do to dwell on dreams and forget to live" — Dumbledore knew about WG life',
];

const EASTER_EGGS = [
  'Made with \u2665 for the best WG in Zürich',
  'Witelli 20 > every other WG. Facts. Don\'t @ me',
  'If you\'re reading this, you\'re beautiful. And probably procrastinating',
  'This board runs on vibes, JavaScript, and a questionable amount of API calls',
  'If the tram is late, it\'s character development',
  'Remember to call your mom. She\'s wondering about you',
  'Certified WG moment\u2122',
  'Top secret info: you can ask Doruk for free laundry',
  'The Witelli rooftop at sunset > your Instagram feed',
  'Spaghetti again? Respect the hustle. Embrace the carbs',
  'Plot twist: you\'re not late, you\'re fashionably on time',
  'This departure board has more personality than most people at ETH',
  'Somewhere out there, a SBB conductor is checking tickets. Stay safe',
  'Your rent is due but your vibes are priceless',
  'The recycling doesn\'t take itself out. Looking at you',
  'Whoever invented the Halbtax deserves a Nobel Prize',
  'Lecture at 8am was a choice. A bad one, but a choice',
  'I\'ve been running for hours straight. Where\'s MY coffee?',
  'Whoever left dishes in the sink... the sink remembers',
  'The shower drain is not going to unclog itself',
  'Life is short. The wait for the tram is not',
];

// ---- Pool builder ----

function getWeatherCategory() {
  if (currentWeatherCode === null) return null;
  if ([95, 96, 99].includes(currentWeatherCode)) return 'storm';
  if ([71, 73, 75, 77, 85, 86].includes(currentWeatherCode)) return 'snow';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(currentWeatherCode)) return 'rain';
  if ([45, 48].includes(currentWeatherCode)) return 'fog';
  if (currentWeatherCode === 3) return 'overcast';
  if (currentTemp !== null && currentTemp <= -2) return 'freezing';
  if (currentTemp !== null && currentTemp < 5) return 'cold';
  if (currentTemp !== null && currentTemp > 28) return 'hot';
  if ([0, 1, 2].includes(currentWeatherCode) && currentTemp !== null && currentTemp > 15) return 'nice';
  return null;
}

function getPool() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const pool = [];

  if (hour >= 5 && hour < 11) pool.push(...MORNING_MSGS);
  else if (hour >= 11 && hour < 17) pool.push(...AFTERNOON_MSGS);
  else if (hour >= 17 && hour < 22) pool.push(...EVENING_MSGS);
  else pool.push(...NIGHT_MSGS);

  if (DAY_MSGS[day]) pool.push(...DAY_MSGS[day]);

  const weatherCat = getWeatherCategory();
  if (weatherCat && WEATHER_MSGS[weatherCat]) pool.push(...WEATHER_MSGS[weatherCat]);

  pool.push(...QUOTES);
  pool.push(...EASTER_EGGS);
  return pool;
}

let lastMessage = '';

function pickMessage() {
  const pool = getPool();
  let msg;
  do { msg = pool[Math.floor(Math.random() * pool.length)]; } while (msg === lastMessage && pool.length > 1);
  lastMessage = msg;
  return msg;
}

export function updateInfoScreen(weatherEl, dateEl, messageEl) {
  if (currentWeatherCode !== null && currentTemp !== null) {
    const icon = WEATHER_ICONS[currentWeatherCode] || 'ph-thermometer';
    const desc = WEATHER_DESC[currentWeatherCode] || '';
    const detailParts = [];
    if (currentFeelsLike !== null) detailParts.push(`Feels ${currentFeelsLike}°`);
    if (currentWind !== null) detailParts.push(`Wind ${currentWind} km/h`);
    weatherEl.innerHTML = `
      <i class="ph-bold ${icon} info-weather-icon"></i>
      <span class="info-temp led-text">${currentTemp}°C</span>
      <span class="info-desc led-text-dim">${desc}</span>
      ${detailParts.length ? `<span class="info-weather-detail">${detailParts.join(' · ')}</span>` : ''}
    `;
  }

  const now = new Date();
  const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  dateEl.innerHTML = `<span class="info-day">${day}</span><span class="info-full-date">${date}</span>`;

  messageEl.textContent = pickMessage();
}

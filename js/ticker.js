import { getTodaysBirthdays, getBirthdayTickerMessages } from './birthday.js';

const ALWAYS = [
  'Walk to Balgrist stop: ~4 min (1 min if you\'re feeling lucky and wanna sprint)',
  'Made with \u2665 for the best WG in Zürich',
];

const MORNING = [
  'Good morning! Have a great day',
  'Rise and shine, Witelli crew',
  'Pro tip: coffee first, then tram',
  'Don\'t forget your keys!',
  'You woke up today, that\'s already a W',
  'The tram waits for no one',
  'Did you actually set your alarm or just got lucky?',
  'Step 1: leave bed. Step 2: everything else',
  'Your bed misses you already. Stay strong',
  'Shower thoughts are free but hot water isn\'t... be quick',
];

const AFTERNOON = [
  'Hope your day is going well!',
  'Maybe grab a snack on the way home?',
  'Is it too early for another coffee? Never',
  'Friendly reminder to drink water',
  'That post-lunch energy dip hits different',
  'Have you stretched today? Your back will thank you',
  'Power nap window closing in 3... 2... 1...',
];

const EVENING = [
  'Bon appetit! Enjoy your dinner',
  'What\'s for dinner tonight?',
  'Couch or productivity? We both know the answer',
  'The couch is calling your name',
  'Who\'s doing the dishes tonight? Not it',
  'WG dinner hits different when everyone\'s home',
  'The fridge is judging your leftovers',
  'Whoever is cooking tonight... thank you in advance',
  'Golden hour at the Zürichsee right now, just saying',
];

const NIGHT = [
  'Good night, sleep well!',
  'Sweet dreams, Witelli fam',
  'The city sleeps, and so should you',
  'Still awake? Respect. Or questionable life choices',
  'Late night snack run? The Migros is closed btw',
  'You\'ll regret staying up this late tomorrow',
  'The last tram left a while ago... you\'re walking',
  'One more episode? That\'s what you said 3 episodes ago',
  'The WiFi is still on but your brain should be off',
  'Tomorrow-you will be grateful if you sleep now',
];

const MONDAY = [
  'Bruhhh it\'s Monday again :\')',
  'Monday motivation: only 4 days until Friday',
  'Mondays are just Sunday\'s evil twin',
  'New week, new chances to miss the tram',
  'Monday called. Nobody picked up',
  'The week is fresh, the coffee better be too',
  'Monday tip: lower your expectations and you can\'t be disappointed',
  'If Monday was a tram, it would be delayed',
  'Another Monday, another chance to pretend you\'re a morning person',
];

const TUESDAY = [
  'Tuesday: Monday\'s less annoying sibling',
  'It\'s only Tuesday? This week is moving in slow motion',
  'Tuesday energy: not great, not terrible',
  'At least it\'s not Monday anymore',
  'Tuesday: too early to think about the weekend, too late to complain about Monday',
  'The week just started and you already deserve a break',
  'Tuesday hack: pretend it\'s already Wednesday',
  'Happy Tuesday, the most forgettable day of the week',
];

const WEDNESDAY = [
  'It\'s Wednesday my dudes',
  'Hump day! Downhill from here',
  'Halfway through the week, keep pushing',
  'Wednesday: close enough to the weekend to start dreaming',
  'The middle of the week, the middle of the grind',
  'Wednesday is proof you survived Monday and Tuesday',
  'If the week was a mountain, you\'re at the top. It\'s all downhill now',
  'Wednesday: when you start counting down to Friday',
];

const THURSDAY = [
  'Thursday: Friday\'s opening act',
  'Almost Friday... almost...',
  'Thursday night plans? Langstrasse is calling',
  'One more day. You can do this',
  'Thursday: the Friday of pretending it\'s already the weekend',
  'Tomorrow is Friday. Let that sink in',
  'Thursday: the light at the end of the tunnel is getting brighter',
  'You can almost taste the weekend from here',
  'Thursday energy: 80% weekend anticipation, 20% actual work',
];

const FRIDAY = [
  'It\'s Friday! You made it!',
  'Friday energy: unmatched',
  'Weekend loading... 99%',
  'Friday night at Witelli? Say less',
  'The weekend starts NOW (almost)',
  'Friday: the day your motivation clocks out early',
  'You survived another week. That deserves celebration',
  'Friday vibes: everything is possible again',
  'Friday afternoon: the longest 3 hours of the week',
  'Cheers to making it through another one',
];

const SATURDAY = [
  'Happy Saturday! No alarms, no stress',
  'No lectures today, just vibes',
  'Saturday brunch is not optional, it\'s a lifestyle',
  'The lake is free. Go touch it',
  'Flea market at Kanzlei? You never know what you\'ll find',
  'Farmers market at Bürkliplatz? Fresh bread hits different',
  'Üetliberg hike? Or is the couch calling louder?',
  'Saturday cleaning day? Or pretend you didn\'t see this',
  'Socially acceptable to do nothing today',
  'Saturday: the day you planned to be productive but chose peace instead',
  'The city is yours today, go explore',
];

const SUNDAY = [
  'Happy Sunday! Recharge day',
  'Everything is closed and that\'s okay',
  'Sunday cooking session? The kitchen is yours',
  'Meal prep Sunday or order food? No judgment either way',
  'Enjoy the quiet. Monday is coming',
  'Sunday stroll through the old town? Always a vibe',
  'Perfect day to do laundry. Or not. Your call',
  'The only plans today should be no plans',
  'Sunday: the day of rest, snacks, and denial that tomorrow is Monday',
  'Make the most of today, Monday doesn\'t care about your feelings',
  'Pro tip: start nothing you can\'t finish before Monday',
];

const WEATHER_NICE = [
  'Beautiful weather today — go for a walk!',
  'Perfect for a stroll by the lake',
  'Too nice to stay inside today',
  'Sunglasses weather today',
  'The Zürichsee is sparkling today, go see it',
  'Ice cream weather? Ice cream weather',
  'Perfect day for the Letten',
  'Vitamin D is free today. Go collect some',
];

const WEATHER_COLD = [
  'Bundle up today, it\'s chilly out there!',
  'Hot chocolate weather today',
  'Maybe today is a good day for fondue',
  'It\'s giving winter. Dress accordingly',
  'Your future self says: bring a scarf',
  'Cold hands, warm heart. Still bring gloves though',
  'Glühwein season? Glühwein season',
  'The tram shelter is your best friend today',
];

const WEATHER_RAIN = [
  'Don\'t forget your umbrella today!',
  'Rainy day... perfect for staying cozy',
  'Grab your rain jacket before heading out',
  'Rain check on outdoor plans? Literally',
  'Wet socks are a vibe. A terrible, terrible vibe',
  'Perfect excuse to stay in today',
  'The ducks at the lake are thriving though',
];

const WEATHER_SNOW = [
  'Snow day! Watch your step outside today',
  'It\'s snowing! Winter wonderland vibes',
  'Careful on the sidewalks today, it\'s slippery',
  'Snowball fight on the Witelli rooftop? Just a thought',
  'The world looks prettier in white, enjoy it',
  'Uetliberg with snow? Magical. Go see it',
];

const EASTER_EGGS = [
  'If you\'re reading this, you\'re beautiful',
  'This board runs on vibes and JavaScript',
  'Error 404: boring messages not found',
  'Witelli 20 > every other WG. Facts',
  'The secret ingredient is always cheese. Always',
  'If the tram is late, it\'s character development',
  'Zürich tip: always have a Halbtax',
  'Today\'s mood: sponsored by public transport',
  'Plot twist: you\'re not late, you\'re fashionably on time',
  'Somewhere, a SBB conductor is checking tickets. Stay safe',
  'Witelli 20: where legends live and laundry never ends',
  'This ticker runs 24/7 so you don\'t have to',
  'You just lost The Game. Sorry not sorry',
  'Certified WG moment',
  'Remember to call your mom',
  'Friendly PSA: clean the kitchen. You know who you are',
  'WG rule #1: whoever finishes the milk buys new milk',
  'This is your sign to go outside',
  'The tram driver waved at you? You\'re the chosen one',
  'Top secret info: you can ask Doruk for free laundry',
  'The Witelli rooftop at sunset > everything',
  'Someone left their stuff in the dryer again...',
  'Reminder: the recycling doesn\'t take itself out',
  'WG meeting when? Check the group chat',
  'Whoever bought oat milk, you\'re a real one',
  'Spaghetti again? Respect the hustle',
];

const DAY_MESSAGES = {
  1: MONDAY,
  2: TUESDAY,
  3: WEDNESDAY,
  4: THURSDAY,
  5: FRIDAY,
  6: SATURDAY,
  0: SUNDAY,
};

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

function pick(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function buildTicker(element, weatherCode, temp, marketItems = []) {
  const messages = [...ALWAYS];

  messages.push(...pick(getTimeOfDayMessages(), 2));
  messages.push(...pick(DAY_MESSAGES[new Date().getDay()] || [], 3));
  messages.push(...pick(EASTER_EGGS, 2));

  const weatherMsgs = getWeatherMessages(weatherCode, temp);
  if (weatherMsgs.length) messages.push(...pick(weatherMsgs, 2));

  // Birthday messages
  const todayBirthdays = getTodaysBirthdays();
  if (todayBirthdays.length) messages.push(...getBirthdayTickerMessages(todayBirthdays));

  const selected = messages.sort(() => Math.random() - 0.5);

  // Intersperse market items among messages
  const combined = [];
  let mi = 0;
  for (const msg of selected) {
    combined.push(`<span>${msg}</span><span class="ticker-sep">///</span>`);
    if (mi < marketItems.length) {
      combined.push(`<span class="ticker-market">${marketItems[mi]}</span><span class="ticker-sep">///</span>`);
      mi++;
    }
  }
  // Add remaining market items
  while (mi < marketItems.length) {
    combined.push(`<span class="ticker-market">${marketItems[mi]}</span><span class="ticker-sep">///</span>`);
    mi++;
  }

  const html = combined.join('');
  element.innerHTML = html + html;
}

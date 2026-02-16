const ALWAYS = [
  'Walk to Balgrist stop: ~4 min (1 min if you\'re feeling lucky and wanna sprint)',
  'Made with \u2665 for the best WG in Zürich',
];

const MORNING = [
  'Good morning! Have a great day',
  'Rise and shine, Witelli crew',
  'Pro tip: coffee first, then tram',
  'Don\'t forget your keys!',
  'New day, new possibilities',
  'Breakfast is the most important meal... allegedly',
  'You woke up today, that\'s already a W',
  'Morning motivation: the tram waits for no one',
  'Did you actually set your alarm or just got lucky?',
  'Step 1: leave bed. Step 2: everything else',
  'Quick reminder: you\'re awesome. Now go catch that tram',
  'The early bird catches the tram. The late bird walks',
  'Shower thoughts are free but hot water isn\'t... be quick',
  'Your bed misses you already. Stay strong',
  'Today\'s forecast: 100% chance of being amazing',
];

const AFTERNOON = [
  'Hope your day is going well!',
  'Afternoon vibes at Witelli 20',
  'Maybe grab a snack on the way home?',
  'You\'re doing great, keep it up',
  'Halfway through the day, you got this',
  'Is it too early for a coffee? Never',
  'Friendly reminder to drink water',
  'Somewhere out there, a Migros has your Farmer bar waiting',
  'That post-lunch energy dip hits different',
  'Have you stretched today? Your back will thank you',
  'Fun fact: Balgrist literally means "bald ridge"',
  'The Mensa food was mid today, wasn\'t it',
  'Power nap window closing in 3... 2... 1...',
];

const EVENING = [
  'Bon appetit! Enjoy your dinner',
  'Time to relax, you\'ve earned it',
  'Movie night at Witelli?',
  'Hope you had a great day!',
  'What\'s for dinner tonight?',
  'Time to unwind and recharge',
  'Netflix or actually being productive? Choose wisely',
  'The couch is calling your name',
  'Hot take: cooking together > cooking alone',
  'Who\'s doing the dishes tonight? Not it',
  'Evening stroll along the lake? Just saying',
  'WG dinner hits different when everyone\'s home',
  'The fridge is judging your leftovers',
  'Whoever is cooking tonight... thank you in advance',
  'Golden hour at the Zürichsee right now, just saying',
];

const NIGHT = [
  'Good night, sleep well!',
  'Sweet dreams, Witelli fam',
  'Nighty night! Tomorrow is a new day',
  'The city sleeps, and so should you',
  'Still awake? Respect. Or questionable life choices',
  'Late night snack run? The Migros is closed btw',
  'Fun fact: you\'ll regret staying up this late tomorrow',
  'Plot twist: going to bed early is actually amazing',
  'The last tram left a while ago... you\'re walking',
  'Tomorrow-you will be grateful if you sleep now',
  'One more episode? That\'s what you said 3 episodes ago',
  'The WiFi is still on but your brain should be off',
];

const MONDAY = [
  'It\'s Monday. We don\'t talk about Mondays',
  'Monday motivation: only 4 days until Friday',
  'Mondays are just Sunday\'s evil twin',
  'New week, new chances to miss the tram',
  'Monday called. Nobody picked up',
];

const TUESDAY = [
  'Tuesday: Monday\'s less annoying sibling',
  'Fun fact: nothing interesting has ever happened on a Tuesday',
  'It\'s Tuesday, you\'re already surviving the week',
];

const WEDNESDAY = [
  'It\'s Wednesday my dudes',
  'Hump day! Downhill from here',
  'Halfway through the week, keep pushing',
  'Wednesday: close enough to the weekend to start dreaming',
];

const THURSDAY = [
  'Thursday: Friday\'s opening act',
  'Almost Friday... almost...',
  'Thursday night plans? Langstrasse is calling',
  'One more day. You can do this',
];

const FRIDAY = [
  'It\'s Friday! You made it!',
  'TGIF! What\'s the plan tonight?',
  'Friday energy: unmatched',
  'Weekend loading... 99%',
  'Friday night at Witelli? Say less',
  'The weekend starts NOW (almost)',
];

const SATURDAY = [
  'Happy Saturday! No alarms, no stress',
  'Saturday cleaning day? Or pretend you didn\'t see this',
  'Weekend = socially acceptable to do nothing',
  'Üetliberg hike? Or is the couch calling louder?',
  'No lectures today, just vibes',
  'Farmers market at Bürkliplatz? Fresh bread hits different',
  'Saturday brunch is not optional, it\'s a lifestyle',
  'The lake is free. Go touch it',
  'Flea market at Kanzlei? You never know what you\'ll find',
];

const SUNDAY = [
  'Happy Sunday! Recharge day',
  'Sunday scaries? Not at Witelli 20',
  'Everything is closed and that\'s okay',
  'Sunday cooking session? The kitchen is yours',
  'Meal prep Sunday or order food? No judgment either way',
  'Enjoy the quiet. Monday is coming',
  'Sunday stroll through the old town? Always a vibe',
  'Perfect day to do laundry. Or not. Your call',
  'The only plans today should be no plans',
];

const WEATHER_NICE = [
  'Beautiful weather today — go for a walk!',
  'Sun is out! Perfect for a stroll by the lake',
  'Too nice to stay inside today',
  'Great day for a picnic at the park',
  'Sunglasses weather today',
  'The Zürichsee is sparkling today, go see it',
  'Ice cream weather? Ice cream weather',
  'Perfect day for the Letten or Oberer Letten',
  'Vitamin D is free today. Go collect some',
];

const WEATHER_COLD = [
  'Bundle up today, it\'s chilly out there!',
  'Hot chocolate weather today',
  'Warm jacket recommended today',
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
  'Puddle-jumping weather today',
  'Rain check on outdoor plans? Literally',
  'Pro tip: the tram shelter exists for a reason',
  'Wet socks are a vibe. A terrible, terrible vibe',
  'Netflix and rain? Classic combo',
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
  'Remember: the Balgrist tram stop has seen everything',
  'Zürich tip: always have a Halbtax',
  'Today\'s mood: sponsored by public transport',
  'This message will self-destruct in... just kidding',
  'Plot twist: you\'re not late, you\'re fashionably on time',
  'Somewhere, a SBB conductor is checking tickets. Stay safe',
  'Life is short. Take the scenic route sometimes',
  'Witelli 20: where legends live and laundry never ends',
  'Touch grass (the park is 5 minutes away)',
  'This ticker runs 24/7 so you don\'t have to',
  'You just lost The Game. Sorry not sorry',
  'Certified WG moment',
  'If this board could talk... actually it can, you\'re reading it',
  'Remember to call your mom',
  'Friendly PSA: clean the kitchen. You know who you are',
  'WG rule #1: whoever finishes the milk buys new milk',
  'This is your sign to go outside',
  'The tram driver waved at you? You\'re the chosen one',
  'Top secret info: you can ask Doruk for free laundry',
  'The Witelli rooftop at sunset > everything',
  'Someone left their stuff in the dryer again...',
  'Reminder: the recycling doesn\'t take itself out',
  'The WiFi password is on the fridge. You\'re welcome',
  'WG meeting when? Check the group chat',
  'Whoever bought oat milk, you\'re a real one',
  'The bathroom is not a library. Be quick',
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

function getDayMessages() {
  return DAY_MESSAGES[new Date().getDay()] || [];
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

export function buildTicker(element, weatherCode, temp) {
  const messages = [...ALWAYS];

  messages.push(...pick(getTimeOfDayMessages(), 3));
  messages.push(...pick(getDayMessages(), 2));
  messages.push(...pick(EASTER_EGGS, 3));

  const weatherMsgs = getWeatherMessages(weatherCode, temp);
  if (weatherMsgs.length) messages.push(...pick(weatherMsgs, 2));

  const selected = messages.sort(() => Math.random() - 0.5);

  const html = selected
    .map((msg) => `<span>${msg}</span><span class="ticker-sep">///</span>`)
    .join('');

  element.innerHTML = html + html;
}

require('dotenv').config();

const twit = require('twit');
const config = require('./config.js');
const predictions = [
  'Todo será horrible',
  'El futuro no es mejor',
  'Este platanal seguirá siendo este platanal',
  'Ese político horrible morirá, sólo para ser reemplazado por uno peor',
  'Todo lo que amas decaerá, te dejará, morirá, o todo lo anterior',
  'La llama de la pasión se extinguirá, tarde o temprano',
  'Criollombia seguirá siendo Criollombia',
  'Uribe no vivirá por siempre, pero su legado vivirá mucho más que tú',
  'Millones han muerto; billones morirán'
];
const hashtags = [
  '#ChaosMagick',
  '#CyberMagick',
  '#DemonMagick',
  '#Technomancy',
  '#Technomancer',
  '#Anubis',
  '#Ayperos',
  '#Divination',
  '#Predictions'
];
const Twitter = new twit(config);

async function tweet(status) {
  try {
    const promise = Twitter.post('statuses/update', {status});
    const { data } = await promise;
    const { created_at } = data;
    console.log('Succesfully posted at', created_at);
  } catch (err) {
    console.err('Something went wrong:', err);
  }
}

function getPrediction() {
  const timestamp = Date.now();
  const random = timestamp % predictions.length;
  const prediction = predictions[random];
  return prediction;
}

function getPost() {
  const prediction = getPrediction();
  const post = prediction + '\n\n' + hashtags.join(' ');
  return post;
}

function run() {
  tweet(getPost());
}

run();
setInterval(run, 3000000);

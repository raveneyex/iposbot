require('dotenv').config();
const twit = require('twit');
const config = require('./config.js');
const predictions = require('./predictions.json');
const hashtags = require('./hashtags.json');
const Twitter = new twit(config);

async function tweet(status) {
  try {
    const promise = Twitter.post('statuses/update', {status});
    const { data } = await promise;
    const { created_at } = data;
    console.log(`Succesfully posted ${status} at ${created_at}`);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}

function getPrediction() {
  const timestamp = Date.now();
  const random = timestamp % predictions.length;
  const prediction = predictions[random];
  return prediction;
}

function getDate() {
  const fullDate = new Date(Date.now());
  const date = fullDate.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
  const hour = fullDate.toLocaleTimeString('es-CO');
  const fullDateString = `${date} ${hour}`;

  return fullDateString;
}

function getIntro() {
  const date = getDate();
  return `Predicción para ${date}:`;
}

function getPost() {
  const intro = getIntro();
  const prediction = getPrediction();
  const post = intro + '\n' + prediction + '\n\n' + hashtags.join(' ');

  return post;
}

function run() {
  tweet(getPost());
  setInterval(() => {
    tweet(getPost());
  }, config.interval);
}

module.exports = run;
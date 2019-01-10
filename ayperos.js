require('dotenv').config();
const twit = require('twit');
const config = require('./config.js');
const predictions_en = require('./predictions.english.json');
const predictions_es = require('./predictions.spanish.json');
const hashtags = require('./hashtags.json');
const Twitter = new twit(config);

async function tweet(status) {
  try {
    const promise = Twitter.post('statuses/update', {status});
    const { data } = await promise;
    const { created_at } = data;
    console.log(`Succesfully posted:\n${status}\nat ${created_at}\n--------`);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}

function getPrediction_ES() {
  const timestamp = Date.now();
  const random = timestamp % predictions_es.length;
  const prediction = predictions_es[random];
  return prediction;
}

function getPrediction_EN() {
  const timestamp = Date.now();
  const random = timestamp % predictions_en.length;
  const prediction = predictions_en[random];
  return prediction;
}

function getDate(locale = 'en-US') {
  const fullDate = new Date(Date.now());
  const date = fullDate.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
  const hour = fullDate.toLocaleTimeString(locale);
  const fullDateString = `${date} ${hour}`;

  return fullDateString;
}

function getIntro_ES() {
  const date = getDate('es-CO');
  return `Predicción para ${date}:`;
}

function getIntro_EN() {
  const date = getDate('en-US');
  return `Prediction for ${date}:`;
}

function getPost(locale) {
  let intro,
    prediction;
  
  if (locale === 'ES') {
    intro = getIntro_ES;
    prediction = getPrediction_ES;
  } else {
    intro = getIntro_EN;
    prediction = getPrediction_EN;
  }
  
  const post = intro() + '\n' + prediction() + `\n\n` + hashtags.join(' ');
  return post;
}

function postPredictions() {
  tweet(getPost('ES'));
  tweet(getPost('EN'));
}

function run() {
  postPredictions();
  setInterval(() => {
    postPredictions();
  }, config.interval);
}

module.exports = run;
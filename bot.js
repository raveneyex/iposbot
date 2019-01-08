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
const Twitter = new twit(config);

function tweet(status) {
  return Twitter.post('statuses/update', {status: status})
    .then(({data}) => {
      console.info(data)
    })
    .catch(err => {
      console.error(err)
    });
}

function getPrediction() {
  const timestamp = Date.now();
  const random = timestamp % predictions.length;
  const prediction = predictions[random];
  return prediction;
}

function run() {
  tweet(getPrediction());
}

run();
setInterval(run, 3000000);

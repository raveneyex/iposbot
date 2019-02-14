require('dotenv').config();

const twit = require('twit');
const config = require('./config.js');
const ayperos = require('./ayperos.js');
const Twitter = new twit(config);

async function tweet(status) {
  try {
    console.log("Length: ", status.length);
    const promise = Twitter.post('statuses/update', {status});
    const { data } = await promise;
    const { created_at } = data;
    console.log(`Succesfully posted:\n${status}\nat ${created_at}\n--------`);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}
const predict = () => tweet(ayperos());

(function run() {
  predict();
  setInterval(predict, config.interval);
})();

require('dotenv').config();

const config = require('./config.js');
const ayperos = require('./ayperos.js');

async function makePredict(status) {
  try {
    var dateNow = new Date();
    console.log("Length: ", status.length);    
    
    const created_at = dateNow.getDay()+"/"+(dateNow.getMonth()+1)+"/"+dateNow.getFullYear()
    console.log(`Succesfully predict at:\n${status}\nat ${created_at}\n--------`);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}
const predict = () => makePredict(ayperos());

(function run() {
  predict();
  setInterval(predict, config.interval);
})();

/**
 * Data-sources
 */
const subjects = require('./predictions/subjects.json');
const actions = require('./predictions/actions.json');
const endings = require('./predictions/endings.json');
const hashtags = require('./predictions/hashtags.json');

/**
 * Simple 2-digits DD/MM/YY format
 */
const dateFormat = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit'
};

/**
 * Returns the current DD/MM/YY date.
 * @param {String} locale. Defaults to `en-US`
 */
const getDate = (locale = 'en-US') => `${new Date(Date.now()).toLocaleDateString(locale, dateFormat)}`;

/**
 * Returns the intro to the prediction
 */
const getIntro = () => `Prediction for ${getDate()}:\n\n`;

/**
 * Returns a random int between min and max
 * @param {number} min
 * @param {number} max 
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Returns a random positive integer up to max
 * @param {number} max
 */
const getPositiveInt = getRandomInt.bind(null, 0);

/**
 * Given an array, return a random item from it
 * @param {array} items 
 */
const getRandomItem = (items) => items[getPositiveInt(items.length)];

/**
 * Returns a random subject from the subjects json file
 */
const getSubject = () => getRandomItem(subjects);

/**
 * Returns a random action from the actions json file
 */
const getAction = () => getRandomItem(actions);

/**
 * Returns a random ending from the endings json file
 */
const getEnding = () => getRandomItem(endings);

/**
 * Returns the hashtags for a post
 */
const getHashtags = () => `\n\n` + hashtags.join(' ');

/**
 * Returns a random prediction
 */
const getPrediction = () => `${getIntro()}${getSubject()} ${getAction()} ${getEnding()} ${getHashtags()}`; 

/**
 * Export fn to get a prediction
 */
module.exports = getPrediction;

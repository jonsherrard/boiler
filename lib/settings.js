// Default to dev settings
var settingsFile = '../config/development.json';
// If node environment is production load prod settings
if (process.NODE_ENV == 'production') {
  settingsFile = '../config/production.json';
}

// Return settings JSON file as JS object,
// using node's nifty require functionality.
module.exports = require(settingsFile);

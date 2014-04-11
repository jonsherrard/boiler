// Common lib is required on all controllers,
// allowing access to the database object,
// settings variables, and a global logger.

// Require the commmon modules, feel free to
// add your own here. The order is important.
var settings = require('./settings');
var common = {
  logger: require('./logger'),
  settings: settings,
  promise: require('es6-promise').Promise
};


module.exports = common;

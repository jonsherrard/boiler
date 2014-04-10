module.exports = function (app) {
  // List all routes here.
  var home = require('./home')(app);
  var login = require('./login')(app);
  var register = require('./register')(app);
};
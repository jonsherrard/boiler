// Require common settings and DB object
var common = require('../lib/common');
// The app object is passed through in the require,
// from app.js.
module.exports = function (app) {
  // When we reach http://host:port/
  app.get('/', function(req, res) {
    // Return the settings as JSON
    res.json(common.settings);
  });

};

// Load common settings and logger
var common= require('./lib/common');
// Require database module
var db = require('./lib/database');
// Initialize Database
db.init(function(err, db) {
  if (err) { return common.logger.error(err); }
  // Add database instance to the common object;
  common.db = db;
  // proceed with loading app
});

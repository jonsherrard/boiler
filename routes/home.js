// Require common settings and DB object
var common = require('../lib/common');
// The app object is passed through in the require,
// from app.js.
module.exports = function (app) {
  app.get('/', function(req, res) {
    // Render the settings in to a jade file. Found in ./views
    // http://www.devthought.com/code/use-jade-blocks-not-layouts/
    res.render('index', {
      pageName: 'Home Page'
    });
  });

};

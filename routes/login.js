// Require common settings and DB object
var common = require('../lib/common');
var passport = require('passport');
// The app object is passed through in the require,
// from app.js.
// Set the page name
var pageName = 'login';
module.exports = function (app) {
  // "For the route /pagename, /login /home etc"
  app.get('/' + pageName, function(req, res) {
    // Render the settings in to a jade file. Found in ./views
    // http://www.devthought.com/code/use-jade-blocks-not-layouts/
    if (req.user) {
      res.redirect('/dashboard');
    }
    res.render(pageName, {
      // make the pageName variable available to the Jade template
      pageName: pageName
    });
  });



  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
    })
  );

};


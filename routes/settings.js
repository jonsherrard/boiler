// Require common settings and DB object
var common = require('../lib/common');
// The app object is passed through in the require,
// from app.js.
module.exports = function (app) {
  app.get('/settings', app.get('ensureAuthenticated'), function(req, res) {
    // Render the settings in to a jade file. Found in ./views
    // http://www.devthought.com/code/use-jade-blocks-not-layouts/
    console.log(req.user);
    res.render('settings', {
      pageName: 'Settings',
      user: req.user,
      settings: common.settings
    });
  });

  app.post('/settings', app.get('ensureAuthenticated'), function(req, res) {
    var Users = common.db.collection('usercollection');
    var updateData = req.body;
    Users.update({_id:req.user._id}, {$set: updateData}, function(err, data) {
      if (err)  {
        common.logger.error(err);
      }
      if (data) {
        res.redirect('/settings');
      } else {
        res.send(500, {message: 'Server Error'});
      }
    });

  });

};

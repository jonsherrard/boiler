
module.exports = function (app) {

  var common = require('../lib/common');

  app.get('/check-email', function(req, res) {
    // Render the settings in to a jade file. Found in ./views
    // http://www.devthought.com/code/use-jade-blocks-not-layouts/
    console.log(req.body);
    var Users = common.db.collection('usercollection');
    var postEmail = req.body.email;
    Users.findOne({email:postEmail}, function(err, data) {
        if (err) {
          res.send(404, false);
        }
        if (data) {
          res.send(200, true);
        }
        else {
          res.send(404, false);
        }
    });
  });

};
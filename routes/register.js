
module.exports = function (app) {

  var common = require('../lib/common');
  var pageName = "register";

  app.get('/' + pageName, function(req, res) {
    // Render the settings in to a jade file. Found in ./views
    // http://www.devthought.com/code/use-jade-blocks-not-layouts/
    res.render(pageName, {
      pageName: pageName
    });
  });

  var processUserData = function(userObject) {
    console.log('process User Data');
    return new common.promise(function(resolve, reject) {
      var crypto = require('crypto');
      if (userObject.password === userObject.passwordConfirm) {
        var hash = crypto.createHash('sha1');
        hash.update(userObject.password);
        userObject.hash = hash.digest('hex');
        delete userObject.password;
        delete userObject.passwordConfirm;
        resolve(userObject);
      } else {
        reject(false);
      }
    });
  };

  var checkIfuserExists = function(userEmail) {
    console.log('check user');
    return new common.promise(function(resolve, reject){
      var Users = common.db.collection('usercollection');
      Users.findOne({email: userEmail}, function(err, data){
        if (err) {
          reject('Database Error');
          return common.logger.err(err);
        }
        if (data) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      });
    });
  };

  app.post('/' + pageName, function(req, res) {
    if (req.user) {
      res.redirect('/dashboard');
    }
    var Users = common.db.collection('usercollection');
    var postData = req.body;
    var insertData;
    processUserData(postData).then(function(userObject) {
      if (!userObject) {
        res.send(500, {message: 'Passwords don\'t match.'});
        return;
      }
      insertData = userObject;
      return checkIfuserExists(userObject.email);
    }).then(function(userExists) {
      if (!userExists) {
        try {
          Users.insert(insertData, function(err, data) {
            if (err) {
              common.logger.error(err);
              res.send(500, {message: 'Server error.'});
            } else {
              common.logger.info('Record inserted: ', data);
              res.redirect('/login');
            }
          });
        } catch (err) {
          if (err) {
            common.logger.error(err);
            res.send(500, {message: 'Server error.'});
          }
        }
      }
      else {
        res.send(500, {message: 'User already exists.'});
      }
    });
  });
};

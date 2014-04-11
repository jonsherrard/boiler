module.exports = function(app) {
  // Require common settings and DB object
  var common = require('./common');
  // Require flash module for authorisation
  var flash = require('connect-flash');
  var crypto = require('crypto');
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  app.use(flash()); // this must be before passport setup

  passport.use(new LocalStrategy(function(email, password, done) {
    var Users = common.db.collection('usercollection');
    Users.findOne({email:email},function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      var hash = crypto.createHash('sha1');
      hash.update(password);
      var result = hash.digest('hex') ;

      if (result == user.hash) {
        return done(null, user._id);
      }
      else {
        done(null, false, { message: 'Incorrect password.' });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    var ObjectID = require('mongodb').ObjectID;
    var Users = common.db.collection('usercollection');
    Users.findOne({_id:new ObjectID(id)}, function(err, user){
      if(err){
        done(err, false);
      }
      if (user) {
        done(null, user);
      }
      else {
        done(null, false);
      }
    });
  });
  app.use(passport.initialize());
  app.use(passport.session());
};
module.exports = function (app) {
  // List all routes here.
  require('./home')(app);
  require('./login')(app);
  require('./register')(app);
  require('./dashboard')(app);
  require('./settings')(app);
  require('./validators')(app);

  app.get('/logout', function(req, res){
    req.logout();
    req.session = null;
    res.redirect('/');
  });
};
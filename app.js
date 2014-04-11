// Let's run our processes with a cluster
// http://rowanmanning.com/posts/node-cluster-and-express/
var cluster = require('cluster');
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  // Listen for dying workers
  cluster.on('exit', function (worker) {
    // Replace the dead worker, we're not sentimental
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });
// Code to run if we're in a worker process
} else {

  // Load common settings and logger
  // Have a look in lib/common.js
  var common= require('./lib/common');
  // Require database module
  // Have a look in lib/database.js

  require('./lib/database')(function(err, db){
    common.db = db;
  });

  // Require the node http module
  var http = require('http');
  // Improve max http connections from default of 4
  http.globalAgent.maxSockets = 256;
  // Require node path module, useful for directory routing
  path = require('path');
  // Require the Expressjs framework
  var express = require('express');
  // Require the relevant passport modules

  var app = express();
 
  // Create a new express app instance
  app.set('port', common.settings.port);
  // set the view directory
  app.set('views', path.join(__dirname, 'public/views'));
  // set the view engine. Jade is the mad notes yo!
  app.set('view engine', 'jade');
  // Define a set of variables avaliable to all view
  // by default, could be a .JSON file.
  // Could be different based on environment
  app.use(function(req, res, next) {
    res.locals = common.settings.locals;
    next();
  });
  // Enable gzip on all assets and pages
  app.use(express.compress());
  // Enable the use of a favicon
  app.use(express.favicon());
  // If we're in development mode...
  if (app.get('env') == 'development') {
    app.use(express.logger('dev')); // log every request to the console
    // Utilise the express error handler
    app.use(express.errorHandler());
    // Pretty print html during development
    app.locals.pretty = true;
  }
  app.use(express.cookieParser());
  app.use(express.cookieSession({ secret: 'asdfasdlkjhkjh', maxAge: 360*5 }));
  app.use(express.bodyParser()); // get information from html forms

  app.use(express.session({ secret: 'asdfklajshdf' })); // session secret
   // Set the default port the app will run on from settings
  var authStrategy = require('./lib/authStrategy')(app);

  app.set('ensureAuthenticated', function(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  });

  app.use(express.methodOverride());
  // Define the location of static assets
  // NB Node is not that performant in this area
  // Consider a static file server or S3 or something
  app.use(express["static"](path.join(__dirname, "public")));
  // Enable the express router /index  -> routes/index.js etc
  app.use(app.router);
  // All routes are defined in the index.js file of the routes directory.
  var routes = require('./routes')(app);
  // Create the HTTP server instance listening on a port
  http.createServer(app).listen(app.get('port'), function() {
    return common.logger.info('App listening on port: ', app.get('port'));
  });
// End cluster worker
}

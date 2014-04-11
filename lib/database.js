// Global database instance
// Require the common object for access to settings
var settings = require('./settings');
// Create a new instance of the mongo client
var MongoClient = require('mongodb').MongoClient;
// Define various mongo connection settings
var connectionInstance;

var dbOptions = {
  db: {
    numberOfRetries: 10,
    retryMiliSeconds: 1000
  },
  server: {
    auto_reconnect: true,
    socketOptions: {
      connectTimeoutMS: 3600000,
      keepAlive: 3600000,
      socketTimeoutMS: 3600000
    }
  }
};
// create the mongo connection
module.exports = function (callback) {
  if (connectionInstance) {
    return callback(null, connectionInstance);
  } else {
    MongoClient.connect("mongodb://" + settings.database.connection.uri, dbOptions, function(err, db) {
      if (err) {
        callback(err);
      } else {
        console.log("Db connected: " + JSON.stringify(settings.database.connection.uri));
        connectionInstance = db;
        return callback(null, db);
      }
    });
  }
};

var logger = {
  info: function(data) {
    console.log(data);
  },
  error: function(data) {
    throw new Error(data);
  }
};

module.exports = logger;
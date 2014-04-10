var gulp = require('./gulp')([
  'browserify',
  'stylus',
  'watch',
]);

gulp.task('build', ['browserify', 'stylus']);
gulp.task('default', ['build', 'watch']);

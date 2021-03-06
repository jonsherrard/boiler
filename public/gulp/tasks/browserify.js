var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var source = require('vinyl-source-stream');

module.exports = function() {
  return browserify({
      entries: ['./src/coffee/app.coffee', './src/templates'],
      extensions: ['.coffee', '.hbs', 'html']
    })
    .require('underscore', { expose: 'underscore' })
    .bundle({debug: true})
    .on('error', notify.onError({
      message: "<%= error.message %>",
      title: "JavaScript Error"
    }))
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(livereload());
};

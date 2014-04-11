var stylus = require('gulp-stylus');
var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var notify     = require('gulp-notify');

module.exports = function() {
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus({
      use: ['nib']
    }))
    .on('error', notify.onError({
      message: "<%= error.message %>",
      title: "Stylus Error"
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
};

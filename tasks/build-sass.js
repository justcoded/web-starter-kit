/**
 * Build styles for application from SASS
 */
'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create(),
      gutil = require('gulp-util'),
      notifier = require('node-notifier'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function() {
    /**
     * Show error in console
     * @param  {String} preffix Title of the error
     * @param  {String} err     Error message
     */
    function showError(preffix, err) {
      gutil.log(gutil.colors.white.bgRed(' ' + preffix + ' '), gutil.colors.white.bgBlue(' ' + err.message + ' '));
      notifier.notify({ title: preffix, message: err.message });
      this.emit('end');
    }

    return gulp.src(`./src/scss/style.scss`)
      .pipe(rename('style.min.css'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sass().on('error', function(err) {
        console.log('123');
        showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(autoprefixer('last 4 versions'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./assets/css`))
      .pipe(browserSync.stream());
  };

};
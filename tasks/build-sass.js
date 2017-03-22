/**
 * Build styles for application from SASS
 */
'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      gutil = require('gulp-util'),
      notifier = require('node-notifier'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function() {
    return gulp.src(`./src/scss/style.scss`)
      .pipe(rename('style.min.css'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sass().on('error', function(err) {
        let self = this;
        options.showError.apply(self, ['Sass compile error', err]);
      }))
      .pipe(autoprefixer('last 4 versions'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./assets/css`));
  };

};
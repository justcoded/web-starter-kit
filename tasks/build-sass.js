/**
 * Build styles for application from SASS
 */
'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      rename       = require('gulp-rename'),
      sourcemaps   = require('gulp-sourcemaps'),
      notifier     = require('node-notifier'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function() {
    return gulp.src(`./${options.src}/scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sass().on('error', function(err) {
        options.showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(autoprefixer(options.versions))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };

};
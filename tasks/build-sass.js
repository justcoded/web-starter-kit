/**
 * Build styles for application from SASS
 */
'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      rename       = require('gulp-rename'),
      gcmq         = require('gulp-group-css-media-queries'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function() {
    return gulp.src(`./scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass().on('error', function(err) {
        options.showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(gcmq())
      .pipe(autoprefixer(options.versions))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`../${options.dest}/css`));
  };

};

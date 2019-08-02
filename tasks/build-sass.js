/**
 * Build styles for application from SASS
 */
'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      rename       = require('gulp-rename'),
      gcmq         = require('gulp-group-css-media-queries'),
      gulpif       = require('gulp-if'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano      = require('gulp-cssnano');

module.exports = function(options) {

  return function() {
    return gulp.src(`./${options.src}/scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(sass().on('error', function(err) {
        options.showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(gulpif(options.isProduction, gcmq()))
      .pipe(gulpif(options.isProduction, cssnano({ safe: true })))
      .pipe(autoprefixer(options.versions))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };

};

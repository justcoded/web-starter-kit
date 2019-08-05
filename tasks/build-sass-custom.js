/**
 * Compile custom scss files without sourcemaps & Gcmq
 */
'use strict';

  const gulp         = require('gulp'),
        sass         = require('gulp-sass'),
        gcmq         = require('gulp-group-css-media-queries'),
        gulpif       = require('gulp-if'),
        autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function(cb) {
    const { files, isGcmq } = options.sassFilesInfo;

    if (files.length > 0) {
      return gulp.src(files)
        .pipe(sass().on('error', function(err) {
          options.showError.apply(this, ['Sass compile error', err]);
        }))
        .pipe(gulpif(isGcmq, gcmq()))
        .pipe(autoprefixer(options.versions))
        .pipe(gulp.dest(`../${options.dest}/css`));
    } else {
      return cb();
    }
  };
};

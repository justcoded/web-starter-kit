/**
 * Compile scss files listed in the config
 */
'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      cssnano      = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function (cb) {
    const { files} = options.sassFilesInfo;

    if (files.length > 0) {
      return gulp.src(files)
        .pipe(sass().on('error', function(err) {
          options.showError.apply(this, ['Sass compile error', err]);
        }))
        .pipe(cssnano({
          safe: true
        }))
        .pipe(autoprefixer(options.versions))
        .pipe(gulp.dest(`./${options.dest}/css`));
    } else {
      return cb();
    }
  };

};

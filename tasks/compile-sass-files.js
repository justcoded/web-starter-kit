/**
 * Compile scss files listed in the config
 */
'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      gulpif       = require('gulp-if'),
      gcmq         = require('gulp-group-css-media-queries'),
      autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

  return function (cb) {
    const { files, isGcmq } = options.sassFilesInfo;

    if (files.length > 0) {
      return gulp.src(files)
        .pipe(sass())
        .on('error', notify.onError({
          title: 'Sass'
        }))
        .pipe(gulpif(isGcmq, gcmq()))
        .pipe(autoprefixer(options.versions))
        .pipe(gulp.dest(`./${options.dest}/css`));
    } return cb();
  };

};

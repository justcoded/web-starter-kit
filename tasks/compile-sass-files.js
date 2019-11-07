/**
 * Compile scss files listed in the config
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');

module.exports = function (options) {

  return function (cb) {
    const { files, isGcmq } = options.sassFilesInfo;

    if (files.length > 0) {
      return gulp.src(files)
        .pipe(sass())
        .on('error', notify.onError({
          title: 'Sass compiling error',
          icon: './sys_icon/error_icon.png',
          wait: true
        }))
        .pipe(gulpif(isGcmq, gcmq()))
        .pipe(autoprefixer(options.versions))
        .pipe(gulp.dest(`./${options.dest}/css`));
    } return cb();
  };

};

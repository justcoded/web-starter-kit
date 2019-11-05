/**
 * Build styles for application from SASS
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

module.exports = function (options) {

  return () => {
    return gulp.src(`./scss/${options.mainScss}`)
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass())
      .on('error', notify.onError({
        title: 'Sass compiling error',
        wait: true
      }))
      .pipe(autoprefixer())
      .pipe(gcmq())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`../${options.dest}/css`));
  };
};

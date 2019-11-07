/**
 * Build styles for application from SASS
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');

module.exports = function (options) {

  return function () {
    return gulp.src(`./${options.src}/scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(sass())
      .on('error', notify.onError({
        title: 'Sass compiling error',
        icon: './sys_icon/error_icon.png',
        wait: true
      }))
      .pipe(gulpif(options.isProduction, gcmq()))
      .pipe(gulpif(options.isProduction, cssnano({ safe: true })))
      .pipe(autoprefixer(options.versions))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };

};

/**
 * Build styles for application
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const errorConfig = {
    title: 'Sass compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true
  };

  return () => {
    return gulp.src(`./${options.src}/scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(sass.sync({
        sourceMap: !options.isProduction,
      }))
      .on('error', notify.onError(errorConfig))
      .pipe(autoprefixer())
      .pipe(gulpif(options.isProduction, gcmq()))
      .pipe(gulpif(options.isProduction, cssnano({ safe: true })))
      .pipe(gulpif(!options.isProduction, sourcemaps.write('./')))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};

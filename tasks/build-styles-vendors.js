/**
 * Build styles for vendor
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const cssimport = require('gulp-cssimport');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const errorConfig = {
    title: 'Sass compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true,
  };

  return () => {
    return gulp.src(`./${options.src}/vendor_entries/${options.vendorScss}`)
      .pipe(rename(options.vendorScssMin))
      .pipe(sass.sync())
      .on('error', notify.onError(errorConfig))
      .pipe(cssimport())
      .pipe(gulpif(options.isProduction, cssnano({ safe: true, })))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};

/**
 * Build styles for vendor from SASS
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const cssimport = require('gulp-cssimport');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');

module.exports = function (options) {

  return () => {
    return gulp.src(`./${options.src}/vendor_entries/${options.vendorScss}`)
      .pipe(sass())
      .on('error', notify.onError({
        title: 'Sass compiling error',
        icon: './sys_icon/error_icon.png',
        wait: true
      }))
      .pipe(cssimport())
      .pipe(rename(options.vendorScssMin))
      .pipe(gulpif(options.isProduction, cssnano({ safe: true })))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};
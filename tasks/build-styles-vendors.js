/**
 * Build styles for vendor from SASS
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cssimport = require('gulp-cssimport');

module.exports = function (options) {

  return () => {
    return gulp.src(`./vendor_entries/${options.vendorScss}`)
      .pipe(cssimport())
      .pipe(sass())
      .on('error', notify.onError({
        title: 'Sass compiling error',
        icon: './sys_icon/error_icon.png',
        wait: true
      }))
      .pipe(gulp.dest(`../${options.dest}/css`));
  };
};

/**
 * Build styles for vendor
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssimport = require('postcss-import');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const plugins = [
    cssimport(),
  ];
  const errorConfig = {
    title: 'Sass compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true,
  };

  options.isProduction ? plugins.push(cssnano()) : false;

  return () => {
    return gulp.src(`./${options.src}/vendor_entries/${options.vendorScss}`)
      .pipe(rename(options.vendorScssMin))
      .pipe(sass.sync())
      .on('error', notify.onError(errorConfig))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};

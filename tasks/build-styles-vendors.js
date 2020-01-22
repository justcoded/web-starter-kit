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

  options.error.title = 'Sass compiling error';

  options.isProduction ? plugins.push(cssnano()) : false;

  return () => {
    return gulp
      .src(`./${options.src}/vendor_entries/vendor.scss`)
      .pipe(rename(options.isProduction ? options.vendorStylesMin : options.vendorStyles))
      .pipe(sass.sync())
      .on('error', notify.onError(options.error))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};

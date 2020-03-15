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

const global = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = global.isProduction();
  const vendorFileName = production ? global.file.vendorStylesMin : global.file.vendorStyles;
  const plugins = [
    cssimport(),
  ];

  global.error.title = 'Sass compiling error';

  production ? plugins.push(cssnano()) : null;

  return () => {
    return gulp
      .src(`./${global.folder.src}/vendor_entries/${global.file.vendorStylesSrc}`)
      .pipe(rename(vendorFileName))
      .pipe(sass.sync())
      .on('error', notify.onError(global.error))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${global.folder.build}/css`));
  };
};

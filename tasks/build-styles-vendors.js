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

const { folder, file, error, isProduction } = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = isProduction();
  const plugins = [
    cssimport(),
  ];

  error.title = 'Sass compiling error';

  production ? plugins.push(cssnano()) : null;

  return () => {
    return gulp
      .src(`./${folder.src}/vendor_entries/${file.vendorStylesSrc}`)
      .pipe(rename(production ? file.vendorStylesMin : file.vendorStyles))
      .pipe(sass.sync())
      .on('error', notify.onError(error))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${folder.build}/css`));
  };
};

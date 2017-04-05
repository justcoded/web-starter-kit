/**
 * Build styles for vendor from SASS
 */
'use strict';

const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      rename    = require('gulp-rename'),
      cssnano   = require('gulp-cssnano'),
      cssimport = require('gulp-cssimport');

module.exports = function(options) {

  return function() {
    return gulp.src(`./${options.src}/vendor_entries/${options.vendorScss}`)
      .pipe(sass().on('error', function(err) {
        options.showError.apply(this, ['Sass compile error (vendor)', err]);
      }))
      .pipe(cssimport())
      .pipe(rename(options.vendorScssMin))
      .pipe(cssnano({
        safe: true
      }))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };

};
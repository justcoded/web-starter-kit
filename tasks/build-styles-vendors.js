/**
 * Build styles for vendor from SASS
 */
'use strict';

const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      cssimport = require('gulp-cssimport');

module.exports = function(options) {

  return function() {
    return gulp.src(`vendor_entries/${options.vendorScss}`)
      .pipe(sass().on('error', function(err) {
        options.showError.apply(this, ['Sass compile error (vendor)', err]);
      }))
      .pipe(cssimport())
      .pipe(gulp.dest(`../${options.dest}/css`));
  };

};

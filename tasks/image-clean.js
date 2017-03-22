/**
 * Clean image build directory
 */
'use strict';

const gulp = require('gulp'),
  rimraf = require('gulp-rimraf');

module.exports = function(options) {

  return () => {
    return gulp.src('assets/images/')
      .pipe(rimraf());
  };

};
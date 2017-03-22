/**
 * Clean production folder
 */
'use strict';

const gulp     = require('gulp'),
      htmlhint = require('gulp-htmlhint'),
      notify   = require('gulp-notify');

module.exports = function(options) {

  return () => {
    return gulp.src(`./${options.prod}/`, {
        read: false
      })
      .pipe(rimraf());
    };

};
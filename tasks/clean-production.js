/**
 * Clean production folder
 */
'use strict';

const gulp   = require('gulp'),
      rimraf = require('gulp-rimraf');

module.exports = function(options) {

  return () => {
    return gulp.src(`./${options.src}/`, {
        read: false
      })
      .pipe(rimraf());
    };

};
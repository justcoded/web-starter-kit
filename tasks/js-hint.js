/**
 * Hint JS
 */
'use strict';

const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      notify = require('gulp-notify');

module.exports = function(options) {

  return () => {
    return gulp.src(`./src/js/**/*.js`)
      .pipe(jshint({
        'esversion': 6
      }))
      .pipe(jshint.reporter())
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: 'JS'
      }));
  };

};
/**
 * Hint HTML
 */
'use strict';

const gulp     = require('gulp'),
      htmlhint = require('gulp-htmlhint'),
      notify   = require('gulp-notify');

module.exports = function(options) {

  return cb => {
    gulp.src('./*.html')
      .pipe(htmlhint({
        'attr-lowercase': ['viewBox']
      }))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failReporter({
        suppress: true 
      }))
      .on('error', notify.onError({
        title: 'HTML'
      }));

    cb();
  };

};
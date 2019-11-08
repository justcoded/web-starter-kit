/**
 * Hint HTML
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const htmlhint = require('gulp-htmlhint');

module.exports = function (options) {

  return (done) => {
    gulp.src('./*.html')
      .pipe(htmlhint({
        'attr-lowercase': ['viewBox']
      }))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failOnError({
        suppress: true
      }))
      .on('error', notify.onError({
        title: 'HTML linting error',
        icon: './sys_icon/error_icon.png',
        wait: true
      }));

    return done();
  };
};
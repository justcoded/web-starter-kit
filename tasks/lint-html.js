/**
 * Lint HTML
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const htmlhint = require('gulp-htmlhint');

module.exports = function (options) {
  options.error.title = 'HTML linting error';

  return (done) => {
    gulp.src(`${options.dest}/*.html`)
      .pipe(htmlhint({
        'attr-lowercase': ['viewBox'],
      }))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failOnError({
        suppress: true,
      }))
      .on('error', notify.onError(options.error));

    return done();
  };
};

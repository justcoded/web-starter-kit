/**
 * Lint HTML
 */
'use strict';

const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');
const notify = require('gulp-notify');

const global = require('../gulp-config.js');

module.exports = function () {
  global.error.title = 'HTML linting error';

  return (done) => {
    gulp.src(`${global.buildHtml.templates}/*.html`)
      .pipe(htmlhint({
        'attr-lowercase': false,
      }))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failOnError({
        suppress: true,
      }))
      .on('error', notify.onError(global.error));

    return done();
  };
};

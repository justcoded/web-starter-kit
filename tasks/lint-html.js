/**
 * Lint HTML
 */
'use strict';

const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

module.exports = function () {

  return (done) => {
    gulp.src(`${global.folder.dev}/**/*.html`)
      .pipe(htmlhint({
        'attr-lowercase': false,
      }))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failOnError({
        suppress: true,
      }))
      .on('error', (error) => notifier.error(error.message, 'HTML linting error'));

    return done();
  };
};

/**
 * Lint ES
 */
'use strict';

const gulp = require('gulp');
const esLint = require('gulp-eslint');

module.exports = function (options) {

  return () => gulp.src(`./${options.src}/js/**/*.js`)
    .pipe(esLint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(esLint.format());
};

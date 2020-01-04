/**
 * Lint ES
 */
'use strict';

const gulp = require('gulp');
const esLint = require('gulp-eslint');

module.exports = function (options) {

  return () => gulp.src(`./${options.src}/js/**/*.js`)
    .pipe(esLint())
    .pipe(esLint.format());
};

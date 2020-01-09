/**
 * Build js
 */
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');

module.exports = function (options) {
  const babelConfig = {
    presets: ['@babel/preset-env'],
  };
  const errorConfig = {
    title: 'JS compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true,
  };

  return function () {
    return browserify({
      entries: `./${options.src}/js/${options.mainJs}`,
    })
      .transform('babelify', babelConfig)
      .bundle().on('error', notify.onError(errorConfig))
      .pipe(source(options.mainJsMin))
      .pipe(gulpif(options.isProduction, buffer()))
      .pipe(gulpif(options.isProduction, uglify()))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};
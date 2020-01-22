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
  
  options.error.title = 'JS compiling error';

  return () => {
    return browserify({
      entries: `./${options.src}/js/${options.mainJs}`,
    })
      .transform('babelify', babelConfig)
      .bundle().on('error', notify.onError(options.error))
      .pipe(source(options.isProduction ? options.mainJsMin : options.mainJs))
      .pipe(gulpif(options.isProduction, buffer()))
      .pipe(gulpif(options.isProduction, uglify()))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};

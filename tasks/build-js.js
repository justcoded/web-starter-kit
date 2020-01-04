/**
 * Build custom js
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

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
      .pipe(source(options.mainJs))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};
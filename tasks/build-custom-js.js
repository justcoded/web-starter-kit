/**
 * Build custom js
 */
'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

module.exports = function (options) {

  return function () {
    return browserify({
      entries: `./${options.src}/js/${options.mainJs}`
    })
      .transform('babelify', {
        presets: ['@babel/preset-env']
      })
      .bundle().on('error', notify.onError({
        title: 'JS compiling error',
        icon: './sys_icon/error_icon.png',
        wait: true
      }))
      .pipe(source('app.js'))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};
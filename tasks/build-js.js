/**
 * Build custom js
 */
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
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

  return () => {
    return browserify({
      entries: `./js/${options.mainJs}`,
    })
      .transform('babelify', babelConfig)
      .bundle().on('error', notify.onError(errorConfig))
      .pipe(source(options.publicJs))
      .pipe(gulp.dest(`../${options.dest}/js`));
  };
};

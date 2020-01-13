/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const notify = require('gulp-notify');

module.exports = function (options) {
  const config = {
    prefix: '@@',
    basepath: `./${options.templates}`,
    indent: true,
  };
  const errorConfig = {
    title: 'HTML compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true,
  };

  return () => {
    return gulp.src(`./${options.templates}/**/*.html`)
      .pipe(fileInclude(config))
      .on('error', notify.onError(errorConfig))
      .pipe(gulp.dest(`../${options.dest}`));
  };
};

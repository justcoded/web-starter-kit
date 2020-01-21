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
  
  options.error.title = 'HTML compiling error';

  return () => {
    return gulp.src(`./${options.templates}/**/*.html`)
      .pipe(fileInclude(config))
      .on('error', notify.onError(options.error))
      .pipe(gulp.dest(options.dest));
  };
};

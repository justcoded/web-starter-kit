/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

module.exports = function (options) {
  const config = {
    prefix: '@@',
    basepath: `./${options.templates}`,
    indent: true
  };

  return () => {
    return gulp.src(`./${options.templates}/**/*.html`)
      .pipe(fileInclude(config))
      .pipe(gulp.dest(options.dest));
  };
};

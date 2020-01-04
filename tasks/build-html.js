/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

module.exports = function (options) {

  return () => {
    return gulp.src(`./${options.templates}/**/*.html`)
      .pipe(fileInclude({
        prefix: '@@',
        basepath: `./${options.templates}`,
        indent: true
      }))
      .pipe(gulp.dest(options.dest));
  };
};

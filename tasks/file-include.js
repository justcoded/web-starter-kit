/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

module.exports = function (options) {

  return () => {
    return gulp.src(`./${options.templates}/**/*.html`)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: `./${options.templates}`,
        indent: true
      }))
      .pipe(gulp.dest(options.dest));
  };
};

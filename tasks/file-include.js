/**
 * Build html from templates
 */
'use strict';

const gulp        = require('gulp'),
      fileinclude = require('gulp-file-include')

module.exports = function() {

  return function() {
    return gulp.src('./src/html/templates/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/html/templates'
    }))
    .pipe(gulp.dest('./'));
  };

};
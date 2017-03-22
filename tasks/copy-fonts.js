/**
 * Copy custom fonts to the build folder
 */
'use strict';

const gulp = require('gulp');

module.exports = function(options) {

  return () => {
    return gulp.src(['./src/fonts/**/*'])
      .pipe(gulp.dest('./assets/fonts/'));
  };

};
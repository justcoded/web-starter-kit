/**
 * Copy folders to the build folder
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

module.exports = function(options) {

  return () => {
    return gulp.src(options.filesToCopy, { dot: true })
      .pipe(newer(`./${options.dest}`))
      .pipe(gulp.dest(`./${options.dest}`));
  };
};

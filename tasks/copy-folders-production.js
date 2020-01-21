/**
 * Copy folders to the production folder
 */
'use strict';

const gulp = require('gulp');

module.exports = function(options) {

  return () => {
    return gulp.src(options.filesToCopyProd, { dot: true })
      .pipe(gulp.dest(`./${options.dest}`));
  };
};

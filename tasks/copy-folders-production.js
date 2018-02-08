/**
 * Copy folders to another folder
 */
'use strict';

const gulp = require('gulp');

module.exports = function(options) {

  return () => {
    return gulp.src(options.foldersToCopy, { dot: true })
      .pipe(gulp.dest(`./${options.dest}`));
  };

};
/**
 * Copy folders to the production folder
 */
'use strict';

const gulp = require('gulp');

const { folder, getFilesToCopyProd } = require('../gulp-config.js');

module.exports = function () {
  const filesList = getFilesToCopyProd(folder.src);

  return () => {
    return gulp.src(filesList, { dot: true })
      .pipe(gulp.dest(`./${folder.prod}`));
  };
};

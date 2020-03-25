/**
 * Copy folders to the production folder
 */
'use strict';

const gulp = require('gulp');

const global = require('../gulp-config.js');

module.exports = function () {
  const filesList = global.getFilesToCopyProd();

  return () => {
    return gulp.src(filesList, { dot: true })
      .pipe(gulp.dest(`./${global.folder.build}`));
  };
};

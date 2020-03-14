/**
 * Copy folders to the build folder
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

const { folder, getFilesToCopy } = require('../gulp-config.js');

module.exports = function() {
  const filesList = getFilesToCopy(folder.src);

  return () => {
    return gulp.src(filesList, { dot: true })
      .pipe(newer(`./${folder.build}`))
      .pipe(gulp.dest(`./${folder.build}`));
  };
};

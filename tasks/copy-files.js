/**
 * Copy folders to the build folder
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');

const global = require('../gulp-config.js');

module.exports = function() {
  const filesList = global.getFilesToCopy();

  return () => {
    return gulp.src(filesList, { dot: true })
      .pipe(newer(`./${global.folder.dev}`))
      .pipe(gulp.dest(`./${global.folder.dev}`));
  };
};

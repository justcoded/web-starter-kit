/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');
const del = require('del');
const path = require('path');

const global = require('../gulp-config.js');

module.exports = function (options) {
  const filesList = global.getFilesToCopy();

  /**
 * Remove file(s) from build folder if corresponding
 * file(s) were deleted from source folder
 * @param  {Object} event    Event object
 * @param  {String} src      Name of the source folder
 * @param  {String} dest     Name of the destination folder
 */
  function deleteFile(file, src, dest) {
    let fileName = file.path.toString().split('/').pop();
    let fileEventWord = file.event == 'unlink' ? 'deleted' : file.event;

    let filePathFromSrc = path.relative(path.resolve(src), file.path);
    let destFilePath = path.resolve(dest, filePathFromSrc);

    try {
      del.sync(destFilePath);
      console.log(` \u{1b}[32m${fileEventWord}: ${fileName}\u{1b}[0m`);
    } catch (error) {
      console.log(` \u{1b}[31mFile has already deleted\u{1b}[0m`);
    }
  }

  return () => {
    gulp.watch(`./${global.folder.src}/html/**/*.html`, gulp.series(global.task.buildHtml, global.task.lintHtml));

    gulp.watch(`./${global.folder.src}/scss/**/*.scss`, gulp.series(global.task.buildStyles, global.task.buildStylesCustom));

    gulp.watch(`./${global.folder.src}/js/**/*.js`, gulp.series(global.task.lintJs, global.task.buildJs));

    gulp.watch(`./${global.folder.src}/vendor_entries/**/*.js`, gulp.series(global.task.buildJsVendors));

    gulp.watch(`./${global.folder.src}/vendor_entries/**/*.scss`, gulp.series(global.task.buildStylesVendors));

    gulp.watch(filesList)
      .on('unlink', (path) => {
        deleteFile({
          path,
          event: 'unlink'
        }, global.folder.src, global.folder.build);
      })
      .on('add', gulp.series(global.task.copyFiles));

    gulp.watch(`${global.folder.src}/images/**/*`)
      .on('unlink', (path) => {
        deleteFile({
          path,
          event: 'unlink'
        }, global.folder.src, global.folder.build);
      })
      .on('add', gulp.series(global.task.buildImages));

    gulp.watch([`./${global.folder.build}/**/*`, `!./${global.folder.build}/**/*.map`])
      .on('change', options.browserSyncInstance.reload)
      .on('unlink', options.browserSyncInstance.reload)
      .on('add', options.browserSyncInstance.reload);
  };
};

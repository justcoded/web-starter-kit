/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');
const del = require('del');
const path = require('path');

const lintHtml = require('./lint-html.js');
const buildHtml = require('./build-html.js');
const buildStyles = require('./build-styles.js');
const buildStylesCustom = require('./build-styles-custom.js');
const buildStylesVendors = require('./build-styles-vendors.js');
const lintJs = require('./lint-js.js');
const buildJs = require('./build-js.js');
const buildJsVendors = require('./build-js-vendors.js');
const buildImages = require('./build-images.js');
const copyFiles = require('./copy-files.js');

const { folder, getFilesToCopy } = require('../gulp-config.js');

module.exports = function (options) {
  const filesList = getFilesToCopy();

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
    gulp.watch(`./${folder.src}/html/**/*.html`, gulp.series(buildHtml, lintHtml));

    gulp.watch(`./${folder.src}/scss/**/*.scss`, gulp.series(buildStyles, buildStylesCustom));

    gulp.watch(`./${folder.src}/js/**/*.js`, gulp.series(lintJs, buildJs));

    gulp.watch(`./${folder.src}/vendor_entries/**/*.js`, gulp.series(buildJsVendors));

    gulp.watch(`./${folder.src}/vendor_entries/**/*.scss`, gulp.series(buildStylesVendors));

    gulp.watch(filesList)
      .on('unlink', (path) => {
        deleteFile({
          path,
          event: 'unlink'
        }, folder.src, folder.build);
      })
      .on('add', gulp.series(copyFiles));

    gulp.watch(`${folder.src}/images/**/*`)
      .on('unlink', (path) => {
        deleteFile({
          path,
          event: 'unlink'
        }, folder.src, folder.build);
      })
      .on('add', gulp.series(buildImages));

    gulp.watch([`./${folder.build}/**/*`, `!./${folder.build}/**/*.map`])
      .on('change', options.browserSyncInstance.reload)
      .on('unlink', options.browserSyncInstance.reload)
      .on('add', options.browserSyncInstance.reload);
  };
};

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

  async function cleaning(file) {
    const config = {
      force: true,
      dot: true,
    };

    const filePathSrc = path.relative(path.resolve(global.folder.src), file);
    const filePathBuild = `./${global.folder.dev}/${filePathSrc}`;

    await del(filePathBuild, config);
  }

  return () => {
    gulp.watch(`./${global.folder.src}/html/**/*.html`, gulp.series(global.task.buildHtml, global.task.lintHtml));

    gulp.watch(`./${global.folder.src}/scss/**/*.scss`, gulp.series(global.task.buildStyles, global.task.buildStylesCustom));

    gulp.watch(`./${global.folder.src}/js/**/*.js`, gulp.series(global.task.lintJs, global.task.buildJs));

    gulp.watch(`./${global.folder.src}/vendor_entries/**/*.js`, gulp.series(global.task.buildJs));

    gulp.watch(`./${global.folder.src}/vendor_entries/**/*.scss`, gulp.series(global.task.buildStylesVendors));

    gulp.watch(filesList)
      .on('unlink', (file) => cleaning(file))
      .on('add', gulp.series(global.task.copyFiles));

    gulp.watch(`${global.folder.src}/images/**`)
      .on('unlink', (file) => cleaning(file))
      .on('add', gulp.series(global.task.buildImages));

    gulp.watch([`./${global.folder.dev}/**`, `!./${global.folder.dev}/**/*.map`])
      .on('change', options.browserSyncInstance.reload)
      .on('unlink', options.browserSyncInstance.reload)
      .on('add', options.browserSyncInstance.reload);
  };
};

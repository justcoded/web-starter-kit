/**
 *
 *  Web Starter Kit
 *  Copyright (c) 2020 JustCoded.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:

 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

(() => {
  'use strict';

  const cfg = require('./gulp-config.js');
  const gulp = require('gulp');
  const del = require('del');
  const path = require('path');
  const browserSync = require('browser-sync').create();

  /**
   * Require gulp task from file
   * @param  {string} taskName     Task name
   * @param  {String} path         Path to task file
   * @param  {Object} options      Options for task
   * @param  {Array}  dependencies Task dependencies
   */
  function requireTask(taskName, path, options, dependencies) {
    let settings = options || {};
    const taskFunction = function (callback) {
      if (settings.checkProduction) {
        settings.isProduction = process.argv[process.argv.length - 1] === 'build';
      }

      let task = require(path + taskName + '.js').call(this, settings);

      return task(callback);
    };

    settings.taskName = taskName;

    if (!Array.isArray(dependencies)) {
      gulp.task(taskName, taskFunction);
    } else if (dependencies.length === 1) {
      gulp.task(taskName, gulp.series(dependencies[0], taskFunction));
    } else {
      gulp.task(taskName, gulp.series(dependencies, taskFunction));
    }
  }

  /**
   * Remove image(s) from build folder if corresponding
   * images were deleted from source folder
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

  /**
   * Template HTML
   */
  requireTask(`${cfg.task.buildHtml}`, `./${cfg.folder.tasks}/`, {
    templates: cfg.buildHtml.templates,
    dest: cfg.buildHtml.dest
  });

  /**
   * Lint HTML
   */
  requireTask(`${cfg.task.lintHtml}`, `./${cfg.folder.tasks}/`);

  /**
   * Lint JS
   */
  requireTask(`${cfg.task.lintJs}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src
  });

  /**
   * Build JS
   */
  requireTask(`${cfg.task.buildJs}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    mainJs: cfg.file.mainJs,
    checkProduction: true
  });

  /**
   * Build JS vendor (concatenate vendors array)
   */
  requireTask(`${cfg.task.buildJsVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    vendorJs: cfg.file.vendorJs,
    vendorJsMin: cfg.file.vendorJsMin,
    checkProduction: true
  });

  /**
   * Build styles for application
   */
  requireTask(`${cfg.task.buildStyles}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    mainScss: cfg.file.mainScss,
    mainScssMin: cfg.file.mainScssMin,
    checkProduction: true
  });

  /**
   * Build custom files listed in the config
   */
  requireTask(`${cfg.task.buildStylesCustom}`, `./${cfg.folder.tasks}/`, {
    sassFilesInfo: cfg.getPathesForSassCompiling(),
    dest: cfg.folder.build
  });

  /**
   * Build styles for vendor
   */
  requireTask(`${cfg.task.buildStylesVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    vendorScss: cfg.file.vendorScss,
    vendorScssMin: cfg.file.vendorScssMin,
    checkProduction: true
  });

  /**
   * Minify images
   */
  requireTask(`${cfg.task.imageMin}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build
  });

  /**
   * Clean build folder
   */
  requireTask(`${cfg.task.cleanBuild}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.build
  });

  /**
   * Clean production folder
   */
  requireTask(`${cfg.task.cleanProd}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.prod
  });


  /**
   * Copy folders to the build folder
   */
  requireTask(`${cfg.task.copyFolders}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.build,
    foldersToCopy: cfg.getPathesToCopy()
  });

  /**
   * Copy folders to the production folder
   */
  requireTask(`${cfg.task.copyFoldersProd}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.prod,
    foldersToCopy: cfg.getPathesToCopyForProduction()
  });

  /**
   * Start browserSync server
   */
  requireTask(`${cfg.task.browserSync}`, `./${cfg.folder.tasks}/`, {
    mainHtml: cfg.file.mainHtml,
    dest: cfg.buildHtml.dest,
    browserSync
  });

  /**
   * Watch for file changes
   */
  requireTask(`${cfg.task.watch}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    imageExtensions: cfg.imageExtensions,
    browserSync,
    deleteFile,
    tasks: {
      lintJs: cfg.task.lintJs,
      buildJs: cfg.task.buildJs,
      buildStyles: cfg.task.buildStyles,
      buildStylesCustom: cfg.task.buildStylesCustom,
      buildHtml: cfg.task.buildHtml,
      lintHtml: cfg.task.lintHtml,
      imageMin: cfg.task.imageMin
    }
  }, false);

  /**
   * Default Gulp task
   */
  gulp.task('default', gulp.series(
    cfg.task.cleanBuild,
    cfg.task.lintJs,
    gulp.parallel(
      gulp.series(
        cfg.task.buildHtml,
        cfg.task.lintHtml,
      ),
      gulp.series(
        cfg.task.buildStyles,
        cfg.task.buildStylesCustom,
        cfg.task.buildStylesVendors,
      ),
      gulp.series(
        cfg.task.buildJs,
        cfg.task.buildJsVendors,
      ),
    ),
    cfg.task.imageMin,
    cfg.task.copyFolders,
    gulp.parallel(
      cfg.task.browserSync,
      cfg.task.watch
    )
  ));

  /**
   * Creating production folder without unnecessary files
   */
  gulp.task('build', gulp.series(
    gulp.parallel(
      cfg.task.cleanProd,
      cfg.task.cleanBuild
    ),
    cfg.task.lintJs,
    gulp.parallel(
      gulp.series(
        cfg.task.buildHtml,
        cfg.task.lintHtml,
      ),
      gulp.series(
        cfg.task.buildStyles,
        cfg.task.buildStylesCustom,
        cfg.task.buildStylesVendors,
      ),
      gulp.series(
        cfg.task.buildJs,
        cfg.task.buildJsVendors,
      ),
    ),
    cfg.task.imageMin,
    cfg.task.copyFolders,
    cfg.task.copyFoldersProd
  ), true);
})();

/**
 *
 *  Web Starter Kit
 *  Copyright (c) 2017 JustCoded.
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

  const cfg         = require('./gulp-config.js'),
        self        = this,
        gulp        = require('gulp'),
        del         = require('del'),
        path        = require('path'),
        notifier    = require('node-notifier'),
        gutil       = require('gulp-util'),
        browserSync = require('browser-sync').create();

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
        settings.isProduction = process.argv[process.argv.length - 1] === 'production';
      }

      let task = require(path + taskName + '.js').call(this, settings);

      return task(callback);
    }

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
   * Hint HTML
   */
  requireTask(`${cfg.task.htmlHint}`, `./${cfg.folder.tasks}/`);

  /**
   * Lint ES
   */

  requireTask(`${cfg.task.esLint}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src
  });

  /**
   * Build custom js
   */
  requireTask(`${cfg.task.buildCustomJs}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    mainJs: cfg.file.mainJs,
    checkProduction: true,
    showError: showError
  });

  /**
   * Build js vendor (concatenate vendors array)
   */
  requireTask(`${cfg.task.buildJsVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    vendorJs: cfg.file.vendorJs,
    vendorJsMin: cfg.file.vendorJsMin
  });

  /**
   * Build styles for application from SASS
   */
  requireTask(`${cfg.task.buildSass}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    mainScss: cfg.file.mainScss,
    mainScssMin: cfg.file.mainScssMin,
    versions: cfg.autoprefixer.versions,
    self: self,
    showError: showError
  });

  /**
   * Compile scss files listed in the config
   */
  requireTask(`${cfg.task.buildSassFiles}`, `./${cfg.folder.tasks}/`, {
    sassFilesInfo: cfg.getPathesForSassCompiling(),
    dest: cfg.folder.build,
    versions: cfg.autoprefixer.versions,
    self: self,
    showError: showError
  });

  /**
   * Build production styles for application from SASS
   */
  requireTask(`${cfg.task.buildSassProd}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    mainScss: cfg.file.mainScss,
    mainScssMin: cfg.file.mainScssMin,
    versions: cfg.autoprefixer.versions,
    showError: showError
  });

  /**
   * Build styles for vendor from SASS
   */
  requireTask(`${cfg.task.buildStylesVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    vendorScss: cfg.file.vendorScss,
    vendorScssMin: cfg.file.vendorScssMin,
    showError: showError
  });

  /**
   * Minify images
   */
  requireTask(`${cfg.task.imageMin}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build
  });

  /**
   * Clean image build directory
   */
  requireTask(`${cfg.task.imageClean}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.build
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
  requireTask(`${cfg.task.copyFoldersProduction}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.prod,
    foldersToCopy: cfg.getPathesToCopyForProduction()
  });

  /**
   * Start browserSync server
   */
  requireTask(`${cfg.task.browserSync}`, `./${cfg.folder.tasks}/`, {
    mainHtml: cfg.file.mainHtml,
    browserSync: browserSync
  });

  /**
   * Watch for file changes
   */
  requireTask(`${cfg.task.watch}`, `./${cfg.folder.tasks}/`, {
    sassFilesInfo: cfg.getPathesForSassCompiling(),
    src: cfg.folder.src,
    dest: cfg.folder.build,
    imageExtensions: cfg.imageExtensions,
    browserSync: browserSync,
    deleteFile: deleteFile,
    tasks: {
      buildSassFiles: cfg.task.buildSassFiles,
      buildCustomJs: cfg.task.buildCustomJs,
      buildSass: cfg.task.buildSass,
      esLint: cfg.task.esLint,
      htmlHint: cfg.task.htmlHint,
      imageMin: cfg.task.imageMin
    }
  }, false);

  /**
   * Default Gulp task
   */
  gulp.task('default', gulp.series(
    cfg.task.cleanBuild,
    gulp.parallel(
      cfg.task.buildCustomJs,
      cfg.task.buildJsVendors,
      cfg.task.buildSass,
      cfg.task.buildSassFiles,
      cfg.task.buildStylesVendors,
      cfg.task.htmlHint,
      cfg.task.esLint,
      cfg.task.imageMin
    ),
    cfg.task.copyFolders,
    gulp.parallel(
      cfg.task.browserSync,
      cfg.task.watch
    )
  ));

  /**
   * Dev Gulp task without usage of browserSync
   */
  gulp.task('dev', gulp.series(
    cfg.task.cleanBuild,
    gulp.parallel(
      cfg.task.buildCustomJs,
      cfg.task.buildJsVendors,
      cfg.task.buildSass,
      cfg.task.buildSassFiles,
      cfg.task.buildStylesVendors,
      cfg.task.htmlHint,
      cfg.task.imageMin
    ),
    cfg.task.copyFolders,
    cfg.task.watch
  ));

  /**
   * Creating production folder without unnecessary files
   */
  gulp.task('production', gulp.series(
    gulp.parallel(
      cfg.task.cleanProd,
      cfg.task.cleanBuild
    ),
    gulp.parallel(
      cfg.task.buildCustomJs,
      cfg.task.buildJsVendors,
      cfg.task.buildSassProd,
      cfg.task.buildSassFiles,
      cfg.task.buildStylesVendors,
      cfg.task.htmlHint,
      cfg.task.esLint,
      cfg.task.imageMin
    ),
    cfg.task.copyFolders,
    cfg.task.copyFoldersProduction
  ), true);

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
   * Show error in console
   * @param  {String} preffix Title of the error
   * @param  {String} err     Error message
   */
  function showError(preffix, err) {
    gutil.log(gutil.colors.white.bgRed(' ' + preffix + ' '), gutil.colors.white.bgBlue(' ' + err.message + ' '));
    notifier.notify({
      title: preffix,
      message: err.message
    });
    this.emit('end');
  }
})();
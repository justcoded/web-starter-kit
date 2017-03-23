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
   * @param  {string} taskName    Task name
   * @param  {String} path        Path to task file
   * @param  {Object} options     Options for task
   */
  function requireTask(taskName, path, options) {
    let settings = options || {};

    settings.taskName = taskName;

    gulp.task(taskName, function(callback) {
      if(settings.checkProduction) {
        settings.isProduction = this.seq.slice(-1)[0] === 'production';
      }

      let task = require(path + taskName + '.js').call(this, settings);

      return task(callback);
    });
  }

  /**
   * Hint HTML
   */
  requireTask(`${cfg.task.htmlHint}`, `./${cfg.folder.tasks}/`);

  /**
   * Hint JS
   */
  requireTask(`${cfg.task.jsHint}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src
  });

  /**
   * Build custom js
   */
  requireTask(`${cfg.task.buildCustomJs}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    checkProduction: true
  });

  /**
   * Build js vendor (concatenate vendors array)
   */
  requireTask(`${cfg.task.buildJsVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build
  });

  /**
   * Build styles for application from SASS
   */
  requireTask(`${cfg.task.buildSass}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    self: self,
    showError: showError
  });

  /**
   * Build production styles for application from SASS
   */
  requireTask(`${cfg.task.buildSassProd}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    showError: showError
  });

  /**
   * Build styles for vendor from SASS
   */
  requireTask(`${cfg.task.buildStylesVendors}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build
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
   * Clean production folder
   */
  requireTask(`${cfg.task.cleanProd}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.prod
  });

  /**
   * Copy custom fonts to the build folder
   */
  requireTask(`${cfg.task.copyFonts}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build
  });

  /**
   * Start browserSync server
   */
  requireTask(`${cfg.task.browserSync}`, `./${cfg.folder.tasks}/`, {
    browserSync: browserSync
  });

  /**
   * Watch for file changes
   */
  requireTask(`${cfg.task.watch}`, `./${cfg.folder.tasks}/`, {
    src: cfg.folder.src,
    dest: cfg.folder.build,
    browserSync: browserSync,
    deleteFile: deleteFile,
    tasks: {
      buildCustomJs: `${cfg.task.buildCustomJs}`,
      buildSass: `${cfg.task.buildSass}`,
      jsHint: `${cfg.task.jsHint}`,
      htmlHint: `${cfg.task.htmlHint}`,
      imageMin: `${cfg.task.imageMin}`
    }
  });

  /**
   * Creating production folder without unnecessary files
   */
  gulp.task('production',
    [
      `${cfg.task.buildCustomJs}`,
      `${cfg.task.buildSassProd}`,
      `${cfg.task.buildStylesVendors}`,
      `${cfg.task.cleanProd}`,
      `${cfg.task.htmlHint}`,
      `${cfg.task.jsHint}`
    ], 
    () => {
      gulp.src([
        './**/*',
        `${cfg.folder.src}/`,
        `${cfg.folder.src}/**/*`,
        '!bower/',
        '!bower/**/*',
        '!node_modules/**/*',
        '!node_modules/',
        `!${cfg.folder.build}/css/**.map`,
        `!${cfg.folder.build}/images/info.txt`,
        '!.bowerrc',
        '!bower.json',
        '!.gitignore',
        '!gulpfile.js',
        '!LICENSE',
        '!package.json',
        `!${cfg.folder.prod}`,
        '!README.md',
        '!CONTRIBUTING.md'
      ])
      .pipe(gulp.dest(`./${cfg.folder.prod}`));
    }
  );

  /**
   * Default Gulp task
   */
  gulp.task('default', [
    `${cfg.task.buildCustomJs}`,
    `${cfg.task.buildSass}`,
    `${cfg.task.buildJsVendors}`,
    `${cfg.task.buildStylesVendors}`,
    `${cfg.task.copyFonts}`,
    `${cfg.task.imageMin}`,
    `${cfg.task.browserSync}`,
    `${cfg.task.watch}`
  ]);

  /**
   * Dev Gulp task without usage of browserSync
   */
  gulp.task('dev', [
    `${cfg.task.buildCustomJs}`,
    `${cfg.task.buildSass}`,
    `${cfg.task.buildJsVendors}`,
    `${cfg.task.buildStylesVendors}`,
    `${cfg.task.copyFonts}`,
    `${cfg.task.imageMin}`,
    `${cfg.task.watch}`
  ]);

  /**
   * Remove image(s) from build folder if corresponding
   * images were deleted from source folder
   * @param  {Object} event    Event object
   * @param  {String} src      Name of the source folder
   * @param  {String} dest     Name of the destination folder
   */
  function deleteFile(file, src, dest) {
    let fileName = file.history.toString().split('/').pop();
    console.log(`${file.event}: ${fileName}`);

    let filePathFromSrc = path.relative(path.resolve(src), file.folder);
    let destFilePath = path.resolve(dest, filePathFromSrc);

    del.sync(destFilePath);
  }

  /**
   * Show error in console
   * @param  {String} preffix Title of the error
   * @param  {String} err     Error message
   */
  function showError(preffix, err) {
    gutil.log(gutil.colors.white.bgRed(' ' + preffix + ' '), gutil.colors.white.bgBlue(' ' + err.message + ' '));
    notifier.notify({ title: preffix, message: err.message });
    this.emit('end');
  }
})();

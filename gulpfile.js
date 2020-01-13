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
   * Template HTML
   */
  requireTask(`${cfg.task.buildHtml}`, `./${cfg.folder.tasks}/`, {
    templates: cfg.buildHtml.templates,
    dest: cfg.buildHtml.dest,
  });

  /**
   * Lint HTML
   */
  requireTask(`${cfg.task.lintHtml}`, `./${cfg.folder.tasks}/`, {
    dir: cfg.folder.build,
  });

  /**
   * Lint JS
   */
  requireTask(`${cfg.task.lintJs}`, `./${cfg.folder.tasks}/`);

  /**
   * Build JS
   */
  requireTask(`${cfg.task.buildJs}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.build,
    mainJs: cfg.file.mainJs,
    publicJs: cfg.file.publicJs,
  });

  /**
   * Build JS vendor (concatenate vendors array)
   */
  requireTask(`${cfg.task.buildJsVendors}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.build,
    temp: cfg.folder.temp,
    vendorJs: cfg.file.vendorJs,
    vendorJsTemp: cfg.file.vendorJsTemp,
  });

  /**
   * Build styles for application
   */
  requireTask(`${cfg.task.buildStyles}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.build,
    mainScss: cfg.file.mainScss,
    checkProduction: true,
  });

  /**
    * Build styles custom files listed in the config
    */
  requireTask(`${cfg.task.buildStylesCustom}`, `./${cfg.folder.tasks}/`, {
    stylesCustomInfo: cfg.getPathesForStylesCustom(),
    dest: cfg.folder.build,
    sortType: cfg.buildStyles.sortType,
    checkProduction: true,
  });

  /**
   * Build styles for vendor from Sass
   */
  requireTask(`${cfg.task.buildStylesVendors}`, `./${cfg.folder.tasks}/`, {
    dest: cfg.folder.build,
    vendorScss: cfg.file.vendorScss,
  });

  /**
   * Clean build folder
   */
  requireTask(`${cfg.task.cleanBuild}`, `./${cfg.folder.tasks}/`, {
    dir: cfg.folder.build,
  });

  /**
   * Start browserSync server
   */
  requireTask(`${cfg.task.browserSync}`, `./${cfg.folder.tasks}/`, {
    mainHtml: cfg.file.mainHtml,
    dir: cfg.folder.build,
    browserSync,
  });

  /**
   * Watch for file changes
   */
  requireTask(`${cfg.task.watch}`, `./${cfg.folder.tasks}/`, {
    dir: cfg.folder.build,
    browserSync,
    tasks: {
      lintJs: cfg.task.lintJs,
      buildJs: cfg.task.buildJs,
      buildStyles: cfg.task.buildStyles,
      buildStylesCustom: cfg.task.buildStylesCustom,
      buildHtml: cfg.task.buildHtml,
      lintHtml: cfg.task.lintHtml,
    },
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
    gulp.parallel(
      cfg.task.browserSync,
      cfg.task.watch
    )
  ));

  /**
  * Production Gulp task
  */
  gulp.task('build', gulp.series(
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
    )
  ));

  /**
   * Linting JS files
   */
  gulp.task('lint-js', gulp.series(cfg.task.lintJs));
})();

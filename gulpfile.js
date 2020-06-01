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

'use strict';

const gulp = require('gulp');
const browserSyncInstance = require('browser-sync').create();

const global = require('./gulp-config.js');

/**
 * Clean build folders
 */
gulp.task(global.task.cleanBuild, require('./tasks/clean-build')());

/**
 * Lint HTML
 */
gulp.task(global.task.lintHtml, require('./tasks/lint-html')());

/**
 * Template HTML
 */
gulp.task(global.task.buildHtml, require('./tasks/build-html')());

/**
 * Build styles for application
 */
gulp.task(global.task.buildStyles, require('./tasks/build-styles')());

/**
 * Build styles custom files listed in the config
 */
gulp.task(global.task.buildStylesCustom, require('./tasks/build-styles-custom')());

/**
 * Build styles for vendor
 */
gulp.task(global.task.buildStylesVendors, require('./tasks/build-styles-vendors')());

/**
 * Lint JS
 */
gulp.task(global.task.lintJs, require('./tasks/lint-js')());

/**
 * Fix JS files
 */
gulp.task(global.task.fixJs, require('./tasks/lint-js')());

/**
 * Build JS
 */
gulp.task(global.task.buildJs, require('./tasks/build-js')());

/**
 * Copy & minify images
 */
gulp.task(global.task.buildImages, require('./tasks/build-images')());

/**
 * Copy folders to the build folder
 */
gulp.task(global.task.copyFiles, require('./tasks/copy-files')());

/**
 * Copy folders to the production folder
 */
gulp.task(global.task.copyFilesProd, require('./tasks/copy-files-production')());

/**
 * Start browserSync server
 */
gulp.task(global.task.browserSync, require('./tasks/browser-sync-server')({ browserSyncInstance }));

/**
 * Watch for file changes
 */
gulp.task(global.task.watch, require('./tasks/watch')({ browserSyncInstance }));

/**
 * Develop mode - with browser sync, file watch & live reload
 */
gulp.task('default', gulp.series(
  global.task.cleanBuild,
  global.task.lintJs,
  gulp.parallel(
    gulp.series(
      global.task.buildHtml,
      global.task.lintHtml,
    ),
    gulp.series(
      global.task.buildStyles,
      global.task.buildStylesCustom,
      global.task.buildStylesVendors,
    ),
    global.task.buildJs,
  ),
  global.task.buildImages,
  global.task.copyFiles,
  gulp.parallel(
    global.task.browserSync,
    global.task.watch,
  ),
));

/**
 * Production mode - creating production folder without unnecessary files
 */
gulp.task(global.task.build, gulp.series(
  global.task.cleanBuild,
  global.task.lintJs,
  gulp.parallel(
    gulp.series(
      global.task.buildHtml,
      global.task.lintHtml,
    ),
    gulp.series(
      global.task.buildStyles,
      global.task.buildStylesCustom,
      global.task.buildStylesVendors,
    ),
    global.task.buildJs,
  ),
  global.task.buildImages,
  global.task.copyFiles,
  global.task.copyFilesProd,
));

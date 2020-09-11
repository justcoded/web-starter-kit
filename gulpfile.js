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

const cleanBuild = require('./tasks/clean-build');
const lintHtml = require('./tasks/lint-html');
const buildHtml = require('./tasks/build-html');
const buildStyles = require('./tasks/build-styles');
const buildStylesCustom = require('./tasks/build-styles-custom');
const buildStylesVendors = require('./tasks/build-styles-vendors');
const lintJs = require('./tasks/lint-js');
const buildJs = require('./tasks/build-js');
const buildImages = require('./tasks/build-images');
const copyFiles = require('./tasks/copy-files');
const copyFilesProd = require('./tasks/copy-files-production');
const browserSync = require('./tasks/browser-sync-server');
const watch = require('./tasks/watch');

/**
 * Clean build folders
 */
gulp.task(global.task.cleanBuild, cleanBuild());

/**
 * Lint HTML
 */
gulp.task(global.task.lintHtml, lintHtml());

/**
 * Template HTML
 */
gulp.task(global.task.buildHtml, buildHtml());

/**
 * Build styles for application
 */
gulp.task(global.task.buildStyles, buildStyles());

/**
 * Build styles custom files listed in the config
 */
gulp.task(global.task.buildStylesCustom, buildStylesCustom());

/**
 * Build styles for vendor
 */
gulp.task(global.task.buildStylesVendors, buildStylesVendors());

/**
 * Lint JS
 */
gulp.task(global.task.lintJs, lintJs());

/**
 * Fix JS files
 */
gulp.task(global.task.fixJs, lintJs());

/**
 * Build JS
 */
gulp.task(global.task.buildJs, buildJs());

/**
 * Copy & minify images
 */
gulp.task(global.task.buildImages, buildImages());

/**
 * Copy folders to the build folder
 */
gulp.task(global.task.copyFiles, copyFiles());

/**
 * Copy folders to the production folder
 */
gulp.task(global.task.copyFilesProd, copyFilesProd());

/**
 * Start browserSync server
 */
gulp.task(global.task.browserSync, browserSync({ browserSyncInstance }));

/**
 * Watch for file changes
 */
gulp.task(global.task.watch, watch({ browserSyncInstance }));

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
    gulp.series(
      global.task.buildJs,
    ),
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
    gulp.series(
      global.task.buildJs,
    ),
  ),
  global.task.buildImages,
  global.task.copyFiles,
  global.task.copyFilesProd,
));

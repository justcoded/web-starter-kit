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

const cleanBuild = require('./tasks/clean-build');
const lintHtml = require('./tasks/lint-html');
const buildHtml = require('./tasks/build-html');
const buildStyles = require('./tasks/build-styles');
const buildStylesCustom = require('./tasks/build-styles-custom');
const buildStylesVendors = require('./tasks/build-styles-vendors');
const lintJs = require('./tasks/lint-js');
const buildJs = require('./tasks/build-js');
const buildJsVendors = require('./tasks/build-js-vendors');
const buildImages = require('./tasks/build-images');
const copyFiles = require('./tasks/copy-files');
const copyFilesProd = require('./tasks/copy-files-production');
const browserSync = require('./tasks/browser-sync-server');
const watch = require('./tasks/watch');

/**
 * Default Gulp task
 */
exports['default'] = gulp.series(
  cleanBuild(),
  lintJs(),
  gulp.parallel(
    gulp.series(
      buildHtml(),
      lintHtml(),
    ),
    gulp.series(
      buildStyles(),
      buildStylesCustom(),
      buildStylesVendors(),
    ),
    gulp.series(
      buildJs(),
      buildJsVendors(),
    ),
  ),
  buildImages(),
  copyFiles(),
  gulp.parallel(
    browserSync({ browserSyncInstance }),
    watch({ browserSyncInstance }),
  ),
);

/**
 * Creating production folder without unnecessary files
 */
exports['build'] = gulp.series(
  cleanBuild(),
  lintJs(),
  gulp.parallel(
    gulp.series(
      buildHtml(),
      lintHtml(),
    ),
    gulp.series(
      buildStyles(),
      buildStylesCustom(),
      buildStylesVendors(),
    ),
    gulp.series(
      buildJs(),
      buildJsVendors(),
    ),
  ),
  buildImages(),
  copyFiles(),
  copyFilesProd(),
);

/**
* Fix JS files
*/
exports['fix-js'] = lintJs();

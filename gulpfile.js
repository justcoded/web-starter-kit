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

  const gulp = require('gulp'),
    self = this,
    sass = require('gulp-sass'),
    del = require('del'),
    path = require('path'),
    gcmq = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    newer = require('gulp-newer'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notifier = require('node-notifier'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    cssnano = require('gulp-cssnano'),
    debug = require('gulp-debug'),
    rimraf = require('gulp-rimraf'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    filesExist = require('files-exist'),
    cssimport = require('gulp-cssimport'),
    browserSync = require('browser-sync').create();

  const Paths = {
    build: 'assets',
    src: 'src',
    buildImages: 'images',
    srcImages: 'images',
    srcJS: 'js',
    fonts: 'fonts',
    scss: 'scss',
    buildJS: 'js',
    buildCss: 'css',
    production: 'production'
  }

  function requireTask(taskName, path, options) {
    let settings = options || {};

    settings.taskName = taskName;

    gulp.task(taskName, function(callback) {
      if(settings.checkProduction) {
        settings.enableDebug = this.seq.slice(-1)[0] === 'production';
      }

      let task = require(path).call(this, settings);

      return task(callback);
    });
  }

  /**
   * Hint HTML
   */
  requireTask('html-hint', './tasks/html-hint.js');

  /**
   * Hint JS
   */
  requireTask('js-hint', './tasks/js-hint.js');

  /**
   * Build custom js
   */
  requireTask('build-custom-js', './tasks/build-custom-js.js', {
    checkProduction: true
  });

  /**
   * Build js vendor (concatenate vendors array)
   */
  requireTask('build-js-vendors', './tasks/build-js-vendors.js');

  /**
   * Build styles for application from SASS
   */
  requireTask('build-sass', './tasks/build-sass.js', {
    self: self
  });

  /**
   * Build production styles for application from SASS
   */
  requireTask('build-sass-production', './tasks/build-sass-production.js');

  /**
   * Build styles for vendor from SASS
   */
  requireTask('build-styles-vendors', './tasks/build-styles-vendors.js');

  /**
   * Minify images
   */
  requireTask('image-min', './tasks/image-min.js');

  /**
   * Clean image build directory
   */
  requireTask('image-clean', './tasks/image-clean.js');

  /**
   * Clean production folder
   */
  requireTask('clean-production', './tasks/clean-production.js');

  /**
   * Copy custom fonts to the build folder
   */
  requireTask('copy-fonts', './tasks/copy-fonts.js');

  /**
   * Start browserSync server
   */
  gulp.task('browserSyncServer', function() {
    // if index.html exist - open it, else show folder
    let listDirectory = fs.existsSync('index.html') ? false : true;

    browserSync.init({
      server: {
        baseDir: "./",
        directory: listDirectory
      },
      snippetOptions: {
          // Provide a custom Regex for inserting the snippet.
          rule: {
              match: /$/i,
              fn: function(snippet, match) {
                  return snippet + match;
              }
          }
      },
      port: 8080
    });
  });

  /**
   * Watch for file changes
   */
  gulp.task('watch', () => {
    gulp.watch(`./src/js/**/*`, ['build-custom-js', 'js-hint']);

    gulp.watch(`src/scss/**/*`, ['build-sass']);

    watch(`src/images/**/*`, (file) => {
      if(file.event === 'unlink') {
        deleteFile(file, 'src', 'assets');
      } else {
        gulp.start('image-min');
      }
    });

    gulp.watch(`./*.html`, ['html-hint']);

    gulp.watch([`./assets/**/*`, './*.html']).on('change', browserSync.reload);
  });

  /**
   * Creating production folder without unnecessary files
   */
  gulp.task('production',
    [
      'build-custom-js',
      'build-sass-production',
      'build-styles-vendors',
      'cleanProduction',
      'html-hint',
      'js-hint'
    ], 
    () => {
      gulp.src([
        './**/*',
        `!${Paths.src}/`,
        `!${Paths.src}/**/*`,
        '!bower/',
        '!bower/**/*',
        '!node_modules/**/*',
        '!node_modules/',
        `!${Paths.build}/${Paths.buildCss}/**.map`,
        `!${Paths.build}/${Paths.srcImages}/info.txt`,
        '!.bowerrc',
        '!bower.json',
        '!.gitignore',
        '!gulpfile.js',
        '!LICENSE',
        '!package.json',
        `!${Paths.production}`,
        '!README.md'
      ])
      .pipe(gulp.dest(`./${Paths.production}`));
    }
  );

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

    let filePathFromSrc = path.relative(path.resolve(src), file.path);
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

  /**
   * Default Gulp task
   */
  gulp.task('default', [
    'build-custom-js',
    'build-sass',
    'build-js-vendors',
    'build-styles-vendors',
    'copy-fonts',
    'image-min',
    'browserSyncServer',
    'watch'
  ]);

  /**
   * Dev Gulp task without usage of browserSync
   */
  gulp.task('dev', [
    'build-custom-js',
    'build-sass',
    'build-js-vendors',
    'build-styles-vendors',
    'copy-fonts',
    'image-min',
    'watch'
  ]);

}());

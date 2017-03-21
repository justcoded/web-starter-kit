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
    browserSync = require('browser-sync').create(),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint');

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

  /**
   * JS hint
   */
  gulp.task('hintJs', () => {
    gulp.src(`./${Paths.src}/${Paths.srcJS}/**/*.js`)
      .pipe(jshint({
        'esversion': 6
      }))
      .pipe(jshint.reporter())
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: 'JS'
      }));
  });

  /**
   * HTML hint
   */
  gulp.task('hintHtml', () => {
    gulp.src(`./*.html`)
      .pipe(htmlhint())
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failReporter({
        suppress: true }
      ))
      .on('error', notify.onError({
        title: 'HTML'
      }));
  });

  /**
   * Build custom js
   */
  gulp.task('buildCustomJS', function() {
    //remove sourcemap for production
    let enableDebug = this.seq.slice(-1)[0] === 'production';

    return browserify({
        entries: `./${Paths.src}/${Paths.srcJS}/app.js`,
        debug: !enableDebug
      })
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle().on('error', (err) => {
        showError.apply(this, ['JS error', err])
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest(`./${Paths.build}/${Paths.buildJS}`))
      .pipe(browserSync.stream());
  });

  /**
   * Build js vendor (concatenate vendor array)
   */
  gulp.task('buildJsVendors', () => {
    let jsVendors = require(`./${Paths.src}/vendor_entries/vendor.js`);

    gulp.src(filesExist(jsVendors))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(`./${Paths.build}/${Paths.buildJS}`));
  });

  /**
   * Build styles for application from SASS
   */
  gulp.task('buildSass', () => {
    gulp.src(`./${Paths.src}/${Paths.scss}/style.scss`)
      .pipe(rename('style.min.css'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sass().on('error', (err) => {
        showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(autoprefixer('last 4 versions'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`./${Paths.build}/${Paths.buildCss}`))
      .pipe(browserSync.stream());
  });

  /**
   * Build production styles for application from SASS
   */
  gulp.task('buildSassProduction', () => {
    gulp.src(`./${Paths.src}/${Paths.scss}/style.scss`)
      .pipe(sass().on('error', (err) => {
        showError.apply(this, ['Sass compile error', err]);
      }))
      .pipe(rename('style.min.css'))
      .pipe(gcmq())
      .pipe(cssnano({
        safe: true
      }))
      .pipe(autoprefixer('last 4 versions'))
      .pipe(gulp.dest(`./${Paths.build}/${Paths.buildCss}`));
  });

  /**
   * Build styles for vendor from SASS
   */
  gulp.task('buildStylesVendors', () => {
    gulp.src(`./${Paths.src}/vendor_entries/vendor.scss`)
      .pipe(sass().on('error', (err) => {
        showError.apply(this, ['Sass compile error (vendor)', err]);
      }))
      .pipe(cssimport())
      .pipe(rename('vendor.min.css'))
      .pipe(cssnano({
        safe: true
      }))
      .pipe(gulp.dest(`./${Paths.build}/${Paths.buildCss}`));
  });

  /**
   * Images minification
   */
  gulp.task('imageMin', () => {
    gulp.src(`./${Paths.src}/${Paths.srcImages}/**/*`)
      .pipe(newer(`${Paths.build}/${Paths.buildImages}/`))
      .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(`${Paths.build}/${Paths.buildImages}/`))
      .pipe(browserSync.stream());
  });

  /**
   * Clean image build directory
   */
  gulp.task('imageClean', () => {
    gulp.src(`${Paths.build}/${Paths.buildImages}/`).pipe(rimraf());
  });

  /**
   * Watch for file changes
   */
  gulp.task('watch', () => {
    gulp.watch(`./${Paths.src}/${Paths.srcJS}/**/*`, ['buildCustomJS', 'hintJs']);
    gulp.watch(`${Paths.src}/${Paths.scss}/**/*`, ['buildSass']);
    watch(`${Paths.src}/${Paths.srcImages}/**/*`, (file) => {
      if(file.event === 'unlink') {
        deleteFile(file, 'src', 'assets');
      } else {
        gulp.start('imageMin');
      }
    });
    gulp.watch(`./*.html`, ['hintHtml']);
    gulp.watch([`./${Paths.build}/**/*`, './*.html']).on('change', browserSync.reload);
  });

  /**
   * Starting browserSync server
   */

  //if index.html exist - open it, else show  folder
  let listDirectory = fs.existsSync('index.html') ? false : true;

  gulp.task('browserSyncServer', () => {
    browserSync.init({
      server: {
        baseDir: "./",
        directory: listDirectory
      },
      snippetOptions: {
          // Provide a custom Regex for inserting the snippet.
          rule: {
              match: /$/i,
              fn: (snippet, match) => snippet + match
          }
      },
      port: 8080
    });
  });

  /**
   * Creating production folder without unnecessary files
   */
  gulp.task('production', ['buildCustomJS', 'buildSassProduction', 'buildStylesVendors', 'cleanProduction', 'hintHtml', 'hintJs'], () => {
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
  });

  /**
   * Clean production folder
   */
  gulp.task('cleanProduction', () => {
    gulp.src(`./${Paths.production}/`, {
      read: false
    })
      .pipe(rimraf());
  });

  /**
   * Copy custom fonts to the build folder
   */
  gulp.task('copyFonts', () => {
    gulp.src([`./${Paths.src}/${Paths.fonts}/**/*`])
      .pipe(gulp.dest(`./${Paths.build}/${Paths.fonts}/`));
  });

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
    this.emit("end");
  }
  // Default Gulp Task
  gulp.task('default', [
    'buildCustomJS',
    'buildSass',
    'buildJsVendors',
    'buildStylesVendors',
    'copyFonts',
    'imageMin',
    'browserSyncServer',
    'watch'
  ]);
  gulp.task('dev', [
    'buildCustomJS',
    'buildSass',
    'buildJsVendors',
    'buildStylesVendors',
    'copyFonts',
    'imageMin',
    'watch'
  ]);

}());

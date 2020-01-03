/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const del = require('del');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');

module.exports = function (options) {
  const jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);
  const noneES5 = jsVendors.es5.length === 0 ? true : false;
  const noneES6 = jsVendors.es6.length === 0 ? true : false;
  const errorConfig = {
    title: 'JS compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true
  };
  const babelConfig = {
    presets: ['@babel/preset-env'],
  };
  const tempJs = 'temp.js';

  return (done) => {
    if (noneES5 && noneES6) {
      return done();
    } else if (noneES6) {
      return gulp.src(filesExist(jsVendors.es5))
        .pipe(concat(options.vendorJsMin))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else if (noneES5) {
      return browserify({ entries: jsVendors.es6 })
        .transform('babelify', babelConfig)
        .bundle()
        .on('error', notify.onError(errorConfig))
        .pipe(source(options.vendorJsMin))
        // buffer
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else {
      return browserify({ entries: jsVendors.es6 })
        .transform('babelify', babelConfig)
        .bundle()
        .on('error', notify.onError(errorConfig))
        .pipe(source(tempJs))
        .pipe(gulp.dest(`./${options.dest}/js`))
        .on('end', () => {
          gulp.src(filesExist([...jsVendors.es5, `./${options.dest}/js/${tempJs}`]))
            .pipe(concat(options.vendorJsMin))
            .pipe(gulpif(options.isProduction, uglify()))
            .pipe(gulp.dest(`./${options.dest}/js`))
            .on('end', () => del(`./${options.dest}/js/${tempJs}`, { force: true }))
        });
    }
  };
};

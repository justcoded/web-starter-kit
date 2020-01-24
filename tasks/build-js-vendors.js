/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');

module.exports = function (options) {
  const jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);
  const noneES5 = jsVendors.es5.length === 0 ? true : false;
  const noneES6 = jsVendors.es6.length === 0 ? true : false;
  const babelConfig = {
    presets: ['@babel/preset-env'],
  };
  
  options.error.title = 'JS compiling error';

  return (done) => {
    if (noneES5 && noneES6) {
      return done();
    } else if (noneES6) {
      return gulp.src(filesExist(jsVendors.es5))
        .pipe(concat(options.isProduction ? options.vendorJsMin : options.vendorJs))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else if (noneES5) {
      return browserify({ entries: jsVendors.es6 })
        .transform('babelify', babelConfig)
        .bundle().on('error', notify.onError(options.error))
        .pipe(source(options.isProduction ? options.vendorJsMin : options.vendorJs))
        .pipe(gulpif(options.isProduction, buffer()))
        .pipe(gulpif(options.isProduction, uglify()))
        .pipe(gulp.dest(`./${options.dest}/js`));
    } else {
      return browserify({ entries: jsVendors.es6 })
        .transform('babelify', babelConfig)
        .bundle().on('error', notify.onError(options.error))
        .pipe(source(options.vendorJsTemp))
        .pipe(gulp.dest(`./${options.temp}/js`))
        .on('end', () => {
          gulp.src(filesExist([...jsVendors.es5, `./${options.temp}/js/${options.vendorJsTemp}`]))
            .pipe(concat(options.isProduction ? options.vendorJsMin : options.vendorJs))
            .pipe(gulpif(options.isProduction, uglify()))
            .pipe(gulp.dest(`./${options.dest}/js`))
        });
    }
  };
};

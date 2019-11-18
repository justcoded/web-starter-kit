/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

module.exports = function (options) {

  return (done) => {
    let jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

    if (jsVendors.length == 0) {
      return done();
    }

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJsMin))
      .pipe(gulpif(options.isProduction, uglify()))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};
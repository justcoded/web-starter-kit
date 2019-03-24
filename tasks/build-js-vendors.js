/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp       = require('gulp'),
      filesExist = require('files-exist'),
      terser     = require('gulp-terser'),
      concat     = require('gulp-concat');

module.exports = function(options) {

  return (cb) => {
    let jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

    if (jsVendors.length == 0) {
      return cb();
    }

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJsMin))
      .pipe(terser())
      .pipe(gulp.dest(`./${options.dest}/js`));
  };

};

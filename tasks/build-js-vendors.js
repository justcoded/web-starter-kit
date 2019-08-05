/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp       = require('gulp'),
      filesExist = require('files-exist'),
      concat     = require('gulp-concat');

module.exports = function(options) {

  return (cb) => {
    let jsVendors = require(`../vendor_entries/${options.vendorJs}`);

    if (jsVendors.length === 0) {
      return cb();
    }

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJs))
      .pipe(gulp.dest(`../${options.dest}/js`));
  };

};

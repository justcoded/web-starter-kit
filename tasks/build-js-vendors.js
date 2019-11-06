/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');

module.exports = function (options) {

  return (done) => {
    let jsVendors = require(`../vendor_entries/${options.vendorJs}`);

    if (jsVendors.length === 0) {
      return done();
    }

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJs))
      .pipe(gulp.dest(`../${options.dest}/js`));
  };

};

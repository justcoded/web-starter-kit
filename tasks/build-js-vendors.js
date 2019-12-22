/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const parcelBundler = require('parcel-bundler');
const del = require('del');
const notify = require('gulp-notify');

module.exports = function (options) {

  return async (done) => {
    const jsVendors = require(`../vendor_entries/${options.vendorJs}`);
    const noneES5 = jsVendors.es5.length === 0 ? true : false;
    const noneES6 = jsVendors.es6.length === 0 ? true : false;
    const files = jsVendors.es6;
    const config = {
      outDir: `.parcel_cache/vendors`,
      watch: false,
      cache: true,
      cacheDir: '.parcel_cache',
      minify: false,
      sourceMaps: false,
      logLevel: 2,
    };
    const error = {
      title: 'JS vendor compiling error',
      icon: './sys_icon/error_icon.png',
      wait: true
    };
    const parcel = new parcelBundler(files, config);

    parcel.on('error', notify.onError(error));

    if (noneES5 && noneES6) {
      return done();
    } else if (noneES6) {
      return gulp.src(filesExist(jsVendors.es5))
        .pipe(concat(options.vendorJs))
        .pipe(gulp.dest(`../${options.dest}/js`));
    } else if (noneES5) {
      return await parcel.bundle().then(() => gulp.src(filesExist(`${config.outDir}/*.js`))
        .pipe(concat(options.vendorJs))
        .pipe(gulp.dest(`../${options.dest}/js`))
        .on('end', () => del(`${config.outDir}`, { force: true }))
      );
    } else {
      return await parcel.bundle().then(() => gulp.src(filesExist(`${config.outDir}/*.js`, ...jsVendors.es5))
        .pipe(concat(options.vendorJs))
        .pipe(gulp.dest(`../${options.dest}/js`))
        .on('end', () => del(`${config.outDir}`, { force: true }))
      );
    }
  };
};
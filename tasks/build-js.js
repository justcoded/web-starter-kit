/**
 * Build js
 */
'use strict';

const parcelBundler = require('parcel-bundler');
const notify = require('gulp-notify');

module.exports = function (options) {
  return () => {
    const files = `./js/${options.mainJs}`;
    const config = {
      outDir: `../${options.dest}/js`,
      outFile: options.publicJs,
      watch: false,
      cache: true,
      cacheDir: '.parcel_cache',
      minify: false,
      sourceMaps: false,
    };
    const error = {
      title: 'JS compiling error',
      icon: './sys_icon/error_icon.png',
      wait: true
    };
    const parcel = new parcelBundler(files, config);

    parcel.on('error', notify.onError(error))

    return parcel.bundle();
  };
};
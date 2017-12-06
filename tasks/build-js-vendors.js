/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp       = require('gulp'),
      filesExist = require('files-exist'),
      uglify     = require('gulp-uglify'),
      concat     = require('gulp-concat'),
      fs         = require('fs'),
      path       = require('path');

module.exports = function(options) {

  return () => {
    const jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJsMin))
      .pipe(uglify())
      .pipe(gulp.dest(`./${options.dest}/js`))
      .on('end', () => {
        // create empty vendor.min.js if vendors are empty
        if (!jsVendors.length) {
          const jsPath = __dirname + '/../assets/js/';

          if (!fs.existsSync(jsPath)){
            fs.mkdirSync(jsPath);
          }

          fs.writeFileSync(path.resolve(`${jsPath}/${options.vendorJsMin}`), '');
        }
      });
  };

};
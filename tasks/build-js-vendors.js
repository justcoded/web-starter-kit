/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');
const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');
const vendorFiles = require(`../${global.folder.src}/vendor_entries/${global.file.vendorJs}`);

module.exports = function () {
  const production = global.isProduction();
  const vendorFileName = production ? global.file.vendorJsMin : global.file.vendorJs;

  return async (done) => {
    try {
      const bundle = await rollup({
        input: `./${global.folder.src}/vendor_entries/${global.file.vendorJsComp}`,
        treeshake: false,
        plugins: [
          resolve(),
          babel(),
          production ? terser() : null,
        ],
        onwarn(warning, warn) {
          // skip certain warnings
          if (
            warning.code === 'UNUSED_EXTERNAL_IMPORT'
            || warning.code === 'THIS_IS_UNDEFINED'
            || warning.code === 'NON_EXISTENT_EXPORT'
          )
            return;

          throw new Error(warning.message);
        },
      });

      const tempJs = await bundle.write({
        file: `./${global.folder.temp}/js/${global.file.vendorJsTemp}`,
        format: 'esm',
        name: 'vendor',
        sourcemap: false,
      });
      const tempJsFileName = tempJs.output[0].fileName;

      await gulp.src(
        filesExist([
          ...vendorFiles,
          `./${global.folder.temp}/js/${tempJsFileName}`,
        ]),
      )
        .pipe(concat(vendorFileName))
        .pipe(gulp.dest(`./${global.folder.dev}/js`));
    } catch (error) {
      notifier.error(error, 'Vendor JS compiling error', done);
    }
  };
};

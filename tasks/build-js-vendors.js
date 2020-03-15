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

const global = require('../gulp-config.js');
const vendorFiles = require(`../${global.folder.src}/vendor_entries/${global.file.vendorJs}`);

module.exports = function () {
  const production = global.isProduction();
  const vendorFileName = production ? global.file.vendorJsMin : global.file.vendorJs;

  return async () => {
    const bundle = await rollup({
      input: `./${global.folder.src}/vendor_entries/${global.file.vendorJsComp}`,
      treeshake: false,
      plugins: [
        resolve(),
        babel(),
        production ? terser() : null,
      ],
    });

    const tempJs = await bundle.write({
      file: `./${global.folder.temp}/js/${global.file.vendorJsTemp}`,
      format: 'iife',
      name: 'vendor',
      sourcemap: false,
    });

    await gulp.src(filesExist([...vendorFiles, `./${global.folder.temp}/js/${tempJs}`]))
      .pipe(concat(vendorFileName))
      .pipe(gulp.dest(`./${global.folder.build}/js`));
  };
};

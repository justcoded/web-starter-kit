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

const { folder, file, isProduction } = require('../gulp-config.js');
const vendorFiles = require(`../${folder.src}/vendor_entries/${file.vendorJs}`);

module.exports = function () {
  const production = isProduction();
  const vendorFileName = production ? file.vendorJsMin : file.vendorJs;

  return async () => {
    const bundle = await rollup({
      input: './src/vendor_entries/vendor-compile.js',
      treeshake: false,
      plugins: [
        resolve(),
        babel(),
        production ? terser() : null,
      ],
    });

    const tempJs = await bundle.write({
      file: `./${folder.temp}/js/${file.vendorJsTemp}`,
      format: 'iife',
      name: 'vendor',
      sourcemap: false,
    });

    await gulp.src(filesExist([...vendorFiles, `./${folder.temp}/js/${tempJs}`]))
      .pipe(concat(vendorFileName))
      .pipe(gulp.dest(`./${folder.build}/js`));
  };
};

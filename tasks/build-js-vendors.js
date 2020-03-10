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

module.exports = function (options) {
  const vendorFileName = options.isProduction ? options.vendorJsMin : options.vendorJs;
  const vendorFiles = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

  return async () => {
    const bundle = await rollup({
      input: './src/vendor_entries/vendor-compile.js',
      treeshake: false,
      plugins: [
        resolve(),
        babel(),
        options.isProduction ? terser() : null,
      ],
    });

    const tempJs = await bundle.write({
      file: `./${options.temp}/js/${options.vendorJsTemp}`,
      format: 'iife',
      name: 'vendor',
      sourcemap: false,
    });

    await gulp.src(filesExist([...vendorFiles, `./${options.temp}/js/${tempJs}`]))
      .pipe(concat(vendorFileName))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};

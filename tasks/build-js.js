/**
 * Build js
 */
'use strict';

const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

const { folder, file, isProduction } = require('../gulp-config.js');

module.exports = function () {
  const production = isProduction();
  const mainFileName = production ? file.mainJsMin : file.mainJs;

  return async () => {
    const bundle = await rollup({
      input: `./${folder.src}/js/${file.mainJs}`,
      plugins: [
        resolve(),
        babel(),
        production ? terser() : null,
      ],
    });

    await bundle.write({
      file: `./${folder.build}/js/${mainFileName}`,
      format: 'iife',
      name: 'main',
      sourcemap: false,
    });
  };
};

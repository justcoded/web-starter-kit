/**
 * Build js
 */
'use strict';

const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

const global = require('../gulp-config.js');

module.exports = function () {
  const production = global.isProduction();
  const mainFileName = production ? global.file.mainJsMin : global.file.mainJs;

  return async () => {
    const bundle = await rollup({
      input: `./${global.folder.src}/js/${global.file.mainJs}`,
      plugins: [
        resolve(),
        babel(),
        production ? terser() : null,
      ],
    });

    await bundle.write({
      file: `./${global.folder.build}/js/${mainFileName}`,
      format: 'iife',
      name: 'main',
      sourcemap: false,
    });
  };
};

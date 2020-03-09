/**
 * Build js
 */
'use strict';

const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

module.exports = function (options) {
  const mainFileName = options.isProduction ? options.mainJsMin : options.mainJs;

  return async () => {
    const bundle = await rollup({
      input: `./${options.src}/js/${options.mainJs}`,
      plugins: [
        resolve(),
        babel(),
        options.isProduction ? terser() : null,
      ],
    });

    await bundle.write({
      file: `./${options.dest}/js/${mainFileName}`,
      format: 'iife',
      name: 'main',
      sourcemap: false,
    });
  };
};

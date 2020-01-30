/**
 * Build js
 */
'use strict';

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

module.exports = function (options) {

  return async () => {
    const bundle = await rollup.rollup({
      input: `./${options.src}/js/${options.mainJs}`,
      plugins: [
        babel(),
      ],
    });

    await bundle.write({
      file: './assets/js/main.js',
      format: 'iife',
      name: 'main',
      sourcemap: false,
    });
  };
};

// module.exports = function (options) {
//   const babelConfig = {
//     presets: ['@babel/preset-env'],
//   };

//   options.error.title = 'JS compiling error';

//   return () => {
//     return browserify({
//       entries: `./${options.src}/js/${options.mainJs}`,
//     })
//       .transform('babelify', babelConfig)
//       .bundle().on('error', notify.onError(options.error))
//       .pipe(source(options.isProduction ? options.mainJsMin : options.mainJs))
//       .pipe(gulpif(options.isProduction, buffer()))
//       .pipe(gulpif(options.isProduction, uglify()))
//       .pipe(gulp.dest(`./${options.dest}/js`));
//   };
// };

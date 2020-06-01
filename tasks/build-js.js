/**
 * Build js
 */
'use strict';

const webpack = require('webpack');
const path = require('path');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

module.exports = function () {
  const production = global.isProduction();
  const mainFileName = production ? global.file.mainJsMin : global.file.mainJs;
  const vendorFileName = production
    ? global.file.vendorJsMin
    : global.file.vendorJs;

  return (done) => {
    try {
      const config = {
        mode: 'none',
        entry: `./${global.folder.src}/js/${global.file.mainJs}`,
        output: {
          path: path.resolve(
            __dirname.split('task')[0],
            `${global.folder.dev}/js/`
          ),
          filename: `${mainFileName}`,
        },
        optimization: {
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/](node_modules|vendor_entries)[\\/]/,
                filename: `${vendorFileName}`,
              },
            },
          },
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
              }
            }
          ]
        },
      };

      const bundler = webpack(config);

      bundler.run((error, stats) => {
        if (error) {
          throw new Error(error);
        }

        if (production) {
          console.log(
            stats.toString({
              version: false,
              hash: false,
              chunks: false,
              colors: true,
            })
          );
        }
      });

      return done();
    } catch (error) {
      notifier.error(error, 'Main JS compiling error', done);
    }
  };
};

/**
 * Clean build folder
 */
'use strict';

const del = require('del');

const { folder, isProduction } = require('../gulp-config.js');

module.exports = function () {
  const production = isProduction();
  const devFolders = [
    `./${folder.build}`,
    `./${folder.temp}`,
  ];
  const prodFolders = production ? [
    `./${folder.prod}`,
  ] : [];
  const delFolders = [
    ...devFolders,
    ...prodFolders,
  ];
  const config = {
    force: true,
  };

  return async () => {
    const deletedPaths = await del(delFolders, config);

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};

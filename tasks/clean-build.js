/**
 * Clean build folder
 */
'use strict';

const del = require('del');

const global = require('../gulp-config.js');

module.exports = function () {
  const config = {
    force: true,
  };

  const production = global.isProduction();
  const devFolders = [
    `./${global.folder.build}/**`,
    `./${global.folder.temp}/**`,
    
  ];
  const prodFolders = production ? [
    `./${global.folder.prod}/**`,
  ] : [];
  const delFolders = [
    ...devFolders,
    ...prodFolders,
  ];

  return async () => {
    const deletedPaths = await del(delFolders, config);

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};

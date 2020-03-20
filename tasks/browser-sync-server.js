/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');

const global = require('../gulp-config.js');

module.exports = function (options) {

  return () => {
    options.browserSyncInstance.init({
      notify: false,
      injectChanges: true,
      minify: false,
      server: {
        baseDir: global.folder.build,
        // If index.html exist - open it, else show folder
        directory: !fs.existsSync(`./${global.folder.build}/${global.file.mainHtml}`),
      },
      snippetOptions: {
        // Provide a custom Regex for inserting the snippet
        rule: {
          match: /$/i,
          fn: (snippet, match) => snippet + match,
        }
      },
      port: 8080,
    });
  };
};

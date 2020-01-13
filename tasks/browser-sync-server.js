/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');

module.exports = function (options) {
  // If index.html exist - open it, else show folder
  let listDirectory = !fs.existsSync(`../${options.dir}/${options.mainHtml}`);

  return () => {
    options.browserSync.init({
      notify: false,
      injectChanges: true,
      minify: false,
      server: {
        baseDir: `../${options.dir}`,
        directory: listDirectory,
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

/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (options) {

  return () => {
    // If index.html exist - open it, else show folder
    let listDirectory = fs.existsSync(`../${options.dir}/${options.mainHtml}`) ? false : true;

    options.browserSync.init({
      notify: false,
      injectChanges: true,
      server: {
        baseDir: '../',
        directory: listDirectory
      },
      startPath: `../${options.dir}`,
      snippetOptions: {
        // Provide a custom Regex for inserting the snippet
        rule: {
          match: /$/i,
          fn: (snippet, match) => snippet + match
        }
      },
      port: 8080
    });
  };
};

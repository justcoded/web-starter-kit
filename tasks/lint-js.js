/**
 * Lint JS
 */
'use strict';

const CLIEngine = require('eslint').CLIEngine;

const { folder, isFixJs } = require('../gulp-config.js');

module.exports = function () {
  const fixJs = isFixJs();
  const cli = new CLIEngine({
    fix: fixJs,
    useEslintrc: true,
  });

  return (done) => {
    const report = cli.executeOnFiles([`./${folder.src}/js/**/*.js`]);
    const formatter = cli.getFormatter();

    if (formatter(report.results) !== '') console.log(formatter(report.results));

    CLIEngine.outputFixes(report);

    return done();
  };
};

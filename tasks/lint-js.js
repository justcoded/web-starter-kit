/**
 * Lint ES
 */
'use strict';

const CLIEngine = require('eslint').CLIEngine;

module.exports = function (options) {
  const cli = new CLIEngine({
    fix: options.isFix,
    useEslintrc: true,
  });

  return done => {
    const report = cli.executeOnFiles(['./js/**/*.js']);
    const formatter = cli.getFormatter();

    if (formatter(report.results) !== '') console.log(formatter(report.results));

    CLIEngine.outputFixes(report);

    done();
  };
};

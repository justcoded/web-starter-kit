const nodeNotifier = require('node-notifier');

const global = require('../gulp-config.js');

module.exports = {
  error(error, title, callback) {
    const errorNote = Object.assign({}, global.error);

    errorNote.message = title;

    nodeNotifier.notify(errorNote);

    console.log(`\u{1b}[31m[ ${title} ]\u{1b}[0m`);
    console.log(`\u{1b}[33m${error}\u{1b}[0m`);
    console.log(error);

    return callback ? callback() : null;
  },
};

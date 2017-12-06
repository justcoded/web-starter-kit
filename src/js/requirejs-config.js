const paths = require('../vendor_entries/require');

const normalizedPaths = Object.keys(paths).reduce((paths, lib) => {
  paths[lib] = `./vendor/${lib}`;

  return paths;
}, {});

requirejs.config({
  baseUrl: '/assets/js',
  paths: Object.assign(
    {},
    normalizedPaths,
    {
      'vendor': 'vendor.min'
    }
  ),
  shim: {
    'vendor': ['jquery']
  },
  map: {
    '*': {
      'jquery': 'jquery/noconflict'
    },
    'jquery/noconflict': {
      'jquery': 'jquery'
    }
  }
});

define('jquery/noconflict', ['jquery'], function($) {
  return $.noConflict(true);
});
# [![Web Starter Kit](https://cloud.githubusercontent.com/assets/25930200/23856381/20707b74-0802-11e7-8578-5e4e91bb463e.png)](https://github.com/justcoded/web-starter-kit/releases/latest)

>  A modern NPM/Gulp web starter kit for projects

![node](http://img.shields.io/badge/node-4.0.x-blue.svg) ![npm](http://img.shields.io/badge/npm-2.13.x-blue.svg)  [![release](https://img.shields.io/github/release/justcoded/web-starter-kit.svg)](/releases) ![SCSS](http://img.shields.io/badge/SCSS-3.x.x-c6538c.svg) [![travis](https://img.shields.io/travis/justcoded/web-starter-kit.svg)](https://travis-ci.org) [![license](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![license](http://img.shields.io/badge/autoprefixer-included-blue.svg)](https://www.npmjs.com/package/autoprefixer) [![readme](http://img.shields.io/badge/readme-md-blue.svg)](/README.md) [![requests](http://img.shields.io/badge/PRs-welcome-green.svg)](/pulls)


## Overview

Web Starter Kit is an opinionated boilerplate for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Easy start |  We don't use responsive boilerplate. You are free to make your own decision in what way to make responsive for the site. Just start with `index.html`.                          |
| Sass support                           | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more. (Run `gulp` for production)                                                                                                      |
| Performance optimization               | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean. (Run `gulp` to create an optimised version of your project to `/assets`)                                                                                                |
| Code Hinting               | JavaScript code hinting is done using [JsHint](https://www.npmjs.com/package/gulp-jshint) - a hinter tool for identifying and reporting on patterns in JavaScript.                                                                                                 |
| ES2015(ES6) Support                   | Optional ES2015 support .You can use all kind of ES6 features here. ES2015 source code will be automatically transpiled to ES5 for wide browser support.  |
| Built-in HTTP Server                   | A built-in server for previewing your site locally while you develop and iterate                                                                                                                                                                            |
| Live Browser Reloading                 | Reload the browser in real-time anytime an edit is made without the need for an extension. (Run `gulp` and edit your files)                                                                                                                           |
| Cross-device Synchronization           | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io). (Run `gulp` and open up the IP provided on other devices on your network)                       |
                                                                                                                                                  |

## Quickstart

[Download](https://github.com/justcoded/web-starter-kit/releases/latest) the kit or clone this repository and build on what is included in the `assets` directory.

You can start from `index.html` - the default starting point, with template text.

Be sure to look over the [installation docs](docs/install.md) to verify your environment is prepared to run Web Starter Kit.
Once you have verified that your system can run WSK, check out the [commands](docs/commands.md) available to get started.

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari
* Internet Explorer 11+

This is not to say that Web Starter Kit cannot be used in browsers older than those reflected, but merely that our focus will be on ensuring our layouts work great in the above.

## Troubleshooting

If you find yourself running into issues during installation or running the tools, please check our [Troubleshooting](https://github.com/justcoded/web-starter-kit/wiki/Troubleshooting) guide and then open an [issue](https://github.com/justcoded/web-starter-kit/issues). We would be happy to discuss how they can be solved.

## A Boilerplate-only Option

If you would prefer not to use any of our tooling, delete the following files from the project: `package.json`. You can now safely use the boilerplate with an alternative build-system or no build-system at all if you choose.

## Docs and Recipes

* [Commands](https://github.com/justcoded/master/docs/commands.md) - Main commands of the WSK.
* [Using Sass](https://github.com/justcoded/master/docs/sass.md) - how to get Sass working with WSK
* [Deploy guides](https://github.com/justcoded/master/docs/deploy.md) - available for Browsersync, imports and other services.
* [Install build](https://github.com/justcoded/master/docs/install.md) - how to install build.
* [Project structure](https://github.com/justcoded/master/docs/structure.md) - basic structure of project build.
* [JS guides](https://github.com/justcoded/master/docs/js.md) - Guide for using JavaScript in build.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions to Web Starter Kit, please see our [Contribution guide](CONTRIBUTING.md) before submitting a pull request. [Website](https://github.com/justcoded/web-starter-kit) related issues should be filed on the [Web Fundamentals](https://github.com/justcoded/web-starter-kit/issues) issue tracker.

## License

The MIT License (MIT)

Copyright (c) 2017 JustCoded
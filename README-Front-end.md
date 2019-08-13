[![Web Starter Kit](https://user-images.githubusercontent.com/25930200/62951163-2317ac00-bdf2-11e9-9df8-8782c6e8d5ec.png)](https://github.com/justcoded/web-starter-kit/releases)

>  A modern Web starter kit to build projects, ready for WordPress.

![node](http://img.shields.io/badge/node-6.13.x-blue.svg) ![npm](https://img.shields.io/badge/npm-4.2.x-blue.svg)  [![release](https://img.shields.io/github/release/justcoded/web-starter-kit.svg)](/releases) ![SCSS](http://img.shields.io/badge/SCSS-3.x.x-c6538c.svg) [![travis](https://img.shields.io/travis/justcoded/web-starter-kit.svg)](https://travis-ci.org) [![license](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![license](http://img.shields.io/badge/autoprefixer-included-blue.svg)](https://www.npmjs.com/package/autoprefixer) [![readme](http://img.shields.io/badge/readme-md-blue.svg)](/README.md) [![requests](http://img.shields.io/badge/PRs-welcome-green.svg)](/pulls)


## Overview

Web Starter Kit is an opinionated boilerplate for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

## Table of Contents
1. [Browser Support](#browser-support)
2. [Features](#features)
3. [Quickstart](#quickstart)
4. [Install](#install)
5. [Commands](#commands)
6. [Structure](#structure)
7. [JS](#js)
8. [SCSS](#scss)
9. [Tasks](#tasks)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari
* iOS
* Android 5+

This is not to say that Web Starter Kit cannot be used in browsers older than those reflected, but merely that our focus will be on ensuring our layouts work great in the above.


## Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Easy start |  We don't use responsive boilerplate. You are free to make your own decision in what way to make responsive for the site. Just start with `assets/html`.                          |
| Sass support                           | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more (Run `gulp` for project compiling). In our WSK we follow Sass [guidelines](https://sass-guidelin.es/#architecture).                                                                                                      |
| Code Linting               | JavaScript code linting is done using [esLint](https://www.npmjs.com/package/gulp-eslint) - a linter tool for identifying and reporting on patterns in JavaScript (used airbnb-base rules https://www.npmjs.com/package/eslint-config-airbnb-base). HTML code hinting is done using [HtmlHint](https://www.npmjs.com/package/gulp-htmlhint).                                                                                             |
| ES2015(ES6) Support                   | Optional ES2015 support .You can use all kind of ES6 features here. ES2015 source code will be automatically transpiled to ES5 for wide browser support.  |
| HTML templating                   | Used [gulp-file-include](https://github.com/haoxins/gulp-file-include) for templating html files.  |
| Built-in HTTP Server                   | A built-in server for previewing your site locally while you develop and iterate.                                                                                                                                                                            |
| Live Browser Reloading                 | Reload the browser in real-time anytime an edit is made without the need for an extension (Run `gulp` and edit your files).                                                                                                                           |
| Cross-device Synchronization           | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io) (Run `gulp` and open up the IP provided on other devices on your network).                       |
                                                                                                                                     
## Quickstart

1. Init your project using [jcn](https://github.com/justcoded/npm-jcn) or  [Download](https://github.com/justcoded/web-starter-kit/releases/latest) the kit from this repository.
2. Rename root folder (`web-starter-kit` by default) to `assets`.

You can start from `assets/html` folder - the default starting point, with template text.

Be sure to look over the [installation](#install) to verify your environment is prepared to run Web Starter Kit.
Once you have verified that your system can run WSK, check out the [commands](#commands) available to get started.


## Install

Init your project using [jcn](https://github.com/justcoded/npm-jcn) or directly [Download WSK](https://github.com/justcoded/web-starter-kit/releases/latest) and run `$ npm install --global gulp && npm install` in that directory to get started.


To take advantage of Web Starter Kit you need to:

1. Download the code.
2. Install all necessary dependencies if you don't already have them.
3. Modify the application as you wish.
4. Run `gulp` to make `public` folder siblings root folder `assets` with compiled files of your project.

This starter wasn't tested on Linux. If you want to use it on Ubuntu 17 type these commands in a command terminal:
```sh
$ sudo snap install node --classic --channel 6/stable
```
```sh
$ npm install gulpjs/gulp-cli -g
```


## Getting the code

[Download](https://github.com/justcoded/web-starter-kit/releases/latest) and extract WSK to the place where you want to work.

## Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 6.0.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 4.0.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*


### Local dependencies

Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the Web Starter Kit.


## Build, Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp
```

Main command for building current project, ready for WordPress.
This includes linting as well as script, stylesheet and HTML compiling.
Also, a [browsersync](https://browsersync.io/) script will be automatically generated, which will take care of precaching your sites' resources.


## Structure

Your folder structure for WSK:
If you want to use our WSK, you need to know something about the structure.

```
├── assets                        #Root folder with project files & folders
  ├── html
     ├── partials                 #Folder for html components, that we can include into the templates 
     ├── templates                #Folder for source html templates of pages
  ├── js                          #Folder for storing js files
     ├── modules                  #Folder for storing js modules
     ├── app.js                   #Main js file
  ├── scss
     ├── abstracts                #Folder for storing scss files
        ├── _functions.scss       #Sass functions
        ├── _helpers.scss         #Sass helpers
        ├── _mixins.scss          #Sass mixins
        ├── _variables.scss       #Sass variables that we can use in our scss files
     ├── base                     #Folder for storing base styles
        ├── _forms.scss           #Sass styles for forms      
        ├── _main.scss            #Main scss file for base styles      
        ├── _reset.scss           #Sass reset
        ├── _typography.scss      #Sass styles for text      
     ├── components               #Global Reusable Presentational Components
     ├── layout                   #Global layout
     ├── pages                    #Global styles for pages
     ├── styles.scss               #Main scss file (can be used for importing another files)
  ├── tasks                       #Folder with tasks for gulpfile
  ├── vendor_entries              #Folder for vendor entries (plugins)
    ├── vendor.js                 #File for plugins js 
    ├── vendor.scss               #File for plugins styles
  ├── .browserslistrc             #Config for autoprefixer
  ├── .editorconfig               #Config file for IDE
  ├── .eslintignore               #Eslint ignore list
  ├── .eslintrc                   #Config for eslint
  ├── .gitattributes              #Git config for defining attributes per path
  ├── .gitignore                  #Git ignore list
  ├── .npmrc                      #Config for NPM
  ├── CONTRIBUTING.md
  ├── gulp-config.js              #Config for gulp
  ├── gulpfile.js                 #File with gulp tasks
  ├── index.html                  #Compiled file with gulp-file-include
  ├── LICENSE
  ├── package.json                #File with dependencies
  └── README-Front-end.md
├── public                        #Folder with files after compiling
  ├── css                         #Folder with compiled styles
  └── js                          #Folder with compiled js

```

In `package.json` you can find all the dependencies.
In `assets` folder (`web-starter-kit` after renaming) you can find all sources for the project.
In `public` folder (created after running `gulp`) you will find compiled files of styles & js.

Use `public/images` folder to add your graphic files, `assets/js/modules` to add your javascript modules (don't forget to include it in app.js), `assets/scss` folder to add your styles for the project. You can create, delete files and folders in `assets/scss`, but don't forget to include them in `assets/styles.scss` file.

Use `assets/vendor_entries` to include plugins into your project.

## JS

 In our WSK you can use ES2015(ES6). ES2015 isn't introducing anything other than improvements to the JavaScript language and a few new features. 

 It is not an alternative syntax or language like CoffeeScript or TypeScript. It's good ol' fashioned JavaScript. The reason so many people are excited is that this version introduces a lot of much-needed improvements to the language. 

* All custom **javascript** files are located in `js/` folder;
* Entry point for javascript is `assets/js/app.js` you can **import** all your *.js* files from here using [ES6 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) feature;
* All javascript is **babelified** so yes! You can use all kind of [ES6 features](https://babeljs.io/docs/learn-es2015/) here.
* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **js files** must be included in `assets/vendor_entries/vendor.js` by adding new elements to the **array**.



## SCSS

In our WSK you can use [SASS](http://sass-lang.com/). Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

Sass is a CSS preprocessor — a layer between the stylesheets you author and the .css files you serve to the browser. Sass (short for Syntactically Awesome Stylesheets) plugs the holes in CSS as a language, allowing you to write DRY code that’ll be faster, more efficient, and easier to maintain. In our WSK we follow Sass [guidelines](https://sass-guidelin.es/#architecture).

So while normal CSS doesn’t yet allow things like variables, mixins (reusable blocks of styles), and other goodies, Sass provides a syntax that does all of that and more—enabling “super functionality” in addition to your normal CSS.  

* All custom **scss** files locate in `assets/scss/` folder;
* Entry point for all scss is `assets/scss/styles.scss` you can **import** all your *.scss* files from here;
* You **don't need** to write **prefixes** for different browsers like `-webkit` it will be done by the gulp.

The `assets` directory above contains MDL's Sass files and the JavaScript sources for all MDL components.

* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **css or sass files** must be included in `assets/vendor_entries/vendor.scss` using `@import`.
  
You are able to add your own custom sass files and optionally [disable/enable gulp-group-css-media-queries module](https://github.com/justcoded/web-starter-kit/issues/56).
You can see this property in the gulp-config.js file:

![image](https://user-images.githubusercontent.com/32138684/62449074-118b3000-b772-11e9-899c-13dca868cac8.png)

Please don't forget to link all your custom scss files in html:

![image](https://user-images.githubusercontent.com/32138684/62449033-ec96bd00-b771-11e9-9e0b-e4c1211e1102.png)

Also, you might want to add these sass files to the ignore list (check `getPathesToCopyForProduction` and `getPathesToCopy` properties in the `gulp-config.js` file). By default they will be copied to the `public/css` without grouping css media queries.

## Tasks

|Task                               | Description                                                                                                                                                                                                                                               |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| browser-sync-server | Browsersync can watch your files as you work. Changes you make will either be injected into the page (CSS & images) or will cause all browsers to do a full-page refresh.                      |
| build-custom-js                         | Compiles all custom js from `assets/js`.                                                                                                      |
| build-js-vendors               | Compiles all vendor js from `assets/vendor_entries`.                                                                                                |
| compile-sass-files               | Compiles all custom scss from `assets/scss` to `public/css` folder.                                                                                               |
| build-sass                   | Compiles all custom scss from `assets/scss` to `public/css` folder.  |
| build-styles-vendors                 | Compiles and minifies all plugins  scss from `assets/vendor_entries` to `public` folder.                                                                                                                                                                            |
| clean-build                | Removing all compiled files & folders from `public`.                                                                                                                           |
| html-hint           | Need to hint html files.                    |
| es-lint           | Need to lint js files.                      |
| watch           | Task for watching all the changes.                   |

## Troubleshooting

If you find yourself running into issues during installation or running the tools, please check our [Troubleshooting](https://github.com/justcoded/web-starter-kit/wiki/Troubleshooting) guide and then open an [issue](https://github.com/justcoded/web-starter-kit/issues). We would be happy to discuss how they can be solved.


## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions to Web Starter Kit, please see our [Contribution guide](CONTRIBUTING.md) before submitting a pull request. [Website](https://github.com/justcoded/web-starter-kit) related issues should be filed on the [Web Fundamentals](https://github.com/justcoded/web-starter-kit/issues) issue tracker.

## License

The MIT License (MIT).

Copyright (c) 2019 JustCoded the IP provided on other devices on your network.
                                                                                                                                     

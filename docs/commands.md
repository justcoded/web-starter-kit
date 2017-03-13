There are many commands available to help you build and test sites. Here are a few highlights to get started with.

## Watch For Changes & Automatically Refresh Across Devices

## Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [browsersync](https://browsersync.io/)
script will be automatically generated, which will take care of precaching your sites' resources.


```sh
$ gulp dev
```

Same as 'gulp' command but without starting the local server.


## Serve the Fully Built & Optimized Site

```sh
$ gulp production
```

`gulp production` task creates the `production/` folder in the root of the project with **assets files only. It will **help you** to **create clear** instances of code for the **production** or **further implementation**.

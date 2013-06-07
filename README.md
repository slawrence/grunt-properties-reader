# grunt-properties-reader

> Grunt plugin that reads java properties files.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-properties-reader --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-properties-reader');
```

## The "properties" task

### Overview
In your project's Gruntfile, add a section named `properties` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  properties: {
    props: 'configFile.properties'
  }
})
```

### Options

Options are passed directly into the second argument of the `grunt.file.read` operation.

### Usage Examples

#### Basic
In this example, a properties file is used to configure it's deploy location. A property is then used in another task (in this case to delete the deploy directory).

```properties
deployDir=C:\server\deployment
```

```js
grunt.initConfig({
  properties: {
    app: 'application.properties'
  },
  clean: {
    deployDir: '<%= app.deployDir>'
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-06-07 v0.1.0 Initial release

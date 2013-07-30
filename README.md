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
});
```

### Options

Options are passed directly into the second argument of the `grunt.file.read` operation. See [grunt.file](https://github.com/gruntjs/grunt/wiki/grunt.file)

### Usage Examples

#### Basic
In this example, a properties file is used to read a server deployment location. The `deployDir` property is then used in a clean task.

The example `application.properties` file:

```properties
deployDir=C:\server\deployment
```

And example `Gruntfile.js`:

```js
grunt.initConfig({
  properties: {
    app: 'application.properties'
  },
  clean: {
    deployDir: '<%= app.deployDir %>'
  }
})

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-properties-reader');

grunt.registerTask('cleanDeploy', ['properties', 'clean:deployDir'])
```

Running `grunt cleanDeploy` from the command line will delete the directory.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-06-07 v0.1.0 Initial release
* 2013-07-30 v0.1.1 Non greedy equals (thanks @nuarhu)

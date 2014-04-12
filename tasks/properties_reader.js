/*
 * grunt-properties-reader
 * https://github.com/slawrence/grunt-properties-reader
 *
 * Copyright (c) 2013 Sean Lawrence
 * Licensed under the MIT license.
 */

'use strict';

/**
 * If a string is "true" "TRUE", or "  TrUE" convert to boolean type else
 * leave as is
 */
function _convertStringIfTrue(original) {
    var str;
    if (original && typeof original === "string") {
        str = original.toLowerCase().trim();
        return (str === "true" || str === "false") ? (str === "true") : original;
    }
    return original;
}

/**
 * Convert properties string into a json object
 * Only supports boolean and string types
 */
function convertPropsToJson(text) {
    var configObject = {};
    if (text && text.length) {
        // handle multi-line values terminated with a backslash
        text = text.replace(/\\\r?\n\s*/g, '');
        text.split(/\r?\n/g).forEach(function (line) {
            var props,
                name,
                val;
            line = line.trim();
            if (line && line.indexOf("#") !== 0 && line.indexOf("!") !== 0) {
                props = line.split(/\=(.+)?/);
                name = props[0] && props[0].trim();
                val = props[1] && props[1].trim();
                configObject[name] = _convertStringIfTrue(val);
            }
        });
    }
    return configObject;
}

function merge(target, source) {

  if (!source) {
    return target;
  }

  for (var key in source) {
    target[key] = source[key];
  }

  return target;

}

function convertToArray(value, grunt) {

    if (!value) {
        return [];
    }

    if (value instanceof Array) {
        return value;
    }

    return [ value ];

}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('properties', 
    'Reads values from one or more Java style properties into the specified variable', 
    function() {

        var readFile = function(filename, readOptions) {
            return grunt.file.exists(filename) && grunt.file.read(filename, readOptions);
        };

        // Merge task-specific and/or target-specific options with these defaults.
        if (grunt.config.get(this.target)) {
            grunt.log.error("Conflict - property, " + this.target + ", already exists in grunt config");
            return false;
        }

        var filenames = convertToArray(this.data);

        var parsed = {};
        for (var i=0; i < filenames.length; i++) {

          var filename = filenames[i];
          var file = readFile(filename, this.options);

          // Only require the first file ...
          if (!file && i === 0) {
              grunt.log.error("Could not read required properties file: " + filename);
              return false;
          } else if (!file) {
              grunt.log.warn("Could not read optional properties file: " + filename);
          }

          parsed = merge(parsed, convertPropsToJson(file));

       }

       grunt.config.set(this.target, parsed);

    });

};

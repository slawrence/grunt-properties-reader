/*
 * grunt-properties-reader
 * https://github.com/slawrence/grunt-properties-reader
 *
 * Copyright (c) 2013 Sean Lawrence
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Convert properties string into a json object
 * Only supports boolean and string types
 */
function convertPropsToJson(text) {
    var configObject = {};
    if (text && text.length) {
        text.split(/\r?\n/g).forEach(function (line) {
            var props,
                name,
                val;
            line = line.trim();
            if (line && line.indexOf("#") !== 0 && line.indexOf("!") !== 0) {
                props = line.split(/=(.+)?/);
                name = props[0].trim();
                val = props[1].trim();
                configObject[name] = _convertStringIfTrue(val);
            }
        });
    }
    return configObject;
};

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

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('properties', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var filename = this.data,
      file = (function (fileReadOptions) {
        return grunt.file.exists(filename) && grunt.file.read(filename, fileReadOptions);
      }(this.options)),
      parsed;

    if (!file) {
        grunt.log.error("Could not read file: " + filename);
        return false;
    }

    parsed = convertPropsToJson(file);

    if (grunt.config.get(this.target)) {
        grunt.log.error("Conflict - property already exists in grunt config");
        return false;
    }

    grunt.config.set(this.target, parsed);
  });

};

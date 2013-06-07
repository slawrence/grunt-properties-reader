'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.properties_reader = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(2);
    var expected = {
      test: true,
      number: "1234",
      string: "hello world",
      "i.have.dots": "a.b.c",
      spaces: "are fine"
    };

    test.deepEqual(grunt.config.get("defaultTemplateTest"), { test: true, string: "hello world"});
    test.deepEqual(grunt.config.get("default"), expected);

    test.done();
  },
  custom_options: function(test) {
    //test.expect(1);

    //test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};

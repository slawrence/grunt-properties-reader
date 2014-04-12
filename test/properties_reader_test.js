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

exports.single_file_properties_reader = {
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
      spaces: "are fine",
      eqsign: "<script src='bla.js'></script>",
      empty: undefined,
      multilineval: 'line1, line2',
      multilineval2: 'first second third'
    };

    test.deepEqual(grunt.config.get("defaultTemplateTest"), { test: true, string: "hello world"});
    test.deepEqual(grunt.config.get("single_file"), expected);

    test.done();
  },
  custom_options: function(test) {
    //test.expect(1);

    //test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};

exports.multi_file_properties_reader = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);
    var expected = {
      test: true,
      number: "1234",
      string: "hello world 2",
      "i.have.dots": "a.b.c",
      spaces: "are fine",
      eqsign: "<script src='bla.js'></script>",
      override: "foobar",
      empty: undefined,
      multilineval: 'line1, line2',
      multilineval2: 'first second third'
    };

    test.deepEqual(grunt.config.get("multi_file"), expected);

    test.done();
  },
  custom_options: function(test) {
    test.done();
  },
};

exports.optional_file_properties_reader = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);
    var expected = {
      test: true,
      number: "1234",
      string: "hello world",
      "i.have.dots": "a.b.c",
      spaces: "are fine",
      eqsign: "<script src='bla.js'></script>",
      empty: undefined,
      multilineval: 'line1, line2',
      multilineval2: 'first second third'
    };

    test.deepEqual(grunt.config.get("optional_file"), expected);

    test.done();
  },
  custom_options: function(test) {
    test.done();
  },
};



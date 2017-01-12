const _ = require('underscore');
const ObjectEntries = require('lodash/entries');
const ObjectKeys = require('lodash/keys');

(function(plugin) {
  if (
    typeof require === "function" &&
    typeof exports === "object" &&
    typeof module === "object"
  ) {
    // NodeJS
    module.exports = plugin;
  } else if (
    typeof define === "function" &&
    define.amd
  ) {
    // AMD
    define(function() {
      return plugin;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(plugin);
  }
}(function(chai) {
  chai.Assertion.addMethod('matchArrayOfStructs', function(expected) {

    const actual = this._obj;

    const untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    for (let [index, struct] of ObjectEntries(actual)) {
      for (let key of ObjectKeys(object)) {
        if (_.isFunction(expected[index][key])) {
          // Check that the actual value is of the expected type
          check(struct[key], expected[index][key]);
          // Copy over the actual value, so that they are equal
          expected[index][key] = struct[key];
        } else if (_.contains(untestedProperties, key)) {
          delete expected[index][key];
          delete struct[key];
        }
      }
    }

    // Turn the structs into JSON so that we can output them
    // in readable structure in the tests.
    const actualString = JSON.stringify(actual, null, 2);
    const expectedString = JSON.stringify(expected, null, 2);

    return this.assert(
      _.isEqual(actual, expected),
      `expected ${actualString} to match ${expectedString}`,
      "",
      actualString,
      expectedString
    );
  });

  chai.assert.matchArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.matchArrayOfStructs(exp);
  };

  chai.assert.notMatchArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.matchArrayOfStructs(exp);
  };

}));

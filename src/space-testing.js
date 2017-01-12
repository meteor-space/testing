const isNil = require('lodash/isNil');
const get = require('lodash/get');
const sinon = require('sinon');
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
}(function(chai, utils) {
  // extend
  chai.Assertion.addChainableMethod('extend', function(baseClass) {
    const actual = this._obj;

    const es6 = get(actual, 'prototype');
    const isExtendingES6 = (
      !isNil(es6) && actual.prototype instanceof baseClass
    );
    const cs = get(actual, '__super__.constructor');
    const isExtendingCoffeScript = (
      !isNil(cs) && actual.__super__.constructor === baseClass
    );
    const isExtending = isExtendingES6 || isExtendingCoffeScript;

    return this.assert(
      isExtending,
      `expected ${actual} to extend ${baseClass}`,
      "",
      baseClass,
      es6 || cs
    );
  });

  chai.assert.extend = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.extend(exp);
  };

  chai.assert.notExtend = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.extend(exp);
  };

  // sameAs
  chai.Assertion.addChainableMethod('sameAs', function(expected) {
    const actual = this._obj;
    const actualStringified = JSON.stringify(actual, null, 2);
    const expectedStringified = JSON.stringify(expected, null, 2);

    return this.assert(
      sinon.match(expected).test(actual),
      `expected ${actualStringified} to be same as ${expectedStringified}`,
      `expected ${actualStringified} to not be same as ${expectedStringified}`,
      expected,
      actual
    );
  });

  chai.assert.sameAs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.be.sameAs(exp);
  };

  chai.assert.notSame = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.be.sameAs(exp);
  };

  // dependOn
  chai.Assertion.addMethod('dependOn', function(dependencies) {
    const actual = this._obj;

    this.assert(
      utils.type(actual.prototype.Dependencies) === 'object',
      `expected ${actual} to declare dependencies`,
      "",
      dependencies,
      actual.prototype.Dependencies
    );

    const expectedStringified = JSON.stringify(dependencies, null, 2);
    const actualStringified = JSON.stringify(actual.prototype.Dependencies, null, 2);

    return this.assert(
      utils.eql(actual.prototype.Dependencies, dependencies),
      `expected ${actual} to depend on:\n${expectedStringified}\nbut was:\n${actualStringified}`,
      "",
      dependencies,
      actual.prototype.Dependencies
    );
  });

  chai.assert.dependOn = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.dependOn(exp);
  };

  chai.assert.notDependOn = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.dependOn(exp);
  };

  // matchArrayOfStructs
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

  // containArrayOfStructs
  chai.Assertion.addMethod('containArrayOfStructs', function(expected) {

    // Filter out structs we don't need to test for
    const actual = _.filter(this._obj, (actualStruct) =>
      _.any(expected, (expectedStruct) =>
        _.isEqual(expectedStruct.toString(), actualStruct.toString())
      )
    );

    const untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    for (let [index, actualStruct] of ObjectEntries(actual)) {
      for (let key of ObjectKeys(object)) {
        if (_.isFunction(expected[index][key])) {
          // Check that the actual value is of the expected type
          check(actualStruct[key], expected[index][key]);
          // Copy over the actual value, so that they are equal
          expected[index][key] = actualStruct[key];
        } else if (_.contains(untestedProperties, key)) {
          delete expected[index][key];
          delete actualStruct[key];
        }
      }
    }

    // Format for error messages
    const actualString = JSON.stringify(actual, null, 2);

    for (let struct of Object.values(expected)) {
      let structString = JSON.stringify(struct, null, 2);
      this.assert(
        _.any(actual, (item) => {
          _.isEqual(item, struct);
        }),
        `Expected Struct ${struct.toString()} ${structString} not contained in ${actualString}`
      );
    }
  });

  chai.assert.containArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.containArrayOfStructs(exp);
  };

  chai.assert.notContainArrayOfStructs = function(val, exp, msg) {
    new chai.Assertion(val, msg).to.not.containArrayOfStructs(exp);
  };
}));

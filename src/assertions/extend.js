const isNil = require('lodash/isNil');
const get = require('lodash/get');

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
}));

const sinon = require('sinon');

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
}));

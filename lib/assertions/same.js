"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sinon = require('sinon');

(function (same) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
    // NodeJS
    module.exports = same;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return same;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(same);
  }
})(function same(chai, utils) {
  chai.Assertion.addChainableMethod('sameAs', function (expected) {
    var actual = this._obj;
    var actualStringified = JSON.stringify(actual, null, 2);
    var expectedStringified = JSON.stringify(expected, null, 2);

    return this.assert(sinon.match(expected).test(actual), "expected " + actualStringified + " to be same as " + expectedStringified, "expected " + actualStringified + " to not be same as " + expectedStringified, expected, actual);
  });

  chai.assert.sameAs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.be.sameAs(exp);
  };

  chai.assert.notSame = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.be.sameAs(exp);
  };
});
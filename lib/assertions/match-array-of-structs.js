'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('underscore');
var ObjectEntries = require('lodash/entries');
var ObjectKeys = require('lodash/keys');

(function (matchArrayOfStructs) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object") {
    // NodeJS
    module.exports = matchArrayOfStructs;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return matchArrayOfStructs;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(matchArrayOfStructs);
  }
})(function matchArrayOfStructs(chai, utils) {
  chai.Assertion.addMethod('matchArrayOfStructs', function (expected) {

    var actual = this._obj;

    var untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ObjectEntries(actual)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            struct = _step$value[1];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = ObjectKeys(object)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

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
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      // Turn the structs into JSON so that we can output them
      // in readable structure in the tests.
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var actualString = JSON.stringify(actual, null, 2);
    var expectedString = JSON.stringify(expected, null, 2);

    return this.assert(_.isEqual(actual, expected), 'expected ' + actualString + ' to match ' + expectedString, "", actualString, expectedString);
  });

  chai.assert.matchArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.matchArrayOfStructs(exp);
  };

  chai.assert.notMatchArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.matchArrayOfStructs(exp);
  };
});
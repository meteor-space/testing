'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('underscore');
var ObjectEntries = require('lodash/entries');
var ObjectKeys = require('lodash/keys');

(function (containArrayOfStructs) {
  "use strict";

  // Module systems magic dance.
  /* istanbul ignore else */

  if (typeof require === "function" && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object" && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object") {
    // NodeJS
    module.exports = containArrayOfStructs;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return containArrayOfStructs;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(containArrayOfStructs);
  }
})(function containArrayOfStructs(chai, utils) {
  chai.Assertion.addMethod('containArrayOfStructs', function (expected) {
    var _this = this;

    // Filter out structs we don't need to test for
    var actual = _.filter(this._obj, function (actualStruct) {
      return _.any(expected, function (expectedStruct) {
        return _.isEqual(expectedStruct.toString(), actualStruct.toString());
      });
    });

    var untestedProperties = ['timestamp', 'version', 'meta', 'schemaVersion'];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ObjectEntries(actual)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            actualStruct = _step$value[1];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = ObjectKeys(object)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;

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
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      // Format for error messages
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var struct = _step2.value;

        var structString = JSON.stringify(struct, null, 2);
        _this.assert(_.any(actual, function (item) {
          _.isEqual(item, struct);
        }), 'Expected Struct ' + struct.toString() + ' ' + structString + ' not contained in ' + actualString);
      };

      for (var _iterator2 = Object.values(expected)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
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
  });

  chai.assert.containArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.containArrayOfStructs(exp);
  };

  chai.assert.notContainArrayOfStructs = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.containArrayOfStructs(exp);
  };
});
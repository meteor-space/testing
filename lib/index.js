'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spaceChai = exports.extensions = exports.isSubclassOf = undefined;

var _isSubclass = require('./helpers/is-subclass.js');

var _isSubclass2 = _interopRequireDefault(_isSubclass);

var _same = require('./assertions/same.js');

var _same2 = _interopRequireDefault(_same);

var _extend = require('./assertions/extend.js');

var _extend2 = _interopRequireDefault(_extend);

var _dependOn = require('./assertions/depend-on.js');

var _dependOn2 = _interopRequireDefault(_dependOn);

var _containArrayOfStructs = require('./assertions/contain-array-of-structs.js');

var _containArrayOfStructs2 = _interopRequireDefault(_containArrayOfStructs);

var _matchArrayOfStructs = require('./assertions/match-array-of-structs.js');

var _matchArrayOfStructs2 = _interopRequireDefault(_matchArrayOfStructs);

var _spaceChai = require('./assertions/space-chai');

var _spaceChai2 = _interopRequireDefault(_spaceChai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extensions = {};
extensions.chai = {
  same: _same2.default,
  extend: _extend2.default,
  dependOn: _dependOn2.default,
  containArrayOfStructs: _containArrayOfStructs2.default,
  matchArrayOfStructs: _matchArrayOfStructs2.default
};

exports.isSubclassOf = _isSubclass2.default;
exports.extensions = extensions;
exports.spaceChai = _spaceChai2.default;
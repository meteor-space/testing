import isSubclassOf from './helpers/is-subclass.js';
import same from './assertions/same.js';
import serializable from './assertions/serializable.js';
import versionable from './assertions/versionable.js';
import extend from './assertions/extend.js';
import dependOn from './assertions/depend-on.js';
import containArrayOfStructs from './assertions/contain-array-of-structs.js';
import matchArrayOfStructs from './assertions/match-array-of-structs.js';

const extensions = {};
extensions.chai = {
  same: same,
  serializable: serializable,
  versionable: versionable,
  extend: extend,
  dependOn: dependOn,
  containArrayOfStructs: containArrayOfStructs,
  matchArrayOfStructs: matchArrayOfStructs
};

const spaceChai = function(chai) {
  for (let extension of extensions.chai) {
    chai.use(extension);
  }
};

export {
  isSubclassOf,
  extensions as extensions,
  spaceChai
};
